import Layout from '../components/Layout'
import { useLanguageStore } from '../store/languageStore'
import { useTranslation } from '../utils/translations'
import { FiBook } from 'react-icons/fi'

export default function QuizTake() {
  const { language } = useLanguageStore()
  const t = useTranslation(language)

  return (
    <Layout>
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <FiBook className="w-16 h-16 text-primary-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('takeQuiz')}</h2>
        <p className="text-gray-600">
          {language === 'en' ? 'Quiz interface coming soon!' : 'واجهة الاختبار قريباً!'}
        </p>
      </div>
    </Layout>
  )
}

