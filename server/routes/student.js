import express from 'express'
import Quiz from '../models/Quiz.js'
import Submission from '../models/Submission.js'
import User from '../models/User.js'
import { protect, studentOnly } from '../middleware/auth.js'

const router = express.Router()

// All routes require authentication and student role
router.use(protect, studentOnly)

// @route   GET /api/student/dashboard
// @desc    Get student dashboard data
// @access  Private (Student)
router.get('/dashboard', async (req, res) => {
  try {
    const studentId = req.user._id

    // Get student's submissions
    const submissions = await Submission.find({ student: studentId }).lean()

    // Get completed quizzes count
    const completedQuizzes = submissions.length

    // Calculate average score
    const avgScore = submissions.length > 0
      ? submissions.reduce((sum, sub) => sum + (sub.percentage || 0), 0) / submissions.length
      : 0

    // Get total points
    const totalPoints = req.user.points || 0

    // Get student's rank
    const allStudents = await User.find({ role: 'student' }).sort({ points: -1 }).lean()
    const rank = allStudents.findIndex(s => s._id.toString() === studentId.toString()) + 1

    // Get available quizzes (not yet taken)
    const submittedQuizIds = submissions.map(sub => sub.quiz.toString())
    const availableQuizzes = await Quiz.find({
      _id: { $nin: submittedQuizIds },
      isActive: true
    })
      .populate('teacher', 'name')
      .sort({ createdAt: -1 })
      .limit(10)
      .lean()

    res.json({
      stats: {
        completedQuizzes,
        averageScore: Math.round(avgScore),
        totalPoints,
        rank
      },
      availableQuizzes
    })
  } catch (error) {
    console.error('Dashboard error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// @route   GET /api/student/quizzes
// @desc    Get all available quizzes
// @access  Private (Student)
router.get('/quizzes', async (req, res) => {
  try {
    const studentId = req.user._id

    // Get quizzes already taken
    const submissions = await Submission.find({ student: studentId }).lean()
    const submittedQuizIds = submissions.map(sub => sub.quiz.toString())

    // Get available quizzes
    const quizzes = await Quiz.find({
      _id: { $nin: submittedQuizIds },
      isActive: true
    })
      .populate('teacher', 'name')
      .sort({ createdAt: -1 })
      .lean()

    res.json(quizzes)
  } catch (error) {
    console.error('Get quizzes error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// @route   GET /api/student/quiz/:id
// @desc    Get single quiz for taking
// @access  Private (Student)
router.get('/quiz/:id', async (req, res) => {
  try {
    const studentId = req.user._id

    // Check if already submitted
    const existingSubmission = await Submission.findOne({
      quiz: req.params.id,
      student: studentId
    })

    if (existingSubmission) {
      return res.status(400).json({ message: 'You have already taken this quiz' })
    }

    const quiz = await Quiz.findById(req.params.id)
      .populate('teacher', 'name')
      .lean()

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' })
    }

    if (!quiz.isActive) {
      return res.status(400).json({ message: 'Quiz is not active' })
    }

    // Remove correct answers from questions (security)
    quiz.questions = quiz.questions.map(q => {
      const { correctAnswer, ...rest } = q
      return rest
    })

    res.json(quiz)
  } catch (error) {
    console.error('Get quiz error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// @route   POST /api/student/quiz/:id/submit
// @desc    Submit quiz answers
// @access  Private (Student)
router.post('/quiz/:id/submit', async (req, res) => {
  try {
    const studentId = req.user._id
    const { answers, timeSpent } = req.body

    // Check if already submitted
    const existingSubmission = await Submission.findOne({
      quiz: req.params.id,
      student: studentId
    })

    if (existingSubmission) {
      return res.status(400).json({ message: 'You have already submitted this quiz' })
    }

    // Get quiz
    const quiz = await Quiz.findById(req.params.id)
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' })
    }

    // Grade answers
    const gradedAnswers = answers.map(ans => {
      const question = quiz.questions.id(ans.questionId)
      if (!question) {
        return { ...ans, isCorrect: false, pointsEarned: 0 }
      }

      const isCorrect = ans.answer.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase()
      return {
        questionId: ans.questionId,
        answer: ans.answer,
        isCorrect,
        pointsEarned: isCorrect ? (question.points || 1) : 0
      }
    })

    // Calculate score
    const score = gradedAnswers.reduce((sum, ans) => sum + ans.pointsEarned, 0)
    const percentage = quiz.totalPoints > 0 ? Math.round((score / quiz.totalPoints) * 100) : 0

    // Create submission
    const submission = await Submission.create({
      quiz: req.params.id,
      student: studentId,
      answers: gradedAnswers,
      score,
      percentage,
      timeSpent
    })

    // Update student points
    const pointsEarned = Math.round(percentage / 10) // 1 point per 10%
    await User.findByIdAndUpdate(studentId, {
      $inc: { points: pointsEarned }
    })

    res.status(201).json({
      submission,
      pointsEarned
    })
  } catch (error) {
    console.error('Submit quiz error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// @route   GET /api/student/submissions
// @desc    Get student's submissions
// @access  Private (Student)
router.get('/submissions', async (req, res) => {
  try {
    const submissions = await Submission.find({ student: req.user._id })
      .populate('quiz', 'title description totalPoints')
      .sort({ submittedAt: -1 })
      .lean()

    res.json(submissions)
  } catch (error) {
    console.error('Get submissions error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// @route   GET /api/student/leaderboard
// @desc    Get leaderboard
// @access  Private (Student)
router.get('/leaderboard', async (req, res) => {
  try {
    const students = await User.find({ role: 'student' })
      .select('name points badges')
      .sort({ points: -1 })
      .limit(100)
      .lean()

    res.json(students)
  } catch (error) {
    console.error('Get leaderboard error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

export default router

