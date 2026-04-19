require('dotenv').config();
const express   = require('express');
const path      = require('path');
const rateLimit = require('express-rate-limit');
const Anthropic  = require('@anthropic-ai/sdk');

const app  = express();
const PORT = process.env.PORT || 3000;
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

/* ── CHAT ── */
const chatLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 60 });

const SYSTEM_PROMPT = `Eres SYNC, el asistente virtual IA de MOTORSYNC — empresa peruana especializada en rastreo GPS y seguridad satelital SOLO para vehículos personales (no atendemos empresas).

Responde siempre en español, de forma amigable, concisa y profesional. Máximo 3 párrafos por respuesta.

SOBRE MOTORSYNC:
- Servicio exclusivo para personas con vehículos particulares
- WhatsApp: +51 992 198 342
- Dirección: Av. Cesar Vallejo Sector 2, Grupo 5, Mz. H Lt. 11, Villa El Salvador, Lima, Perú
- App disponible en App Store y Play Store

PLANES:
1. Plan Básico: GPS tiempo real, app móvil iOS/Android, historial 7 días, alertas de velocidad, soporte WhatsApp
2. Plan Premium (más popular): Todo lo del Básico + bloqueo remoto del motor, alertas colisión/impacto, historial 30 días, geocercas ilimitadas, botón de pánico, soporte 24/7
3. Plan DVR: Todo lo del Premium + cámaras HD frontal y trasera, grabación 24/7, almacenamiento en nube, evidencia video

INSTALACIÓN: técnico va al domicilio del cliente en Lima, dura menos de 1 hora, incluye garantía.

Para precios: siempre indicar que deben contactar por WhatsApp para cotización personalizada según vehículo y zona.

Si preguntan por planes para empresas o flotas: explicar amablemente que MOTORSYNC está dedicado exclusivamente a personas con vehículos particulares.`;

app.post('/api/chat', chatLimiter, async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) return res.status(400).json({ error: 'Formato inválido.' });

    const response = await anthropic.messages.create({
      model:      'claude-sonnet-4-20250514',
      max_tokens: 800,
      system:     SYSTEM_PROMPT,
      messages:   messages.slice(-12),
    });

    res.json({ message: response.content[0].text });
  } catch (err) {
    console.error('Chat error:', err.message);
    res.status(500).json({ error: 'Error del servidor.' });
  }
});

/* ── CONTACT FORM ── */
app.post('/api/contacto', (req, res) => {
  const { nombre, tel, email, plan, vehiculo, mensaje } = req.body;
  console.log('[CONTACTO]', { nombre, tel, email, plan, vehiculo, mensaje, fecha: new Date().toISOString() });
  res.json({ success: true });
});

/* ── SPA fallback ── */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚗 MOTORSYNC → http://localhost:${PORT}`);
});
