import express from 'express'
import Quiz from '../models/Quiz.js'
import Submission from '../models/Submission.js'
import User from '../models/User.js'
import { protect, teacherOnly } from '../middleware/auth.js'

const router = express.Router()

// All routes require authentication and teacher role
router.use(protect, teacherOnly)

// @route   GET /api/teacher/dashboard
// @desc    Get teacher dashboard data
// @access  Private (Teacher)
router.get('/dashboard', async (req, res) => {
  try {
    const teacherId = req.user._id

    // Get total quizzes created by teacher
    const totalQuizzes = await Quiz.countDocuments({ teacher: teacherId })

    // Get total students (unique students who submitted quizzes)
    const submissions = await Submission.find()
      .populate('quiz')
      .lean()
    
    const teacherSubmissions = submissions.filter(
      sub => sub.quiz && sub.quiz.teacher.toString() === teacherId.toString()
    )
    
    const uniqueStudents = [...new Set(teacherSubmissions.map(sub => sub.student.toString()))]
    const totalStudents = uniqueStudents.length

    // Get total submissions
    const totalSubmissions = teacherSubmissions.length

    // Calculate average score
    const avgScore = teacherSubmissions.length > 0
      ? teacherSubmissions.reduce((sum, sub) => sum + (sub.percentage || 0), 0) / teacherSubmissions.length
      : 0

    // Get recent quizzes
    const recentQuizzes = await Quiz.find({ teacher: teacherId })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean()

    res.json({
      stats: {
        totalQuizzes,
        totalStudents,
        totalSubmissions,
        averageScore: Math.round(avgScore)
      },
      recentQuizzes
    })
  } catch (error) {
    console.error('Dashboard error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// @route   GET /api/teacher/quizzes
// @desc    Get all quizzes created by teacher
// @access  Private (Teacher)
router.get('/quizzes', async (req, res) => {
  try {
    const quizzes = await Quiz.find({ teacher: req.user._id })
      .sort({ createdAt: -1 })
      .lean()
    
    res.json(quizzes)
  } catch (error) {
    console.error('Get quizzes error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// @route   POST /api/teacher/quiz
// @desc    Create a new quiz
// @access  Private (Teacher)
router.post('/quiz', async (req, res) => {
  try {
    const { title, description, questions, duration } = req.body

    const quiz = await Quiz.create({
      title,
      description,
      questions,
      duration,
      teacher: req.user._id
    })

    res.status(201).json(quiz)
  } catch (error) {
    console.error('Create quiz error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// @route   GET /api/teacher/quiz/:id
// @desc    Get single quiz
// @access  Private (Teacher)
router.get('/quiz/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findOne({
      _id: req.params.id,
      teacher: req.user._id
    })

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' })
    }

    res.json(quiz)
  } catch (error) {
    console.error('Get quiz error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// @route   PUT /api/teacher/quiz/:id
// @desc    Update a quiz
// @access  Private (Teacher)
router.put('/quiz/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findOneAndUpdate(
      { _id: req.params.id, teacher: req.user._id },
      req.body,
      { new: true, runValidators: true }
    )

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' })
    }

    res.json(quiz)
  } catch (error) {
    console.error('Update quiz error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// @route   DELETE /api/teacher/quiz/:id
// @desc    Delete a quiz
// @access  Private (Teacher)
router.delete('/quiz/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findOneAndDelete({
      _id: req.params.id,
      teacher: req.user._id
    })

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' })
    }

    // Also delete all submissions for this quiz
    await Submission.deleteMany({ quiz: req.params.id })

    res.json({ message: 'Quiz deleted successfully' })
  } catch (error) {
    console.error('Delete quiz error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// @route   GET /api/teacher/quiz/:id/results
// @desc    Get quiz results
// @access  Private (Teacher)
router.get('/quiz/:id/results', async (req, res) => {
  try {
    const quiz = await Quiz.findOne({
      _id: req.params.id,
      teacher: req.user._id
    })

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' })
    }

    const submissions = await Submission.find({ quiz: req.params.id })
      .populate('student', 'name email')
      .sort({ submittedAt: -1 })
      .lean()

    res.json({
      quiz,
      submissions
    })
  } catch (error) {
    console.error('Get results error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// @route   GET /api/teacher/students
// @desc    Get all students who have taken quizzes
// @access  Private (Teacher)
router.get('/students', async (req, res) => {
  try {
    const teacherId = req.user._id

    // Get all submissions for teacher's quizzes
    const submissions = await Submission.find()
      .populate('quiz')
      .populate('student', 'name email points')
      .lean()

    const teacherSubmissions = submissions.filter(
      sub => sub.quiz && sub.quiz.teacher.toString() === teacherId.toString()
    )

    // Get unique students
    const studentMap = new Map()
    teacherSubmissions.forEach(sub => {
      if (sub.student) {
        const studentId = sub.student._id.toString()
        if (!studentMap.has(studentId)) {
          studentMap.set(studentId, {
            ...sub.student,
            quizzesTaken: 0,
            averageScore: 0,
            totalScore: 0
          })
        }
        const student = studentMap.get(studentId)
        student.quizzesTaken++
        student.totalScore += sub.percentage || 0
        student.averageScore = Math.round(student.totalScore / student.quizzesTaken)
      }
    })

    const students = Array.from(studentMap.values())

    res.json(students)
  } catch (error) {
    console.error('Get students error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

export default router

