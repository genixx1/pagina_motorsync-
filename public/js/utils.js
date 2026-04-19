/* ═══════════════════════════════════════
   MOTORSYNC — utils.js
   Scroll reveal · Counter animation · Toast
═══════════════════════════════════════ */

/* ── SCROLL REVEAL ── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('vis'), i * 80);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ── COUNTER ANIMATION ── */
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const step  = target / 60;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current) + suffix;
  }, 25);
}

const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      entry.target.dataset.animated = '1';
      animateCounter(
        entry.target,
        +entry.target.dataset.target,
        entry.target.dataset.suffix || ''
      );
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.js-counter').forEach(el => counterObs.observe(el));

/* ── TOAST ── */
function showToast(msg, type = 'success') {
  const t = document.createElement('div');
  t.className = 'toast';
  t.style.background = type === 'error' ? '#333' : 'var(--r)';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3600);
}

window.showToast = showToast;
