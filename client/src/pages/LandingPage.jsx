import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiBook, FiBarChart, FiAward, FiGlobe, FiSmartphone, FiCheckCircle } from 'react-icons/fi'
import { useLanguageStore } from '../store/languageStore'
import { useTranslation } from '../utils/translations'

export default function LandingPage() {
  const { language, toggleLanguage } = useLanguageStore()
  const t = useTranslation(language)

  const features = [
    {
      icon: <FiBook className="w-8 h-8" />,
      title: t('feature1Title'),
      desc: t('feature1Desc'),
      color: 'bg-blue-500'
    },
    {
      icon: <FiBarChart className="w-8 h-8" />,
      title: t('feature2Title'),
      desc: t('feature2Desc'),
      color: 'bg-green-500'
    },
    {
      icon: <FiCheckCircle className="w-8 h-8" />,
      title: t('feature3Title'),
      desc: t('feature3Desc'),
      color: 'bg-purple-500'
    },
    {
      icon: <FiAward className="w-8 h-8" />,
      title: t('feature4Title'),
      desc: t('feature4Desc'),
      color: 'bg-yellow-500'
    },
    {
      icon: <FiGlobe className="w-8 h-8" />,
      title: t('feature5Title'),
      desc: t('feature5Desc'),
      color: 'bg-red-500'
    },
    {
      icon: <FiSmartphone className="w-8 h-8" />,
      title: t('feature6Title'),
      desc: t('feature6Desc'),
      color: 'bg-indigo-500'
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <FiBook className="w-8 h-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                {language === 'en' ? 'English Teacher Platform' : 'منصة معلم الإنجليزية'}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleLanguage}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                {language === 'en' ? 'العربية' : 'English'}
              </button>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                {t('login')}
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                {t('register')}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('landingTitle')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-4">
              {t('landingSubtitle')}
            </p>
            <p className="text-lg text-gray-500 mb-8 max-w-3xl mx-auto">
              {t('landingDesc')}
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-4 bg-primary-600 text-white rounded-lg text-lg font-semibold hover:bg-primary-700 transition-all transform hover:scale-105"
              >
                {t('getStarted')}
              </Link>
              <a
                href="#features"
                className="px-8 py-4 border-2 border-primary-600 text-primary-600 rounded-lg text-lg font-semibold hover:bg-primary-50 transition-all"
              >
                {t('features')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('features')}
            </h2>
            <p className="text-xl text-gray-600">
              {language === 'en' 
                ? 'Everything you need to manage your English classes'
                : 'كل ما تحتاجه لإدارة صفوف اللغة الإنجليزية'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-all"
              >
                <div className={`${feature.color} w-16 h-16 rounded-lg flex items-center justify-center text-white mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-12 text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'en' 
                ? 'Ready to transform your teaching?'
                : 'هل أنت مستعد لتحويل طريقة التدريس؟'
              }
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {language === 'en'
                ? 'Join hundreds of teachers already using our platform'
                : 'انضم إلى مئات المعلمين الذين يستخدمون منصتنا بالفعل'
              }
            </p>
            <Link
              to="/register"
              className="inline-block px-8 py-4 bg-white text-primary-600 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              {t('getStarted')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <FiBook className="w-8 h-8" />
            <span className="ml-2 text-xl font-bold">
              {language === 'en' ? 'English Teacher Platform' : 'منصة معلم الإنجليزية'}
            </span>
          </div>
          <p className="text-gray-400">
            {language === 'en'
              ? '© 2025 English Teacher Platform. All rights reserved.'
              : '© 2025 منصة معلم اللغة الإنجليزية. جميع الحقوق محفوظة.'
            }
          </p>
        </div>
      </footer>
    </div>
  )
}

