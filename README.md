# FormVoice
### Fill any paper form by speaking — built for people with visual impairment

---

## DEPLOY IN 5 STEPS (all free, no credit card needed)

---

### STEP 1 — Get your Anthropic API key
1. Open this link: https://console.anthropic.com
2. Create a free account
3. On the left side, click "API Keys"
4. Click "Create Key"
5. Copy the key — you will need it in Step 4

---

### STEP 2 — Put the code on GitHub
1. Open: https://github.com  — create a free account
2. Click the green "New" button (top left)
3. Repository name: formvoice
4. Click "Create repository"
5. On the next screen, click "uploading an existing file"
6. Drag and drop ALL the files from this folder into the page
   (server.js, package.json, render.yaml, .env.example, README.md,
    and the entire "public" folder with index.html inside)
7. Click "Commit changes"

---

### STEP 3 — Deploy on Render
1. Open: https://render.com — create a free account
2. Click "New +"  then  "Web Service"
3. Click "Connect GitHub" and authorize Render
4. Find and select your "formvoice" repository
5. Render reads render.yaml automatically — all settings are filled in
6. Click "Create Web Service"
7. Wait about 2 minutes for the build to finish

---

### STEP 4 — Add your API key to Render
1. In Render, go to your formvoice service
2. Click the "Environment" tab
3. Click "Add Environment Variable"
4. Key:   ANTHROPIC_API_KEY
5. Value: (paste the key you copied in Step 1)
6. Click "Save Changes"
7. Render restarts automatically — wait about 30 seconds

---

### STEP 5 — Open your live app!
1. Render shows your URL at the top — looks like:
   https://formvoice-xxxx.onrender.com
2. Open that URL on your phone or computer in Chrome or Safari
3. Tap "Try the demo — doctor's intake form"
4. A popup will say "Allow microphone?" — tap ALLOW
5. Tap the big orange "TAP TO SPEAK" button
6. Speak your answer — it will appear in the box!

---

## FEATURES
- Take a photo of any form → AI reads all fields automatically
- Answer every question by speaking — no typing
- Questions are read aloud one by one
- ◀ Prev   ⏭ Skip   Next ▶ — jump between questions
- Aa button → change text size (Small / Medium / Large / XL)
- ◑ button → change theme (Night / High contrast / Warm / Daytime)
- Works on iPhone, Android, and any computer
- Completely free to host

## IMPORTANT — Microphone requires HTTPS
The microphone ONLY works when the app is on a real HTTPS address.
Render.com gives you HTTPS automatically — that is why we use it.
Do NOT try to open index.html directly from your computer as a file —
the microphone will not work that way.

## FOR DEVELOPERS — Run locally
  cp .env.example .env
  (edit .env and add your ANTHROPIC_API_KEY)
  npm install
  npm start
  open http://localhost:3000
