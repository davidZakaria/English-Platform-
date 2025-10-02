import Layout from '../components/Layout'
import { useLanguageStore } from '../store/languageStore'
import { useTranslation } from '../utils/translations'
import { FiBook, FiAward } from 'react-icons/fi'

export default function Leaderboard() {
  const { language } = useLanguageStore()
  const t = useTranslation(language)

  const navigation = [
    { path: '/student', label: t('dashboard'), icon: <FiBook /> },
    { path: '/student/leaderboard', label: t('leaderboard'), icon: <FiAward /> },
  ]

  return (
    <Layout navigation={navigation}>
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <FiAward className="w-16 h-16 text-primary-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('leaderboard')}</h2>
        <p className="text-gray-600">
          {language === 'en' ? 'Leaderboard coming soon!' : 'لوحة المتصدرين قريباً!'}
        </p>
      </div>
    </Layout>
  )
}

