import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {  FiBook, FiUsers, FiBarChart2, FiFileText, FiPlus, FiTrendingUp } from 'react-icons/fi'
import Layout from '../components/Layout'
import { useLanguageStore } from '../store/languageStore'
import { useTranslation } from '../utils/translations'
import api from '../utils/api'

export default function TeacherDashboard() {
  const { language } = useLanguageStore()
  const t = useTranslation(language)
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    totalStudents: 0,
    totalSubmissions: 0,
    averageScore: 0,
  })
  const [recentQuizzes, setRecentQuizzes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const { data } = await api.get('/teacher/dashboard')
      setStats(data.stats)
      setRecentQuizzes(data.recentQuizzes || [])
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const navigation = [
    { path: '/teacher', label: t('dashboard'), icon: <FiBarChart2 /> },
    { path: '/teacher/quizzes', label: t('quizzes'), icon: <FiBook /> },
    { path: '/teacher/students', label: t('students'), icon: <FiUsers /> },
    { path: '/teacher/content', label: t('content'), icon: <FiFileText /> },
  ]

  const statsCards = [
    {
      title: language === 'en' ? 'Total Quizzes' : 'إجمالي الاختبارات',
      value: stats.totalQuizzes,
      icon: <FiBook className="w-6 h-6" />,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: language === 'en' ? 'Total Students' : 'إجمالي الطلاب',
      value: stats.totalStudents,
      icon: <FiUsers className="w-6 h-6" />,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: language === 'en' ? 'Submissions' : 'التسليمات',
      value: stats.totalSubmissions,
      icon: <FiFileText className="w-6 h-6" />,
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: language === 'en' ? 'Average Score' : 'متوسط الدرجات',
      value: `${stats.averageScore}%`,
      icon: <FiTrendingUp className="w-6 h-6" />,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
  ]

  return (
    <Layout navigation={navigation}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t('dashboard')}
            </h1>
            <p className="text-gray-600 mt-1">
              {language === 'en' ? 'Welcome back! Here\'s your overview' : 'مرحباً بعودتك! هذه نظرة عامة'}
            </p>
          </div>
          <Link
            to="/teacher/quiz/create"
            className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <FiPlus />
            <span>{t('createQuiz')}</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${card.bgColor} p-3 rounded-lg`}>
                  <div className={card.textColor}>
                    {card.icon}
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {loading ? '...' : card.value}
              </h3>
              <p className="text-gray-600 text-sm">
                {card.title}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Recent Quizzes */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {language === 'en' ? 'Recent Quizzes' : 'الاختبارات الأخيرة'}
            </h2>
            <Link
              to="/teacher/quizzes"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              {language === 'en' ? 'View All' : 'عرض الكل'}
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-8 text-gray-500">
              {t('loading')}
            </div>
          ) : recentQuizzes.length === 0 ? (
            <div className="text-center py-12">
              <FiBook className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">
                {language === 'en' ? 'No quizzes yet' : 'لا توجد اختبارات بعد'}
              </p>
              <Link
                to="/teacher/quiz/create"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <FiPlus />
                {t('createQuiz')}
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentQuizzes.map((quiz) => (
                <div
                  key={quiz._id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">{quiz.title}</h3>
                    <p className="text-sm text-gray-600">
                      {quiz.questions?.length || 0} {t('questions')} • {quiz.duration} {t('minutes')}
                    </p>
                  </div>
                  <Link
                    to={`/teacher/results/${quiz._id}`}
                    className="px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  >
                    {t('viewResults')}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

