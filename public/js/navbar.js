/* ═══════════════════════════════════════
   MOTORSYNC — navbar.js
   Injects navbar + footer, handles scroll & mobile menu
═══════════════════════════════════════ */

const NAV_HTML = `
<nav class="navbar" id="navbar">
  <a href="/index.html" class="navbar__logo">
    <img src="/images/logo-h.png" alt="MOTORSYNC" />
  </a>
  <ul class="navbar__links" id="navLinks">
    <li><a href="/index.html">Inicio</a></li>
    <li><a href="/pages/planes.html">Planes</a></li>
    <li><a href="/pages/seguridad.html">Seguridad</a></li>
    <li><a href="/pages/autoradios.html">Autoradios</a></li>
    <li><a href="/pages/contacto.html">Contacto</a></li>
    <li>
      <a href="https://api.whatsapp.com/send?phone=51992198342&text=Hola, quiero info sobre MOTORSYNC"
         target="_blank" class="navbar__cta">WhatsApp</a>
    </li>
  </ul>
  <button class="navbar__ham" id="navHam" aria-label="Menú">
    <span></span><span></span><span></span>
  </button>
</nav>`;

const FOOTER_HTML = `
<footer class="footer">
  <div class="footer__inner">
    <div class="footer__top">
      <div class="footer__brand">
        <img src="/images/logo-h.png" alt="MOTORSYNC" />
        <p>Tu vehículo seguro siempre. Protección GPS personal para personas en todo el Perú.</p>
        <div class="footer__socials">
          <a href="https://www.facebook.com/NovotracePeru" target="_blank" class="footer__soc">Fb</a>
          <a href="https://www.instagram.com/novotrace"    target="_blank" class="footer__soc">Ig</a>
        </div>
      </div>
      <div class="footer__col">
        <h4>Planes</h4>
        <ul>
          <li><a href="/pages/planes.html#basico">Plan Básico</a></li>
          <li><a href="/pages/planes.html#premium">Plan Premium</a></li>
          <li><a href="/pages/planes.html#dvr">Plan DVR</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h4>Links</h4>
        <ul>
          <li><a href="/pages/seguridad.html">Seguridad</a></li>
          <li><a href="/pages/autoradios.html">Autoradios</a></li>
          <li><a href="/pages/contacto.html">Contacto</a></li>
          <li><a href="https://apps.apple.com/pe/app/novotrace/id1629335039" target="_blank">App Store</a></li>
          <li><a href="https://play.google.com/store/apps/details?id=com.smartgpsclient.novotrace" target="_blank">Play Store</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bot">
      <p>© 2025 MOTORSYNC. Todos los Derechos Reservados.</p>
      <span>Hecho con ❤️ en Lima, Perú</span>
    </div>
  </div>
</footer>`;

// Inject navbar & footer
document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);

// Scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile menu
const ham      = document.getElementById('navHam');
const navLinks = document.getElementById('navLinks');
ham.addEventListener('click', () => navLinks.classList.toggle('open'));

// Mark active link
const path = window.location.pathname.split('/').pop();
document.querySelectorAll('.navbar__links a').forEach(a => {
  const href = a.getAttribute('href').split('/').pop().split('#')[0];
  if (href === path || (path === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});
