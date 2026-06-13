require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');

const app = express();
app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.static(path.join(__dirname, 'public')));

/* ── health check ── */
app.get('/health', (_req, res) => res.json({ ok: true }));

/* ── analyze form image ── */
app.post('/api/analyze', async (req, res) => {
  const { imageBase64, mediaType } = req.body;

  if (!imageBase64)            return res.status(400).json({ error: 'No image provided' });
  if (!process.env.ANTHROPIC_API_KEY)
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not set on server' });

  const systemPrompt = `You extract form fields from photos of forms.
Return ONLY valid JSON — no markdown, no explanation, nothing else.
Schema: {"formTitle":"visible title or empty string","fields":[{"label":"field label","type":"text","required":true,"placeholder":"example answer","options":[]}]}
Allowed types: text email phone date number textarea select radio checkbox
For select/radio/checkbox list all visible choices in options array.
Extract EVERY input field visible. If none found return {"formTitle":"","fields":[]}.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',
        max_tokens: 2000,
        system: systemPrompt,
        messages: [{
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: mediaType || 'image/jpeg', data: imageBase64 } },
            { type: 'text',  text: 'Extract all form fields as JSON.' }
          ]
        }]
      })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('Anthropic error:', data);
      return res.status(502).json({ error: data?.error?.message || 'Anthropic API error' });
    }

    const raw   = (data.content || []).map(c => c.text || '').join('').replace(/```json|```/g, '').trim();
    let parsed  = { formTitle: '', fields: [] };
    try { parsed = JSON.parse(raw); } catch { /* keep default */ }

    res.json(parsed);
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

/* ── serve frontend for all other routes ── */
app.get('*', (_req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('FormVoice running on port', PORT));
