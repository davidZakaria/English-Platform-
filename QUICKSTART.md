# Quick Start Guide 🚀

Get your English Teacher Platform up and running in 5 minutes!

## Step 1: Install Dependencies

```bash
npm run install:all
```

This will install all dependencies for both frontend and backend.

## Step 2: Set Up Environment Variables

The server already has a `.env` file configured for local development. If you need to customize:

```bash
# In server/.env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/english-teacher-platform
JWT_SECRET=dev-secret-key-change-in-production-12345
NODE_ENV=development
```

## Step 3: Start MongoDB

### Option A: Local MongoDB
Make sure MongoDB is running on your machine:
```bash
# Windows (if installed as service)
net start MongoDB

# macOS (using Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Update `MONGODB_URI` in `server/.env`

## Step 4: Run the Application

```bash
npm run dev
```

This starts both frontend and backend concurrently!

- 🌐 Frontend: http://localhost:5173
- ⚙️ Backend API: http://localhost:5000/api

## Step 5: Login with Demo Account

### Teacher Account
- Email: `teacher@demo.com`
- Password: `password123`

### Student Account  
- Email: `student@demo.com`
- Password: `password123`

**Note:** You'll need to register these accounts first, or create your own!

## Troubleshooting

### Port Already in Use
If port 5173 or 5000 is already in use:

**Frontend (5173):**
```bash
cd client
# Edit vite.config.js to change the port
```

**Backend (5000):**
```bash
# Edit server/.env
PORT=5001
```

### MongoDB Connection Issues

1. **Check if MongoDB is running:**
   ```bash
   # Test connection
   mongosh
   ```

2. **Using MongoDB Atlas?**
   - Whitelist your IP address in Atlas
   - Check your connection string format
   - Ensure password doesn't contain special characters (URL encode if needed)

3. **Connection string format:**
   ```
   mongodb://localhost:27017/dbname  # Local
   mongodb+srv://user:pass@cluster.mongodb.net/dbname  # Atlas
   ```

### Cannot Find Module Errors

Clear node_modules and reinstall:
```bash
# Root
rm -rf node_modules package-lock.json
npm install

# Client
cd client
rm -rf node_modules package-lock.json
npm install

# Server
cd ../server
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors

Make sure the backend is running on port 5000 and frontend proxying is configured correctly in `client/vite.config.js`.

## Next Steps

1. **Create Your First Quiz** (Teacher)
   - Login as teacher
   - Click "Create Quiz"
   - Add questions
   - Publish!

2. **Take a Quiz** (Student)
   - Login as student
   - Browse available quizzes
   - Start taking!

3. **Explore Features**
   - Check the dashboard
   - View leaderboard
   - Manage students
   - Track progress

## Development Commands

```bash
# Run both frontend and backend
npm run dev

# Run frontend only
npm run dev:client

# Run backend only
npm run dev:server

# Install all dependencies
npm run install:all

# Build for production
npm run build

# Start production server
npm start
```

## Need Help?

- 📖 Check the full [README.md](README.md)
- 🐛 Found a bug? Create an issue
- 💡 Have a suggestion? We'd love to hear it!

---

**Happy Teaching! 🎓**

