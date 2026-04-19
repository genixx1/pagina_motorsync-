/* ═══════════════════════════════════════
   MOTORSYNC — home.js
   Hero inline chat panel + contact form
═══════════════════════════════════════ */

/* ── HERO INLINE CHAT ── */
const panelMsgs  = document.getElementById('panelMsgs');
const panelInput = document.getElementById('panelInput');
const panelSend  = document.getElementById('panelSend');

let panelHistory = [];
let panelBusy    = false;

function panelScrollBottom() {
  if (panelMsgs) panelMsgs.scrollTop = panelMsgs.scrollHeight;
}

function panelAddMsg(role, text) {
  if (!panelMsgs) return;
  const div = document.createElement('div');
  div.className = `chat-msg chat-msg--${role}`;
  const html = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
  if (role === 'bot') {
    div.innerHTML = `
      <div class="chat-msg__row">
        <div class="chat-msg__av">🤖</div>
        <div class="chat-msg__bubble">${html}</div>
      </div>
      <span class="chat-msg__time">Ahora</span>`;
  } else {
    div.innerHTML = `
      <div class="chat-msg__bubble">${html}</div>
      <span class="chat-msg__time">Tú</span>`;
  }
  panelMsgs.appendChild(div);
  panelScrollBottom();
}

function panelShowTyping() {
  const d = document.createElement('div');
  d.className = 'chat-msg chat-msg--bot'; d.id = 'panelTyping';
  d.innerHTML = `<div class="chat-msg__row"><div class="chat-msg__av">🤖</div><div class="chat-typing"><span></span><span></span><span></span></div></div>`;
  panelMsgs.appendChild(d); panelScrollBottom();
}
function panelRemoveTyping() { document.getElementById('panelTyping')?.remove(); }

async function panelSendMsg() {
  if (panelBusy || !panelInput) return;
  const text = panelInput.value.trim();
  if (!text) return;
  panelInput.value = '';
  panelSend.disabled = true;
  panelBusy = true;

  panelAddMsg('user', text);
  panelHistory.push({ role: 'user', content: text });
  panelShowTyping();

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: panelHistory.slice(-12) })
    });
    const data = await res.json();
    panelRemoveTyping();
    const reply = data.message || 'Hubo un error. Escríbenos al WhatsApp: +51 992 198 342 📱';
    panelAddMsg('bot', reply);
    panelHistory.push({ role: 'assistant', content: reply });
  } catch {
    panelRemoveTyping();
    panelAddMsg('bot', 'Error de conexión. Contáctanos por WhatsApp: **+51 992 198 342** 📱');
  }
  panelBusy = false;
  panelSend.disabled = false;
}

// Quick chips in hero panel
document.querySelectorAll('.chat-panel__chip').forEach(btn => {
  btn.addEventListener('click', () => {
    const msg = btn.dataset.msg;
    btn.closest('.chat-panel__chips')?.remove();
    panelInput.value = msg;
    panelSendMsg();
  });
});

if (panelSend) panelSend.addEventListener('click', panelSendMsg);
if (panelInput) panelInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); panelSendMsg(); }
});

/* ── CONTACT FORM ── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Enviando...';
    btn.disabled = true;
    try {
      const r = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre:  contactForm.nombre?.value,
          tel:     contactForm.tel?.value,
          plan:    contactForm.plan?.value,
          mensaje: contactForm.mensaje?.value,
        })
      });
      const d = await r.json();
      if (d.success) { showToast('¡Mensaje enviado! Te contactamos pronto 🚗'); contactForm.reset(); }
    } catch { showToast('Error al enviar. Usa WhatsApp.', 'error'); }
    btn.textContent = orig;
    btn.disabled = false;
  });
}
