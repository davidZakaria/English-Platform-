import Layout from '../components/Layout'
import { useLanguageStore } from '../store/languageStore'
import { useTranslation } from '../utils/translations'
import { FiBook, FiUsers, FiBarChart2, FiFileText } from 'react-icons/fi'

export default function QuizList() {
  const { language } = useLanguageStore()
  const t = useTranslation(language)

  const navigation = [
    { path: '/teacher', label: t('dashboard'), icon: <FiBarChart2 /> },
    { path: '/teacher/quizzes', label: t('quizzes'), icon: <FiBook /> },
    { path: '/teacher/students', label: t('students'), icon: <FiUsers /> },
    { path: '/teacher/content', label: t('content'), icon: <FiFileText /> },
  ]

  return (
    <Layout navigation={navigation}>
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <FiBook className="w-16 h-16 text-primary-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('quizzes')}</h2>
        <p className="text-gray-600">
          {language === 'en' ? 'Quiz management coming soon!' : 'إدارة الاختبارات قريباً!'}
        </p>
      </div>
    </Layout>
  )
}

