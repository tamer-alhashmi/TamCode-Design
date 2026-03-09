const QuizScore = require('../models/QuizScore');

// @desc    Submit quiz score
// @route   POST /api/quiz/score
// @access  Public
const submitScore = async (req, res) => {
  try {
    const { playerName, score, totalQuestions, timeTaken, category } = req.body;

    if (!playerName || score === undefined || !totalQuestions) {
      return res.status(400).json({ success: false, message: 'Player name, score, and total questions are required' });
    }

    const percentage = Math.round((score / totalQuestions) * 100);

    const quizScore = await QuizScore.create({
      playerName,
      score,
      totalQuestions,
      percentage,
      timeTaken: timeTaken || 0,
      category: category || 'General',
    });

    // Get rank
    const rank = await QuizScore.countDocuments({ score: { $gt: score } }) + 1;

    res.status(201).json({
      success: true,
      message: 'Score saved!',
      data: { ...quizScore.toObject(), rank },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get leaderboard (top 20)
// @route   GET /api/quiz/leaderboard
// @access  Public
const getLeaderboard = async (req, res) => {
  try {
    const { limit = 20, category } = req.query;
    const filter = {};
    if (category) filter.category = category;

    const scores = await QuizScore.find(filter)
      .sort({ score: -1, timeTaken: 1, playedAt: -1 })
      .limit(parseInt(limit))
      .select('playerName score totalQuestions percentage timeTaken category playedAt');

    res.json({ success: true, total: scores.length, data: scores });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get all scores (admin)
// @route   GET /api/quiz/scores
// @access  Private
const getAllScores = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const total = await QuizScore.countDocuments();
    const scores = await QuizScore.find()
      .sort({ playedAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({ success: true, total, page: parseInt(page), data: scores });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Delete score (admin)
// @route   DELETE /api/quiz/scores/:id
// @access  Private
const deleteScore = async (req, res) => {
  try {
    const score = await QuizScore.findByIdAndDelete(req.params.id);
    if (!score) return res.status(404).json({ success: false, message: 'Score not found' });
    res.json({ success: true, message: 'Score deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { submitScore, getLeaderboard, getAllScores, deleteScore };
