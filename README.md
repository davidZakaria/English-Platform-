# English Teacher Platform 🎓

A comprehensive Learning Management System (LMS) designed specifically for English teachers in Egyptian secondary schools. Create exams, manage content, track student progress, and engage students with gamification features.

## ✨ Features

### For Teachers 👨‍🏫
- **📝 Quiz & Exam Creation** - Build comprehensive assessments with multiple question types
- **👥 Student Management** - Monitor student performance and track progress
- **📊 Analytics Dashboard** - View detailed statistics and insights
- **📚 Content Management** - Organize lessons, materials, and resources
- **🎯 Grading & Feedback** - Automatic grading with detailed results

### For Students 👨‍🎓
- **✅ Take Quizzes** - Interactive quiz-taking experience
- **📈 Progress Tracking** - Monitor your performance over time
- **🏆 Gamification** - Earn points, badges, and compete on leaderboards
- **📱 Mobile Responsive** - Access from any device

### General Features 🌟
- **🌐 Bilingual Support** - Full Arabic and English interface
- **🎨 Modern UI/UX** - Beautiful, intuitive design
- **🔒 Secure Authentication** - JWT-based authentication system
- **⚡ Real-time Updates** - Fast and responsive experience

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd "Gy Platform"
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/english-teacher-platform
   JWT_SECRET=your-super-secret-jwt-key
   NODE_ENV=development
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running locally or update MONGODB_URI with your MongoDB Atlas connection string.

5. **Run the application**
   
   ```bash
   # Development mode (runs both frontend and backend)
   npm run dev
   ```
   
   Or run separately:
   ```bash
   # Terminal 1 - Backend
   cd server
   npm run dev
   
   # Terminal 2 - Frontend
   cd client
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api

## 📱 Demo Credentials

### Teacher Account
- Email: `teacher@demo.com`
- Password: `password123`

### Student Account
- Email: `student@demo.com`
- Password: `password123`

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Zustand** - State management
- **Axios** - HTTP client
- **React Icons** - Icons
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
Gy Platform/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── store/         # State management
│   │   ├── utils/         # Utilities & helpers
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── server/                # Backend application
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── server.js         # Server entry point
│   └── package.json
│
├── package.json          # Root package file
└── README.md            # This file
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Teacher Routes (Protected)
- `GET /api/teacher/dashboard` - Get dashboard data
- `GET /api/teacher/quizzes` - Get all quizzes
- `POST /api/teacher/quiz` - Create new quiz
- `GET /api/teacher/quiz/:id` - Get quiz details
- `PUT /api/teacher/quiz/:id` - Update quiz
- `DELETE /api/teacher/quiz/:id` - Delete quiz
- `GET /api/teacher/quiz/:id/results` - Get quiz results
- `GET /api/teacher/students` - Get all students

### Student Routes (Protected)
- `GET /api/student/dashboard` - Get dashboard data
- `GET /api/student/quizzes` - Get available quizzes
- `GET /api/student/quiz/:id` - Get quiz for taking
- `POST /api/student/quiz/:id/submit` - Submit quiz answers
- `GET /api/student/submissions` - Get submission history
- `GET /api/student/leaderboard` - Get leaderboard

## 🎯 Comparison with Existing Platforms

### vs Edraak
- ✅ **More focused** on English language teaching
- ✅ **Better gamification** with points and badges
- ✅ **Simpler interface** for secondary school students
- ✅ **Free and open-source**

### vs Tahrir Academy
- ✅ **Interactive assessments** instead of just videos
- ✅ **Student progress tracking**
- ✅ **Teacher-student engagement features**

### vs Edunation
- ✅ **Complete free solution**
- ✅ **More customizable** for individual teachers
- ✅ **Modern, student-friendly interface**

## 🚧 Coming Soon

- [ ] Advanced quiz builder with drag-and-drop
- [ ] Rich text editor for essay questions
- [ ] File upload for assignments
- [ ] Discussion forums
- [ ] Video lessons integration
- [ ] Parent portal
- [ ] Mobile apps (iOS & Android)
- [ ] Offline mode
- [ ] AI-powered question generation
- [ ] Plagiarism detection

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Built with ❤️ for English teachers in Egypt

## 🙏 Acknowledgments

- Inspired by leading educational platforms
- Designed with input from Egyptian secondary school teachers
- Built with modern web technologies

## 📞 Support

For support, email support@englishteacher.platform or create an issue in the repository.

---

**Made with 💙 for Education in Egypt** 🇪🇬

