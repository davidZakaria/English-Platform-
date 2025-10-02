import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiBook, FiMail, FiLock } from 'react-icons/fi'
import { useAuthStore } from '../store/authStore'
import { useLanguageStore } from '../store/languageStore'
import { useTranslation } from '../utils/translations'
import api from '../utils/api'
import toast from 'react-hot-toast'

export default function Login() {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()
  const { language, toggleLanguage } = useLanguageStore()
  const t = useTranslation(language)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data } = await api.post('/auth/login', formData)
      setAuth(data.user, data.token)
      toast.success(t('successLogin'))
      navigate(`/${data.user.role}`)
    } catch (error) {
      toast.error(error.response?.data?.message || t('errorLogin'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-primary-600 p-3 rounded-full">
                <FiBook className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {t('login')}
            </h2>
            <p className="text-gray-600">
              {language === 'en' ? 'Welcome back!' : 'مرحباً بعودتك!'}
            </p>
          </div>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="w-full mb-6 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-100 rounded-lg transition-colors"
          >
            {language === 'en' ? 'التبديل إلى العربية' : 'Switch to English'}
          </button>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('email')}
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder={language === 'en' ? 'your@email.com' : 'بريدك الإلكتروني'}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('password')}
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder={language === 'en' ? 'Your password' : 'كلمة المرور'}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? t('loading') : t('login')}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2 font-medium">
              {language === 'en' ? 'Demo Credentials:' : 'بيانات تجريبية:'}
            </p>
            <div className="space-y-1 text-sm text-gray-500">
              <p><strong>{t('teacher')}:</strong> teacher@demo.com / password123</p>
              <p><strong>{t('student')}:</strong> student@demo.com / password123</p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {language === 'en' ? "Don't have an account? " : 'ليس لديك حساب؟ '}
              <Link to="/register" className="text-primary-600 font-semibold hover:text-primary-700">
                {t('register')}
              </Link>
            </p>
            <Link to="/" className="block mt-4 text-gray-500 hover:text-gray-700">
              {t('back')} {language === 'en' ? 'to home' : 'للرئيسية'}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

