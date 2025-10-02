import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protect = async (req, res, next) => {
  try {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret-key')
    req.user = await User.findById(decoded.id).select('-password')

    if (!req.user) {
      return res.status(401).json({ message: 'User not found' })
    }

    next()
  } catch (error) {
    console.error('Auth middleware error:', error)
    res.status(401).json({ message: 'Not authorized, token failed' })
  }
}

export const teacherOnly = (req, res, next) => {
  if (req.user && req.user.role === 'teacher') {
    next()
  } else {
    res.status(403).json({ message: 'Access denied. Teachers only.' })
  }
}

export const studentOnly = (req, res, next) => {
  if (req.user && req.user.role === 'student') {
    next()
  } else {
    res.status(403).json({ message: 'Access denied. Students only.' })
  }
}

