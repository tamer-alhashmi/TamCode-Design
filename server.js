require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');

const connectDB = require('./backend/config/db');
const errorHandler = require('./backend/middleware/errorHandler');

// Auto-seed admin on startup
const autoSeed = async () => {
  try {
    const Admin = require('./backend/models/Admin');
    const Project = require('./backend/models/Project');

    const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (!adminExists) {
      await Admin.create({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        name: 'TamCode Admin',
      });
      console.log(`🔑 Admin account created: ${process.env.ADMIN_EMAIL}`);
    }

    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany([
        { title: 'Landing Slider', description: 'Creative slider with animated card menu and many layers of animated effects.', image: 'photo/porto1.jpg', link: 'SliderTow.html', linkText: 'Take a look', tags: ['HTML', 'CSS', 'JavaScript'], order: 1 },
        { title: 'Quiz App', description: 'Fun quiz application with timer, leaderboard and real-time scoring.', image: 'prjects/quiz/Quizzes.webp', link: 'prjects/quiz/quiz.html', linkText: 'Test your knowledge', tags: ['JavaScript', 'JSON', 'API'], order: 2 },
        { title: 'Memory Game', description: 'Brain-training memory card matching game with score tracking.', image: 'photo/G2.jpg', link: '#memoryGame', linkText: 'Play Now', tags: ['JavaScript', 'CSS', 'Game'], order: 3 },
        { title: 'Profile Card Design', description: 'Animated profile card with smooth CSS transitions and hover effects.', image: 'photo/cat-04.jpg', link: 'https://tamer-alhashmi.github.io/JavaScript_Profile_Card_Example/', linkText: 'View Project', tags: ['HTML', 'CSS', 'JavaScript'], order: 4 },
        { title: 'Kasper Template', description: 'Full responsive website template with modern design and smooth scrolling.', image: 'photo/cat-05.jpg', link: 'https://tamer-alhashmi.github.io/Kasper_temp2/', linkText: 'View Project', tags: ['HTML', 'CSS', 'Responsive'], order: 5 },
        { title: 'Profile Design', description: 'Personal portfolio profile page with timeline and skill showcase.', image: 'photo/cat-06.jpg', link: 'https://tamer-alhashmi.github.io/Profile_Design/', linkText: 'View Project', tags: ['HTML', 'CSS'], order: 6 },
      ]);
      console.log('📦 Sample projects seeded');
    }
  } catch (err) {
    console.error('⚠️  Auto-seed error:', err.message);
  }
};

// Routes
const authRoutes = require('./backend/routes/auth');
const contactRoutes = require('./backend/routes/contact');
const subscribeRoutes = require('./backend/routes/subscribe');
const quizRoutes = require('./backend/routes/quiz');
const projectRoutes = require('./backend/routes/projects');

// Connect to MongoDB
connectDB().then(() => autoSeed());

const app = express();

// ─── Security Middleware ──────────────────────────────────────────────────────
app.use(
  helmet({
    contentSecurityPolicy: false, // Disabled to allow CDN resources in frontend
  })
);

// ─── Rate Limiting ────────────────────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// ─── CORS ─────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production' ? false : '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ─── Body Parser ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Logger ───────────────────────────────────────────────────────────────────
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ─── Static Files (Frontend) ─────────────────────────────────────────────────
app.use(express.static(path.join(__dirname)));

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/subscribe', subscribeRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/projects', projectRoutes);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'TamCode API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// ─── Serve Frontend for All Non-API Routes ───────────────────────────────────
app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ success: false, message: 'API route not found' });
  }
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ─── Error Handler ────────────────────────────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`\n🚀 TamCode Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`📡 API:      http://localhost:${PORT}/api/health`);
  console.log(`🌐 Frontend: http://localhost:${PORT}`);
  console.log(`🔐 Admin:    http://localhost:${PORT}/admin\n`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

module.exports = app;
