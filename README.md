# 🚗 MOTORSYNC v3.0

Sitio web con Node.js + ChatBot IA (Claude). Enfocado exclusivamente en personas con vehículos particulares.

---

## 📁 ESTRUCTURA COMPLETA

```
motorsync/
│
├── server.js                  ← Servidor Node.js + API del chatbot
├── package.json
├── .env                       ← CREAR ESTE ARCHIVO (ver abajo)
├── .env.example
├── .gitignore
├── README.md
│
└── public/                    ← Todo el frontend (servido estáticamente)
    │
    ├── index.html             ← Página principal (Home)
    │
    ├── pages/                 ← Páginas interiores
    │   ├── planes.html        ← Detalle de los 3 planes
    │   ├── seguridad.html     ← Dispositivos de seguridad GPS
    │   ├── autoradios.html    ← Productos de audio y confort
    │   └── contacto.html      ← Formulario de contacto
    │
    ├── css/                   ← Estilos separados por responsabilidad
    │   ├── main.css           ← Variables, reset, navbar, footer, chat, utilidades
    │   ├── home.css           ← Estilos exclusivos del home (hero, stats, steps...)
    │   └── pages.css          ← Estilos de páginas interiores
    │
    ├── js/                    ← Scripts separados por responsabilidad
    │   ├── navbar.js          ← Inyecta navbar y footer en todas las páginas
    │   ├── chat.js            ← Widget chatbot flotante (todas las páginas)
    │   ├── utils.js           ← Scroll reveal, contador animado, toast
    │   └── home.js            ← Chat inline del hero + formulario de contacto
    │
    └── images/
        ├── logo-h.png             ← Logo horizontal (negro, para navbar/footer)
        ├── logo-v.png             ← Logo apilado (para favicon y app mock)
        ├── icon-car.png           ← Ícono auto (frente)
        ├── icon-shield.png        ← Ícono escudo
        ├── icon-lock.png          ← Ícono candado
        ├── icon-key.png           ← Ícono llave
        ├── icon-speed.png         ← Ícono velocímetro
        ├── icon-brake.png         ← Ícono freno / rueda
        ├── icon-electric.png      ← Ícono eléctrico / rayo
        ├── icon-cars-w.png        ← Ícono 3 autos (blanco)
        ├── icon-crash-w.png       ← Ícono colisión (blanco)
        └── icon-wheel-w.png       ← Ícono rueda (blanco)
```

---

## ⚙️ SETUP

### 1. Crear el archivo `.env`
```
ANTHROPIC_API_KEY=tu_api_key_aqui
PORT=3000
```
Obtén tu key en: https://console.anthropic.com

### 2. Instalar dependencias
```bash
npm install
```

### 3. Arrancar
```bash
npm start      # producción
npm run dev    # desarrollo (auto-restart con nodemon)
```

Abre: **http://localhost:3000**

---

## 🚀 DEPLOY EN RAILWAY (Gratis)

1. Sube a GitHub
2. https://railway.app → New Project → Deploy from GitHub
3. Agrega variable de entorno: `ANTHROPIC_API_KEY`
4. ¡Listo! Se despliega automáticamente

---

## 🤖 CHATBOT IA

El chatbot SYNC está configurado para:
- Responder sobre los 3 planes (Básico, Premium, DVR)
- Explicar el proceso de instalación
- Informar sobre funciones del GPS
- Redirigir preguntas de empresas (MOTORSYNC es solo para personas)
- Para precios: siempre derivar a WhatsApp

El chatbot aparece en **todas las páginas** como widget flotante (abajo a la derecha) y también como panel integrado en el hero del Home.

---

## 📞 MOTORSYNC
- WhatsApp: +51 992 198 342
- Dirección: Villa El Salvador, Lima, Perú
