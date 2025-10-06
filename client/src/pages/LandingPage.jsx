import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiBook, FiBarChart, FiAward, FiGlobe, FiSmartphone, FiCheckCircle, FiStar, FiUsers, FiTrendingUp, FiTarget, FiHeart, FiZap } from 'react-icons/fi'
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
    <div className="min-h-screen bg-white">
      {/* Premium Navigation */}
      <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">GY</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 leading-tight">
                  {language === 'en' ? 'Mrs. Georgette Youssef' : 'الأستاذة جورجيت يوسف'}
                </h1>
                <p className="text-xs text-gray-500">
                  {language === 'en' ? 'Saint Fatima Language School' : 'مدرسة سانت فاطيما للغات'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleLanguage}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50"
              >
                {language === 'en' ? 'العربية' : 'English'}
              </button>
              <Link
                to="/login"
                className="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
              >
                {t('login')}
              </Link>
              <Link
                to="/register"
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all font-semibold text-sm"
              >
                {t('getStarted')}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Premium Hero Section - Inspired by Masterclass */}
      <section className="relative pt-16 pb-32 px-4 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-60"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)'
        }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg mb-6 border border-purple-100"
              >
                <FiStar className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {language === 'en' ? '20+ Years of Excellence' : 'خبرة تفوق 20 عاماً'}
                </span>
              </motion.div>

              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                {language === 'en' ? (
                  <>
                    Master English with<br />
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Mrs. Georgette
                    </span>
                  </>
                ) : (
                  <>
                    أتقن اللغة الإنجليزية مع<br />
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      الأستاذة جورجيت
                    </span>
                  </>
                )}
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {language === 'en' 
                  ? 'Experience world-class English education from a distinguished teacher at Saint Fatima Language School. Transform your language skills with personalized guidance and proven methods.'
                  : 'اختبر تعليم اللغة الإنجليزية عالمي المستوى من معلمة متميزة في مدرسة سانت فاطيما للغات. حوّل مهاراتك اللغوية مع التوجيه الشخصي والأساليب المثبتة.'
                }
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 mb-10">
                <div>
                  <div className="text-4xl font-bold text-gray-900">20+</div>
                  <div className="text-sm text-gray-600">{language === 'en' ? 'Years Experience' : 'عاماً خبرة'}</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600">{language === 'en' ? 'Successful Students' : 'طالب متفوق'}</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-gray-900">98%</div>
                  <div className="text-sm text-gray-600">{language === 'en' ? 'Success Rate' : 'معدل النجاح'}</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-lg font-semibold hover:shadow-2xl transition-all transform hover:scale-105 inline-flex items-center gap-2"
                >
                  {t('getStarted')}
                  <FiZap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </Link>
                <a
                  href="#about"
                  className="px-8 py-4 bg-white text-gray-900 rounded-xl text-lg font-semibold hover:shadow-xl transition-all border-2 border-gray-200 hover:border-purple-200"
                >
                  {language === 'en' ? 'Learn More' : 'معرفة المزيد'}
                </a>
              </div>
            </motion.div>

            {/* Right Content - Premium Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                {/* Profile Section */}
                <div className="text-center mb-8">
                  <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 p-1 shadow-xl">
                    <div className="w-full h-full bg-white rounded-full overflow-hidden flex items-center justify-center">
                      <img 
                        src="/teacher-photo.jpg" 
                        alt="Mrs. Georgette Youssef"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                      <span 
                        className="text-6xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent hidden"
                        style={{display: 'none'}}
                      >
                        GY
                      </span>
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    {language === 'en' ? 'Mrs. Georgette Youssef' : 'الأستاذة جورجيت يوسف'}
                  </h3>
                  <p className="text-lg text-purple-600 font-semibold mb-1">
                    {language === 'en' ? 'English Supervisor Teacher' : 'مشرفة اللغة الإنجليزية'}
                  </p>
                  <p className="text-gray-600">
                    {language === 'en' ? 'Saint Fatima Language School' : 'مدرسة سانت فاطيما للغات'}
                  </p>
                </div>

                {/* Achievements */}
                <div className="space-y-4">
                  {[
                    { icon: FiAward, text: language === 'en' ? 'Award-Winning Educator' : 'معلمة حائزة على جوائز', color: 'text-yellow-500' },
                    { icon: FiUsers, text: language === 'en' ? '500+ Students Mentored' : '+500 طالب تم تدريبهم', color: 'text-blue-500' },
                    { icon: FiTarget, text: language === 'en' ? 'Specialized in Secondary Ed' : 'متخصصة في المرحلة الثانوية', color: 'text-purple-500' },
                    { icon: FiHeart, text: language === 'en' ? 'Passionate About Teaching' : 'شغوفة بالتدريس', color: 'text-pink-500' },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                      <span className="text-gray-700 font-medium">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 blur-2xl"
              ></motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-2xl"
              ></motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'Why Study with Mrs. Georgette?' : 'لماذا تدرس مع الأستاذة جورجيت؟'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {language === 'en'
                ? 'Experience the difference that two decades of teaching excellence makes'
                : 'اختبر الفرق الذي يصنعه عقدان من التميز في التدريس'
              }
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                number: '01',
                title: language === 'en' ? 'Proven Track Record' : 'سجل حافل مثبت',
                desc: language === 'en' 
                  ? '20+ years of experience with 500+ successful students who achieved excellence in English language skills.'
                  : 'أكثر من 20 عاماً من الخبرة مع أكثر من 500 طالب ناجح حققوا التميز في مهارات اللغة الإنجليزية.',
                icon: FiTrendingUp
              },
              {
                number: '02',
                title: language === 'en' ? 'Personalized Approach' : 'نهج شخصي',
                desc: language === 'en'
                  ? 'Individual attention and customized learning plans designed to meet each student\'s unique needs and goals.'
                  : 'اهتمام فردي وخطط تعليمية مخصصة مصممة لتلبية احتياجات وأهداف كل طالب الفريدة.',
                icon: FiTarget
              },
              {
                number: '03',
                title: language === 'en' ? 'Modern Methods' : 'أساليب حديثة',
                desc: language === 'en'
                  ? 'Combining traditional teaching excellence with cutting-edge technology for an engaging learning experience.'
                  : 'الجمع بين التميز التعليمي التقليدي والتكنولوجيا المتطورة لتجربة تعليمية جذابة.',
                icon: FiZap
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <div className="relative bg-white p-8 rounded-2xl border-2 border-gray-100 group-hover:border-purple-200 transition-all h-full">
                  <div className="text-6xl font-bold text-transparent bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text mb-4">
                    {item.number}
                  </div>
                  <item.icon className="w-12 h-12 text-purple-600 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Inspired by Masterclass */}
      <section className="py-24 px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 30% 50%, white 0%, transparent 50%), radial-gradient(circle at 70% 80%, white 0%, transparent 50%)'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              {language === 'en' ? 'Student Success Stories' : 'قصص نجاح الطلاب'}
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {language === 'en'
                ? 'Hear from students who transformed their English skills'
                : 'استمع من الطلاب الذين حولوا مهاراتهم في اللغة الإنجليزية'
              }
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: language === 'en' ? 'Ahmed Hassan' : 'أحمد حسن',
                role: language === 'en' ? 'Secondary Student' : 'طالب ثانوي',
                text: language === 'en'
                  ? 'Mrs. Georgette transformed my English from average to excellent! Her teaching methods are engaging and effective.'
                  : 'حولت الأستاذة جورجيت لغتي الإنجليزية من متوسطة إلى ممتازة! أساليب تدريسها جذابة وفعالة.',
                rating: 5
              },
              {
                name: language === 'en' ? 'Maryam Ali' : 'مريم علي',
                role: language === 'en' ? 'Secondary Student' : 'طالبة ثانوية',
                text: language === 'en'
                  ? 'The personalized attention and modern platform made learning English enjoyable. Highly recommended!'
                  : 'الاهتمام الشخصي والمنصة الحديثة جعلت تعلم اللغة الإنجليزية ممتعاً. أوصي بشدة!',
                rating: 5
              },
              {
                name: language === 'en' ? 'Omar Khalil' : 'عمر خليل',
                role: language === 'en' ? 'Secondary Student' : 'طالب ثانوي',
                text: language === 'en'
                  ? 'Her 20+ years of experience really shows. Best English teacher I\'ve ever had at Saint Fatima!'
                  : 'خبرتها التي تفوق 20 عاماً واضحة حقاً. أفضل معلمة لغة إنجليزية في سانت فاطيما!',
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'Platform Features' : 'مميزات المنصة'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {language === 'en' 
                ? 'Everything you need for excellence in English education'
                : 'كل ما تحتاجه للتميز في تعليم اللغة الإنجليزية'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl hover:shadow-2xl transition-all border border-gray-100 hover:border-purple-200"
              >
                <div className={`${feature.color} w-14 h-14 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
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

      {/* About Teacher Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'About Your Teacher' : 'عن معلمتك'}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-primary-600 to-purple-600 rounded-full p-1 mb-6 mx-auto shadow-xl">
                <div className="w-full h-full bg-white rounded-full overflow-hidden flex items-center justify-center">
                  <img 
                    src="/teacher-photo.jpg" 
                    alt="Mrs. Georgette Youssef"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <span 
                    className="text-5xl font-bold text-white hidden"
                    style={{display: 'none'}}
                  >
                    GY
                  </span>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 text-center mb-2">
                {language === 'en' ? 'Mrs. Georgette Youssef' : 'الأستاذة جورجيت يوسف'}
              </h3>
              <p className="text-primary-600 text-center font-semibold mb-4">
                {language === 'en' ? 'English Supervisor Teacher' : 'مشرفة اللغة الإنجليزية'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {language === 'en' ? '🏫 Saint Fatima Language School' : '🏫 مدرسة سانت فاطيما للغات'}
                </h4>
                <p className="text-gray-600">
                  {language === 'en' 
                    ? 'Dedicated English teacher committed to excellence in education and student success.'
                    : 'معلمة لغة إنجليزية متفانية ملتزمة بالتميز في التعليم ونجاح الطلاب.'
                  }
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {language === 'en' ? '📚 20+ Years of Experience' : '📚 خبرة أكثر من 20 عاماً'}
                </h4>
                <p className="text-gray-600">
                  {language === 'en'
                    ? 'Over two decades of teaching secondary school students, helping hundreds achieve their English language goals.'
                    : 'أكثر من عقدين من تدريس طلاب المرحلة الثانوية، مساعدة المئات على تحقيق أهدافهم في اللغة الإنجليزية.'
                  }
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {language === 'en' ? '🎯 Teaching Philosophy' : '🎯 فلسفة التدريس'}
                </h4>
                <p className="text-gray-600">
                  {language === 'en'
                    ? 'Every student can excel in English with the right guidance, practice, and personalized attention. My platform provides interactive learning, regular assessments, and continuous feedback.'
                    : 'كل طالب يمكنه التفوق في اللغة الإنجليزية مع التوجيه الصحيح والممارسة والاهتمام الشخصي. توفر منصتي تعلماً تفاعلياً وتقييمات منتظمة وملاحظات مستمرة.'
                  }
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section - Inspired by Apple */}
      <section id="about" className="py-32 px-4 bg-gradient-to-b from-white via-blue-50 to-purple-50">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {language === 'en' 
                ? 'Begin Your Journey to English Excellence'
                : 'ابدأ رحلتك نحو التميز في اللغة الإنجليزية'
              }
            </h2>
            <p className="text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              {language === 'en'
                ? 'Join Mrs. Georgette Youssef at Saint Fatima Language School and unlock your full potential in English'
                : 'انضم إلى الأستاذة جورجيت يوسف في مدرسة سانت فاطيما للغات واطلق العنان لإمكاناتك الكاملة في اللغة الإنجليزية'
              }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/register"
                className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl text-xl font-bold hover:shadow-2xl transition-all transform hover:scale-105 inline-flex items-center justify-center gap-3"
              >
                {t('getStarted')}
                <FiZap className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="px-10 py-5 bg-white text-gray-900 rounded-2xl text-xl font-bold hover:shadow-xl transition-all border-2 border-gray-300 hover:border-purple-400"
              >
                {t('login')}
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <FiAward className="w-6 h-6 text-yellow-500" />
                <span className="text-gray-700 font-semibold">
                  {language === 'en' ? '20+ Years Excellence' : 'خبرة +20 عاماً'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FiUsers className="w-6 h-6 text-blue-500" />
                <span className="text-gray-700 font-semibold">
                  {language === 'en' ? '500+ Students' : '+500 طالب'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FiStar className="w-6 h-6 text-purple-500 fill-current" />
                <span className="text-gray-700 font-semibold">
                  {language === 'en' ? '98% Success Rate' : 'معدل نجاح 98%'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Premium Footer - Inspired by Coursera */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-xl">
                  <span className="text-white font-bold text-xl">GY</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">
                    {language === 'en' ? 'Mrs. Georgette Youssef' : 'الأستاذة جورجيت يوسف'}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {language === 'en' ? 'Excellence in English Education' : 'التميز في تعليم اللغة الإنجليزية'}
                  </p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {language === 'en'
                  ? 'With over 20 years of teaching excellence at Saint Fatima Language School, providing world-class English education to secondary school students.'
                  : 'مع أكثر من 20 عاماً من التميز في التدريس في مدرسة سانت فاطيما للغات، نقدم تعليماً عالمي المستوى في اللغة الإنجليزية لطلاب المرحلة الثانوية.'
                }
              </p>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
                  <FiAward className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm font-semibold">20+ Years</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
                  <FiUsers className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-semibold">500+ Students</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
                  <FiStar className="w-5 h-5 text-purple-400 fill-current" />
                  <span className="text-sm font-semibold">98% Success</span>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-4">
                {language === 'en' ? 'Quick Links' : 'روابط سريعة'}
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/login" className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2">
                    <span>{language === 'en' ? 'Student Login' : 'دخول الطلاب'}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2">
                    <span>{language === 'en' ? 'Register Now' : 'سجل الآن'}</span>
                  </Link>
                </li>
                <li>
                  <a href="#features" className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2">
                    <span>{language === 'en' ? 'Features' : 'المميزات'}</span>
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2">
                    <span>{language === 'en' ? 'About' : 'عن المعلمة'}</span>
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-lg mb-4">
                {language === 'en' ? 'Contact' : 'التواصل'}
              </h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start gap-2">
                  <FiBook className="w-5 h-5 mt-1 text-purple-400" />
                  <span>{language === 'en' ? 'Saint Fatima Language School' : 'مدرسة سانت فاطيما للغات'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiGlobe className="w-5 h-5 mt-1 text-blue-400" />
                  <span>{language === 'en' ? 'Secondary Education' : 'التعليم الثانوي'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiAward className="w-5 h-5 mt-1 text-yellow-400" />
                  <span>{language === 'en' ? 'Award-Winning Teacher' : 'معلمة حائزة على جوائز'}</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm text-center md:text-left">
                {language === 'en'
                  ? '© 2025 Mrs. Georgette Youssef - Saint Fatima Language School. All rights reserved.'
                  : '© 2025 الأستاذة جورجيت يوسف - مدرسة سانت فاطيما للغات. جميع الحقوق محفوظة.'
                }
              </p>
              <button
                onClick={toggleLanguage}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm font-medium"
              >
                {language === 'en' ? '🌐 العربية' : '🌐 English'}
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

