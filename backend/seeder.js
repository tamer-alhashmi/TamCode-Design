require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const Project = require('./models/Project');
const connectDB = require('./config/db');

const seedData = async () => {
  await connectDB();

  try {
    // ── Seed Admin ──────────────────────────────────────────────────────────
    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (!existingAdmin) {
      await Admin.create({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        name: 'TamCode Admin',
      });
      console.log('✅ Admin user created');
      console.log(`   Email:    ${process.env.ADMIN_EMAIL}`);
      console.log(`   Password: ${process.env.ADMIN_PASSWORD}`);
    } else {
      console.log('ℹ️  Admin already exists');
    }

    // ── Seed Projects ───────────────────────────────────────────────────────
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany([
        {
          title: 'Landing Slider',
          description: 'Creative slider with animated card menu. It has many layers and animated effects.',
          image: 'photo/porto1.jpg',
          link: 'SliderTow.html',
          linkText: 'Take a look',
          tags: ['HTML', 'CSS', 'JavaScript'],
          order: 1,
        },
        {
          title: 'Quiz App',
          description: 'A fun and easy-to-use quiz application with leaderboard and timer features.',
          image: 'prjects/quiz/Quizzes.webp',
          link: 'prjects/quiz/quiz.html',
          linkText: 'Test your knowledge',
          tags: ['JavaScript', 'JSON', 'API'],
          order: 2,
        },
        {
          title: 'Memory Game',
          description: 'A brain-training memory card matching game with score tracking and animations.',
          image: 'photo/G2.jpg',
          link: '#memoryGame',
          linkText: 'Play Now',
          tags: ['JavaScript', 'CSS', 'Game'],
          order: 3,
        },
        {
          title: 'Profile Card Design',
          description: 'Animated profile card with smooth CSS transitions and hover effects.',
          image: 'photo/cat-04.jpg',
          link: 'https://tamer-alhashmi.github.io/JavaScript_Profile_Card_Example/',
          linkText: 'View Project',
          tags: ['HTML', 'CSS', 'JavaScript'],
          order: 4,
        },
        {
          title: 'Kasper Template',
          description: 'Full responsive website template with modern design and smooth scrolling.',
          image: 'photo/cat-05.jpg',
          link: 'https://tamer-alhashmi.github.io/Kasper_temp2/',
          linkText: 'View Project',
          tags: ['HTML', 'CSS', 'Responsive'],
          order: 5,
        },
        {
          title: 'Profile Design',
          description: 'Personal portfolio profile page with timeline and skill showcase.',
          image: 'photo/cat-06.jpg',
          link: 'https://tamer-alhashmi.github.io/Profile_Design/',
          linkText: 'View Project',
          tags: ['HTML', 'CSS'],
          order: 6,
        },
      ]);
      console.log('✅ Sample projects seeded');
    } else {
      console.log('ℹ️  Projects already exist, skipping seed');
    }

    console.log('\n🎉 Database seeded successfully!\n');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
};

seedData();
