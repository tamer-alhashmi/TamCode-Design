const express = require('express');
const router = express.Router();
const { submitScore, getLeaderboard, getAllScores, deleteScore } = require('../controllers/quizController');
const { protect } = require('../middleware/auth');

router.post('/score', submitScore);
router.get('/leaderboard', getLeaderboard);
router.get('/scores', protect, getAllScores);
router.delete('/scores/:id', protect, deleteScore);

module.exports = router;
