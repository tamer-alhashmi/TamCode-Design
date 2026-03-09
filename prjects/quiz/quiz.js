// ════════════════════════════════════════════════════════════
//  TamCode Quiz App — Full Rewrite with API Integration
// ════════════════════════════════════════════════════════════

const API = '/api';

// ── State ────────────────────────────────────────────────────
let questions = [];
let currentIndex = 0;
let score = 0;
let selectedAnswer = null;
let timerInterval = null;
let totalTime = 0;
let questionTime = 30; // seconds per question
let timeLeft = questionTime;
let playerName = '';
let quizStartTime = null;

// ── DOM References ────────────────────────────────────────────
const welcomeScreen   = document.getElementById('welcomeScreen');
const quizScreen      = document.getElementById('quizScreen');
const resultsScreen   = document.getElementById('resultsScreen');
const leaderboardScreen = document.getElementById('leaderboardScreen');

// ── Fetch Questions ───────────────────────────────────────────
async function fetchQuestions() {
  try {
    const res = await fetch('html_questions.json');
    const data = await res.json();
    questions = shuffleArray(data.Islamic_Qustions || []);
    return true;
  } catch (err) {
    console.error('Failed to load questions:', err);
    showError('فشل تحميل الأسئلة. يرجى إعادة المحاولة.');
    return false;
  }
}

// ── Start Quiz ────────────────────────────────────────────────
async function startQuiz() {
  playerName = document.getElementById('playerNameInput').value.trim();
  if (!playerName) {
    document.getElementById('nameError').style.display = 'block';
    document.getElementById('playerNameInput').focus();
    return;
  }
  document.getElementById('nameError').style.display = 'none';

  const loaded = await fetchQuestions();
  if (!loaded) return;

  currentIndex = 0;
  score = 0;
  totalTime = 0;
  quizStartTime = Date.now();

  welcomeScreen.style.display = 'none';
  quizScreen.style.display = 'block';
  resultsScreen.style.display = 'none';

  renderQuestion();
}

// ── Render Question ───────────────────────────────────────────
function renderQuestion() {
  if (currentIndex >= questions.length) {
    endQuiz();
    return;
  }

  selectedAnswer = null;
  const q = questions[currentIndex];

  // Progress
  const progress = ((currentIndex) / questions.length) * 100;
  document.getElementById('progressBar').style.width = progress + '%';
  document.getElementById('questionCounter').textContent =
    `السؤال ${currentIndex + 1} من ${questions.length}`;
  document.getElementById('scoreDisplay').textContent = `النقاط: ${score}`;

  // Question text
  document.getElementById('questionText').textContent = q.title;

  // Answers
  const answers = [
    { id: 'a', text: q.ansower_1 },
    { id: 'b', text: q.ansower_2 },
    { id: 'c', text: q.ansower_3 },
    { id: 'd', text: q.ansower_4 },
  ];

  // Shuffle answers
  const shuffled = shuffleArray(answers);
  document.getElementById('answersContainer').innerHTML = shuffled.map(a => `
    <div class="answer-option" onclick="selectAnswer(this, '${a.text}', '${q.right_answer.replace(/'/g, "\\'")}')">
      <div class="answer-marker">${a.id.toUpperCase()}</div>
      <span>${a.text}</span>
    </div>
  `).join('');

  // Update bullets
  renderBullets();

  // Reset & start timer
  clearInterval(timerInterval);
  timeLeft = questionTime;
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      autoSkip();
    }
  }, 1000);

  // Disable next button
  document.getElementById('nextBtn').disabled = true;
  document.getElementById('nextBtn').style.opacity = '0.5';
}

// ── Select Answer ─────────────────────────────────────────────
function selectAnswer(el, chosen, correct) {
  if (selectedAnswer !== null) return; // Already answered
  selectedAnswer = chosen;

  clearInterval(timerInterval);
  document.getElementById('nextBtn').disabled = false;
  document.getElementById('nextBtn').style.opacity = '1';

  // Mark all options
  const options = document.querySelectorAll('.answer-option');
  options.forEach(opt => {
    const optText = opt.querySelector('span').textContent;
    opt.classList.remove('correct', 'wrong', 'selected');
    if (optText === correct) {
      opt.classList.add('correct');
    }
  });

  if (chosen === correct) {
    el.classList.add('correct');
    score++;
    playSound('success');
  } else {
    el.classList.add('wrong');
    playSound('fail');
  }
}

// ── Auto Skip (timer out) ─────────────────────────────────────
function autoSkip() {
  if (selectedAnswer !== null) return;
  selectedAnswer = '__timeout__';

  // Show correct answer
  const q = questions[currentIndex];
  document.querySelectorAll('.answer-option').forEach(opt => {
    if (opt.querySelector('span').textContent === q.right_answer) {
      opt.classList.add('correct');
    }
  });

  document.getElementById('nextBtn').disabled = false;
  document.getElementById('nextBtn').style.opacity = '1';
  playSound('fail');
}

