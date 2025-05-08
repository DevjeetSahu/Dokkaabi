
# 🧠 Voice Chatbot & Recruitment Dashboard

A modern full-stack web application built with **React + TypeScript + Vite**, designed for HR and recruitment teams. This project features real-time voice-enabled chatbot communication and interactive analytics visualizations.

---

## 🌐 Pages Overview

### 🔐 Login Page
- Basic authentication UI (placeholder).
- Designed as an entry point before navigating to internal pages.

### 💼 Jobs Page
- Displays job listings and their basic metadata.
- Includes filtering/sorting capabilities (can be extended).
- Responsive layout using Tailwind CSS.

### 👥 Candidates Page
- Lists applicants, their status in the funnel, and details.
- Clean grid layout for responsive design.
- Optionally integrates with stages like Screening, Interview, Offer, etc.

### 📊 Insights Page
- Displays three charts using **Recharts**:
  - 📈 Line Chart: `Applicants Over Time`
  - 📊 Bar Chart: `Conversion by Stage`
  - 🥧 Pie Chart: `Popular Roles`
- Fully responsive and styled using Tailwind with animated cards.

### 💬 Chatbot Page
- AI-powered chatbot with:
  - 🧏 Speech-to-Text via microphone
  - 🗣️ Text-to-Speech audio playback
  - Real-time input from WebSocket
- Chat UI handles both user and bot messages with nice visual separation.

---

## 🔌 WebSocket & API Integration

- WebSocket:  
  Connects to `ws://localhost:2900/ws/stt/1` to stream voice data and receive real-time transcriptions.

- REST APIs:
  - `POST http://localhost:2900/api/tts` – Sends text, receives audio URL.
  - (Optional) `POST /api/stt/prerecorded/1` – STT for uploaded audio files.

---

## ⚙️ Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-project-name.git
cd your-project-name
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the Vite dev server

```bash
npm run dev
```

This will launch the app at [http://localhost:5173](http://localhost:5173).

---

## 📁 Project Structure (Simplified)

```
src/
├── pages/
│   ├── Login.tsx
│   ├── Jobs.tsx
│   ├── Candidates.tsx
│   ├── Insights.tsx
│   └── Chatbot.tsx
├── components/
│   └── (Shared components if any)
├── assets/
├── App.tsx
└── main.tsx
```

---

## ✅ Features

- 🎤 Live mic input for STT
- 📢 Bot replies with audio using TTS
- 📈 Analytics with Recharts
- 💨 Smooth transitions with Framer Motion
- 🖼️ Fully responsive layout
- ⚡ Vite + TypeScript fast refresh

---

## 🔐 Environment Variables (optional)

If needed, create a `.env` file:

```env
VITE_API_BASE=http://localhost:2900
```

Use in code as `import.meta.env.VITE_API_BASE`
To run the backend locally refer:
[backend link](https://github.com/As-redfly/assignment.git)

---

## 🪪 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Built by Devjeet Sahu. Contributions and feedback are welcome!
