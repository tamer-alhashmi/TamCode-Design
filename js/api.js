// ════════════════════════════════════════════════════════════
//  TamCode API Integration — Frontend ↔ Backend
// ════════════════════════════════════════════════════════════

const API_BASE = '/api';

// ── Toast Notification System ────────────────────────────────
function showNotification(message, type = 'success') {
  // Remove existing
  const existing = document.getElementById('tc-toast');
  if (existing) existing.remove();

  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    warning: '⚠️',
  };

  const colors = {
    success: '#4caf50',
    error: '#f44336',
    info: '#2196f3',
    warning: '#ff9800',
  };

  const toast = document.createElement('div');
  toast.id = 'tc-toast';
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: ${colors[type]};
    color: #fff;
    padding: 14px 22px;
    border-radius: 12px;
    font-family: 'Cairo', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    box-shadow: 0 8px 24px rgba(0,0,0,0.25);
    z-index: 99999;
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: 380px;
    animation: slideInToast 0.4s ease;
  `;

  toast.innerHTML = `<span>${icons[type]}</span><span>${message}</span>`;
  document.body.appendChild(toast);

  // Add animation keyframe once
  if (!document.getElementById('tc-toast-style')) {
    const style = document.createElement('style');
    style.id = 'tc-toast-style';
    style.textContent = `
      @keyframes slideInToast {
        from { transform: translateY(80px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      @keyframes slideOutToast {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(80px); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  setTimeout(() => {
    toast.style.animation = 'slideOutToast 0.4s ease forwards';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// ── Set Button Loading State ──────────────────────────────────
function setButtonLoading(btn, loading, originalText) {
  if (loading) {
    btn.disabled = true;
    btn.dataset.originalValue = btn.value || btn.textContent;
    if (btn.tagName === 'INPUT') {
      btn.value = 'Sending...';
    } else {
      btn.textContent = 'Sending...';
    }
  } else {
    btn.disabled = false;
    if (btn.tagName === 'INPUT') {
      btn.value = originalText || btn.dataset.originalValue;
    } else {
      btn.textContent = originalText || btn.dataset.originalValue;
    }
  }
}

// ── Handle Subscribe Form ─────────────────────────────────────
async function handleSubscribe(e) {
  e.preventDefault();
  const email = document.getElementById('subscribeEmail').value.trim();
  const msgEl = document.getElementById('subscribeMsg');
  const btn = document.querySelector('#subscribeForm input[type="submit"]');

  if (!email) {
    msgEl.style.color = '#f44336';
    msgEl.textContent = 'Please enter a valid email address.';
    return;
  }

  setButtonLoading(btn, true);
  msgEl.textContent = '';

  try {
    const res = await fetch(`${API_BASE}/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (data.success) {
      msgEl.style.color = '#4caf50';
      msgEl.textContent = data.message;
      document.getElementById('subscribeEmail').value = '';
      showNotification(data.message, 'success');
    } else {
      msgEl.style.color = '#f44336';
      msgEl.textContent = data.message;
      showNotification(data.message, 'error');
    }
  } catch (err) {
    msgEl.style.color = '#f44336';
    msgEl.textContent = 'Server not available. Please try again later.';
    showNotification('Could not connect to server.', 'error');
  } finally {
    setButtonLoading(btn, false, 'Subscribe');
  }
}

// ── Handle Discount / Contact Form ───────────────────────────
async function handleDiscount(e) {
  e.preventDefault();

  const name = document.getElementById('discountName').value.trim();
  const email = document.getElementById('discountEmail').value.trim();
  const phone = document.getElementById('discountPhone').value.trim();
  const message = document.getElementById('discountMessage').value.trim();
  const msgEl = document.getElementById('discountMsg');
  const btn = document.querySelector('#discountForm input[type="submit"]');

  if (!name || !email || !message) {
    msgEl.style.color = '#f44336';
    msgEl.textContent = 'Please fill in all required fields.';
    return;
  }

  setButtonLoading(btn, true);
  msgEl.textContent = '';

  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, message, type: 'discount' }),
    });

    const data = await res.json();

    if (data.success) {
      msgEl.style.color = '#4caf50';
      msgEl.textContent = data.message;
      // Reset form
      document.getElementById('discountForm').reset();
      showNotification('Your request was sent successfully! 🎉', 'success');
    } else {
      msgEl.style.color = '#f44336';
      msgEl.textContent = data.message;
      showNotification(data.message, 'error');
    }
  } catch (err) {
    msgEl.style.color = '#f44336';
    msgEl.textContent = 'Server not available. Please try again later.';
    showNotification('Could not connect to server.', 'error');
  } finally {
    setButtonLoading(btn, false, 'Send Request');
  }
}
