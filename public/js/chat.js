/* ═══════════════════════════════════════
   MOTORSYNC — chat.js
   Floating AI chatbot widget (all pages)
═══════════════════════════════════════ */

const CHAT_HTML = `
<div class="chatbot" id="chatbot">
  <div class="chatbot__window" id="chatWindow">
    <div class="chatbot__header">
      <div class="chatbot__av">🤖</div>
      <div class="chatbot__info">
        <strong>SYNC — Asistente IA</strong>
        <span>MOTORSYNC · Respuesta instantánea</span>
      </div>
      <div class="chatbot__online">En línea</div>
      <button class="chatbot__close" id="chatClose">✕</button>
    </div>
    <div class="chatbot__messages" id="chatMessages"></div>
    <div class="chatbot__chips" id="chatChips">
      <button class="chatbot__chip" data-msg="¿Cuáles son los planes?">Ver planes</button>
      <button class="chatbot__chip" data-msg="¿Cómo funciona el GPS?">¿Cómo funciona?</button>
      <button class="chatbot__chip" data-msg="¿Tienen app móvil?">App móvil</button>
      <button class="chatbot__chip" data-msg="¿Cuánto cuesta instalar?">Precios</button>
    </div>
    <div class="chatbot__footer">
      <input type="text" class="chatbot__input" id="chatInput" placeholder="Escribe tu pregunta..." />
      <button class="chatbot__send" id="chatSend">➤</button>
    </div>
  </div>
  <button class="chatbot__toggle" id="chatToggle">
    💬
    <span class="chatbot__badge" id="chatBadge">1</span>
  </button>
</div>`;

document.body.insertAdjacentHTML('beforeend', CHAT_HTML);

/* ── STATE ── */
let chatOpen    = false;
let chatBusy    = false;
let chatHistory = [];
let greeted     = false;

const chatWindow   = document.getElementById('chatWindow');
const chatMessages = document.getElementById('chatMessages');
const chatInput    = document.getElementById('chatInput');
const chatSend     = document.getElementById('chatSend');
const chatToggle   = document.getElementById('chatToggle');
const chatClose    = document.getElementById('chatClose');
const chatBadge    = document.getElementById('chatBadge');
const chatChips    = document.getElementById('chatChips');

/* ── HELPERS ── */
function scrollBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addMessage(role, text) {
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
  chatMessages.appendChild(div);
  scrollBottom();
}

function showTyping() {
  const d = document.createElement('div');
  d.className = 'chat-msg chat-msg--bot'; d.id = 'typingIndicator';
  d.innerHTML = `<div class="chat-msg__row"><div class="chat-msg__av">🤖</div><div class="chat-typing"><span></span><span></span><span></span></div></div>`;
  chatMessages.appendChild(d); scrollBottom();
}
function removeTyping() { document.getElementById('typingIndicator')?.remove(); }

/* ── OPEN / CLOSE ── */
function openChat() {
  chatOpen = true;
  chatWindow.classList.add('open');
  chatToggle.textContent = '✕';
  chatBadge.style.display = 'none';
  if (!greeted) {
    greeted = true;
    setTimeout(() => addMessage('bot',
      '¡Hola! Soy **SYNC**, el asistente IA de MOTORSYNC 🚗\n\n' +
      '¿En qué te ayudo? Puedo explicarte nuestros planes de rastreo GPS, cómo funciona la instalación o cómo proteger tu vehículo.'
    ), 400);
  }
  setTimeout(() => chatInput.focus(), 300);
}
function closeChat() {
  chatOpen = false;
  chatWindow.classList.remove('open');
  chatToggle.innerHTML = '💬 <span class="chatbot__badge" id="chatBadge" style="display:none">1</span>';
}

chatToggle.addEventListener('click', () => chatOpen ? closeChat() : openChat());
chatClose.addEventListener('click', closeChat);

/* ── QUICK CHIPS ── */
chatChips.querySelectorAll('.chatbot__chip').forEach(btn => {
  btn.addEventListener('click', () => {
    const msg = btn.dataset.msg;
    chatChips.remove();
    chatInput.value = msg;
    sendMessage();
  });
});

/* ── SEND ── */
async function sendMessage() {
  if (chatBusy) return;
  const text = chatInput.value.trim();
  if (!text) return;

  chatInput.value = '';
  chatSend.disabled = true;
  chatBusy = true;

  addMessage('user', text);
  chatHistory.push({ role: 'user', content: text });
  showTyping();

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: chatHistory.slice(-12) })
    });
    const data = await res.json();
    removeTyping();
    const reply = data.message || 'Lo siento, hubo un error. Escríbenos al WhatsApp: +51 992 198 342 📱';
    addMessage('bot', reply);
    chatHistory.push({ role: 'assistant', content: reply });
  } catch {
    removeTyping();
    addMessage('bot', 'Error de conexión. Contáctanos por WhatsApp: **+51 992 198 342** 📱');
  }

  chatBusy = false;
  chatSend.disabled = false;
}

chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
});

// Show badge after 3s
setTimeout(() => { if (!chatOpen) chatBadge.style.display = 'flex'; }, 3000);