// ── Next Question ─────────────────────────────────────────────
function nextQuestion() {
  currentIndex++;
  if (currentIndex >= questions.length) {
    endQuiz();
  } else {
    renderQuestion();
  }
}

// ── End Quiz ──────────────────────────────────────────────────
async function endQuiz() {
  clearInterval(timerInterval);
  totalTime = Math.round((Date.now() - quizStartTime) / 1000);

  const percentage = Math.round((score / questions.length) * 100);

  quizScreen.style.display = 'none';
  resultsScreen.style.display = 'block';

  // Result message
  let message = '';
  let emoji = '';
  if (percentage === 100) { message = 'ممتاز! أداء مثالي!'; emoji = '🏆'; }
  else if (percentage >= 80) { message = 'عمل رائع! أداء متميز!'; emoji = '🌟'; }
  else if (percentage >= 60) { message = 'جيد! يمكنك تحسين أدائك!'; emoji = '👍'; }
  else if (percentage >= 40) { message = 'مقبول. حاول مرة أخرى!'; emoji = '📚'; }
  else { message = 'تحتاج إلى مزيد من الدراسة!'; emoji = '💪'; }

  document.getElementById('resultEmoji').textContent = emoji;
  document.getElementById('resultMessage').textContent = message;
  document.getElementById('resultScore').textContent = `${score} / ${questions.length}`;
  document.getElementById('resultPercentage').textContent = `${percentage}%`;
  document.getElementById('resultTime').textContent = `${totalTime} ثانية`;
  document.getElementById('resultName').textContent = playerName;

  // Animated score ring
  const circle = document.getElementById('scoreCircle');
  if (circle) {
    const circumference = 2 * Math.PI * 45;
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference - (percentage / 100) * circumference;
  }

  // Save score to backend
  try {
    const res = await fetch(`${API}/quiz/score`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        playerName,
        score,
        totalQuestions: questions.length,
        timeTaken: totalTime,
        category: 'General',
      }),
    });
    const data = await res.json();
    if (data.success && data.data.rank) {
      document.getElementById('resultRank').textContent = `ترتيبك: #${data.data.rank}`;
    }
  } catch (err) {
    console.warn('Could not save score:', err);
  }
}

// ── Restart Quiz ──────────────────────────────────────────────
function restartQuiz() {
  resultsScreen.style.display = 'none';
  leaderboardScreen.style.display = 'none';
  welcomeScreen.style.display = 'flex';
}

// ── Show Leaderboard ──────────────────────────────────────────
async function showLeaderboard() {
  resultsScreen.style.display = 'none';
  leaderboardScreen.style.display = 'block';

  document.getElementById('leaderboardList').innerHTML = '<div class="loading-msg">جاري تحميل الترتيب...</div>';

  try {
    const res = await fetch(`${API}/quiz/leaderboard?limit=10`);
    const data = await res.json();

    if (!data.success || !data.data.length) {
      document.getElementById('leaderboardList').innerHTML = '<div class="empty-msg">لا توجد نتائج بعد</div>';
      return;
    }

    document.getElementById('leaderboardList').innerHTML = data.data.map((entry, i) => {
      const medals = ['🥇', '🥈', '🥉'];
      const medal = medals[i] || `#${i + 1}`;
      const isMe = entry.playerName === playerName && entry.score === score;
      return `
        <div class="leaderboard-item ${isMe ? 'is-me' : ''}">
          <span class="rank">${medal}</span>
          <span class="player-name">${entry.playerName}${isMe ? ' (أنت)' : ''}</span>
          <span class="player-score">${entry.score}/${entry.totalQuestions} — ${entry.percentage}%</span>
        </div>
      `;
    }).join('');
  } catch (err) {
    document.getElementById('leaderboardList').innerHTML = '<div class="empty-msg">تعذر تحميل الترتيب</div>';
  }
}

// ── Helpers ───────────────────────────────────────────────────
function renderBullets() {
  const container = document.getElementById('bulletsContainer');
  container.innerHTML = questions.map((_, i) => `
    <span class="bullet ${i < currentIndex ? 'done' : i === currentIndex ? 'active' : ''}"></span>
  `).join('');
}

function updateTimerDisplay() {
  const el = document.getElementById('timerDisplay');
  if (!el) return;
  el.textContent = timeLeft;
  el.style.color = timeLeft <= 5 ? '#f44336' : timeLeft <= 10 ? '#ff9800' : '#2196f3';
  el.style.transform = timeLeft <= 5 ? 'scale(1.3)' : 'scale(1)';
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function playSound(type) {
  try {
    const audio = document.getElementById(type === 'success' ? 'success' : 'fail');
    if (audio) { audio.currentTime = 0; audio.play(); }
  } catch (e) { /* ignore */ }
}

function showError(msg) {
  document.getElementById('quizError').textContent = msg;
  document.getElementById('quizError').style.display = 'block';
}
