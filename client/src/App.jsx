import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import { useLanguageStore } from './store/languageStore'

// Pages
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import TeacherDashboard from './pages/TeacherDashboard'
import StudentDashboard from './pages/StudentDashboard'
import QuizCreate from './pages/QuizCreate'
import QuizTake from './pages/QuizTake'
import QuizList from './pages/QuizList'
import QuizResults from './pages/QuizResults'
import ContentManagement from './pages/ContentManagement'
import StudentManagement from './pages/StudentManagement'
import Leaderboard from './pages/Leaderboard'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

function App() {
  const { user } = useAuthStore()
  const { language } = useLanguageStore()

  // Set direction based on language
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = language
  }, [language])

  // Protected Route Component
  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!user) {
      return <Navigate to="/login" replace />
    }
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return <Navigate to="/" replace />
    }
    return children
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={user ? <Navigate to={`/${user.role}`} /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to={`/${user.role}`} /> : <Register />} />
        
        {/* Teacher Routes */}
        <Route 
          path="/teacher" 
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/teacher/quiz/create" 
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <QuizCreate />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/teacher/quiz/edit/:id" 
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <QuizCreate />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/teacher/quizzes" 
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <QuizList />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/teacher/content" 
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <ContentManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/teacher/students" 
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <StudentManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/teacher/results/:quizId" 
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <QuizResults />
            </ProtectedRoute>
          } 
        />
        
        {/* Student Routes */}
        <Route 
          path="/student" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/student/quiz/:id" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <QuizTake />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/student/leaderboard" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <Leaderboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Common Routes */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App

