import { Link, useNavigate } from 'react-router-dom'
import { FiBook, FiLogOut, FiUser, FiGlobe } from 'react-icons/fi'
import { useAuthStore } from '../store/authStore'
import { useLanguageStore } from '../store/languageStore'
import { useTranslation } from '../utils/translations'
import toast from 'react-hot-toast'

export default function Layout({ children, navigation }) {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const { language, toggleLanguage } = useLanguageStore()
  const t = useTranslation(language)

  const handleLogout = () => {
    logout()
    toast.success(t('successLogout'))
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to={`/${user?.role}`} className="flex items-center">
                <FiBook className="w-8 h-8 text-primary-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  {language === 'en' ? 'Ms. Georgette Youssef' : 'الأستاذة جورجيت يوسف'}
                </span>
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={toggleLanguage}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title={language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
              >
                <FiGlobe className="w-5 h-5" />
              </button>
              
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiUser className="w-5 h-5" />
                <span className="font-medium">{user?.name}</span>
              </Link>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <FiLogOut className="w-5 h-5" />
                <span className="font-medium">{t('logout')}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sub Navigation */}
      {navigation && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-1 overflow-x-auto scrollbar-hide">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-3 font-medium whitespace-nowrap transition-colors ${
                    window.location.pathname === item.path
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}

