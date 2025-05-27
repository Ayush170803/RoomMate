# 🗨️ RoomMate — Real-Time WebSocket Chat App

**RoomMate** is a real-time chat application built with **React.js** and **WebSocket (Node.js)**. It supports real-time messaging with persistent chat history, allowing users to join with a username and exchange messages in a shared chat room.

## 🚀 Features

- 🔌 Real-time communication using WebSockets
- 🧠 Persistent chat history stored on the server
- 🧑‍💻 Join with a username (no login required)
- 💬 Shared public chat room
- 📱 Simple and responsive UI

## 🛠️ Tech Stack

### Frontend
- React.js
- CSS

### Backend
- Node.js
- WebSocket (`ws`)
- In-memory + JSON-based storage for message history 

---
### 1. Clone the Repository

```bash
git clone https://github.com/Ayush170803/RoomMate.git
```

### 2. Backend Setup

```bash
cd Backend
npm install
nodemon src/index.js
```

> Backend will run on `http://localhost:8080`

### 3. Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

> Frontend will run on `http://localhost:5173`

---

## 📈 Future Improvements
- ⏰ Timestamps for each message
- 👥 Support for multiple rooms
- 🔐 Authentication & user sessions
- 👀 Show online/offline status
- 📤 File/media sharing

---

## 🤝 Contributing
- Contributions are welcome!

```
# Fork the repo
# Create your feature branch (git checkout -b feature/YourFeature)
# Commit your changes (git commit -m 'Add YourFeature')
# Push to the branch (git push origin feature/YourFeature)
# Open a Pull Request
```

## 🧑‍💻 Author
- [Ayush Kumar](https://github.com/Ayush170803)
