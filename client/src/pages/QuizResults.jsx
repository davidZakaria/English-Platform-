import Layout from '../components/Layout'
import { useLanguageStore } from '../store/languageStore'
import { FiBarChart2 } from 'react-icons/fi'

export default function QuizResults() {
  const { language } = useLanguageStore()

  return (
    <Layout>
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <FiBarChart2 className="w-16 h-16 text-primary-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {language === 'en' ? 'Quiz Results' : 'نتائج الاختبار'}
        </h2>
        <p className="text-gray-600">
          {language === 'en' ? 'Results view coming soon!' : 'عرض النتائج قريباً!'}
        </p>
      </div>
    </Layout>
  )
}

