const mongoose = require('mongoose');

const QuizScoreSchema = new mongoose.Schema({
  playerName: {
    type: String,
    required: [true, 'Player name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters'],
  },
  score: {
    type: Number,
    required: true,
    min: 0,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
  timeTaken: {
    type: Number, // seconds
    default: 0,
  },
  category: {
    type: String,
    default: 'General',
  },
  playedAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for leaderboard sorting
QuizScoreSchema.index({ score: -1, timeTaken: 1 });

module.exports = mongoose.model('QuizScore', QuizScoreSchema);
