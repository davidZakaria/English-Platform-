import { Link } from 'react-router-dom'
import { FiAlertCircle } from 'react-icons/fi'
import { useLanguageStore } from '../store/languageStore'

export default function NotFound() {
  const { language } = useLanguageStore()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <FiAlertCircle className="w-24 h-24 text-gray-400 mx-auto mb-6" />
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          {language === 'en' ? 'Page Not Found' : 'الصفحة غير موجودة'}
        </h2>
        <p className="text-gray-600 mb-8">
          {language === 'en' 
            ? 'The page you are looking for does not exist.'
            : 'الصفحة التي تبحث عنها غير موجودة.'
          }
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          {language === 'en' ? 'Go Home' : 'العودة للرئيسية'}
        </Link>
      </div>
    </div>
  )
}

