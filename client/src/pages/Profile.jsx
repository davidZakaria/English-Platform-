import Layout from '../components/Layout'
import { useAuthStore } from '../store/authStore'
import { useLanguageStore } from '../store/languageStore'
import { FiUser } from 'react-icons/fi'

export default function Profile() {
  const { user } = useAuthStore()
  const { language } = useLanguageStore()

  return (
    <Layout>
      <div className="bg-white rounded-xl shadow-sm p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-primary-600 p-4 rounded-full">
            <FiUser className="w-12 h-12 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-medium">
              {user?.role === 'teacher' ? (language === 'en' ? 'Teacher' : 'معلم') : (language === 'en' ? 'Student' : 'طالب')}
            </span>
          </div>
        </div>
        <p className="text-gray-600">
          {language === 'en' ? 'Profile editing coming soon!' : 'تعديل الملف الشخصي قريباً!'}
        </p>
      </div>
    </Layout>
  )
}

