import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiBook, FiAward, FiTrendingUp, FiClock, FiCheckCircle } from 'react-icons/fi'
import Layout from '../components/Layout'
import { useLanguageStore } from '../store/languageStore'
import { useTranslation } from '../utils/translations'
import { useAuthStore } from '../store/authStore'
import api from '../utils/api'

export default function StudentDashboard() {
  const { language } = useLanguageStore()
  const { user } = useAuthStore()
  const t = useTranslation(language)
  const [stats, setStats] = useState({
    completedQuizzes: 0,
    averageScore: 0,
    totalPoints: 0,
    rank: 0,
  })
  const [availableQuizzes, setAvailableQuizzes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const { data } = await api.get('/student/dashboard')
      setStats(data.stats)
      setAvailableQuizzes(data.availableQuizzes || [])
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const navigation = [
    { path: '/student', label: t('dashboard'), icon: <FiBook /> },
    { path: '/student/leaderboard', label: t('leaderboard'), icon: <FiAward /> },
  ]

  const statsCards = [
    {
      title: language === 'en' ? 'Completed Quizzes' : 'الاختبارات المكتملة',
      value: stats.completedQuizzes,
      icon: <FiCheckCircle className="w-6 h-6" />,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: language === 'en' ? 'Average Score' : 'متوسط الدرجات',
      value: `${stats.averageScore}%`,
      icon: <FiTrendingUp className="w-6 h-6" />,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: language === 'en' ? 'Total Points' : 'إجمالي النقاط',
      value: stats.totalPoints,
      icon: <FiAward className="w-6 h-6" />,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      title: language === 'en' ? 'Your Rank' : 'ترتيبك',
      value: `#${stats.rank || '-'}`,
      icon: <FiAward className="w-6 h-6" />,
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ]

  return (
    <Layout navigation={navigation}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {t('welcome')}, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-1">
            {language === 'en' ? 'Continue your learning journey' : 'تابع رحلة التعلم الخاصة بك'}
          </p>
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

        {/* Available Quizzes */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            {language === 'en' ? 'Available Quizzes' : 'الاختبارات المتاحة'}
          </h2>

          {loading ? (
            <div className="text-center py-8 text-gray-500">
              {t('loading')}
            </div>
          ) : availableQuizzes.length === 0 ? (
            <div className="text-center py-12">
              <FiBook className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {language === 'en' ? 'No quizzes available yet' : 'لا توجد اختبارات متاحة بعد'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableQuizzes.map((quiz) => (
                <motion.div
                  key={quiz._id}
                  whileHover={{ scale: 1.02 }}
                  className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {quiz.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {quiz.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <FiBook className="w-4 h-4" />
                      <span>{quiz.questions?.length || 0} {t('questions')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiClock className="w-4 h-4" />
                      <span>{quiz.duration} {t('minutes')}</span>
                    </div>
                  </div>
                  <Link
                    to={`/student/quiz/${quiz._id}`}
                    className="block w-full py-2 bg-primary-600 text-white text-center rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    {t('takeQuiz')}
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

