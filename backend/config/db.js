const mongoose = require('mongoose');

let mongoServer = null;

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI;

    // If no external MongoDB, use in-memory (development/demo)
    if (!uri || uri.includes('localhost') || uri.includes('127.0.0.1')) {
      try {
        const { MongoMemoryServer } = require('mongodb-memory-server');
        mongoServer = await MongoMemoryServer.create();
        uri = mongoServer.getUri();
        console.log('🔧 Using in-memory MongoDB (development mode)');
        // Store for seeder access
        process.env.ACTIVE_MONGO_URI = uri;
      } catch (memErr) {
        // Fallback: try connecting to local MongoDB
        console.log('⚠️  In-memory MongoDB unavailable, trying local connection...');
      }
    }

    const conn = await mongoose.connect(uri);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`);
    console.error('   Make sure MongoDB is running or set MONGO_URI in .env');
    process.exit(1);
  }
};

module.exports = connectDB;
