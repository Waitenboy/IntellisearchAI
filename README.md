# Intellisearch : AI-Powered Tutor 📚🤖

An AI-driven learning platform that generates topic summaries, quizzes, study roadmaps, and tracks user progress with an interactive dashboard.

## Features 🚀

- **AI Summarization**: Enter a topic and get a concise AI-generated summary.
- **Speech-to-Text Support**: Use voice input for accessibility.
- **Multilingual Translation**: Translate summaries into different languages.
- **Quiz Feature**: Test your knowledge with AI-generated quizzes.
- **Study Roadmap**: Generate a structured study plan based on the chosen duration.
- **Resource Aggregation**: Get the top 5 Google and YouTube results for deeper learning.
- **User Dashboard**: Track searches, quizzes, and progress.
- **Gamification**: Earn badges based on activity to stay motivated.
- **PDF Export**: Save topic summaries as PDFs for offline learning.

---

## Installation & Setup ⚙️

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- npm (comes with Node.js)

### Step 1: Clone the Repository

```bash
git clone https://github.com/Waitenboy/IntellisearchAI.git
cd IntellisearchAI
```

### Step 2: Install Dependencies

Navigate to the backend folder and install dependencies: ("npm install" might take 1-2 minutes)

```bash
cd backend
npm install
```

Then, do the same for the frontend: ("npm install" might take 1-2 minutes)

```bash
cd ../frontend
npm install
```

### Step 3: Run the Application

You'll need two terminals to start both the backend and frontend.

#### Start Backend Server (Terminal 1)

```bash
cd backend
node server.js
```
#### Wait till terminal shows: 

```bash
Server running on port 5000
MongoDB Connected
```

This starts the backend on `http://localhost:5000` (or as specified in `server.js`).

#### Start Frontend (Terminal 2)

```bash
cd frontend
npm start
```

This automatically launches the website at `http://localhost:3000`. 
(it might take 1-2 minutes to load in the browser)

---

## Usage 🖥️

#### Signup with your preferred username and password (or use the following to login):

```bash
Email: rohit@gmail.com
Password: rohit
```

- **Search a Topic** – Get an AI-generated summary and top search results.
- **Use Speech-to-Text** – Speak instead of typing for easy input.
- **Translate Content** – Convert the summary into different languages.
- **Generate a Quiz** – Test your understanding with an AI-generated quiz.
- **Create a study plan** – Create a study roadmap based on a selected duration.
- **Save as PDF** – Download the summary for offline access.
- **Track Progress** – Log in to view your activity dashboard and earn badges.

---

## Project Structure 🏷️

```
/IntellisearchAI
│── backend/       # Node.js Express backend
│   ├── models/    # Database models
│   ├── routes/    # API routes
│   ├── server.js  # Backend entry point
│── frontend/      # React.js frontend
│   ├── src/       # React components & logic
│   ├── public/    # Static assets
│   ├── App.js     # Main app component
│── README.md      # Documentation
```

---

## Technologies Used 🛠️

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **AI**: Gemini, Custom search by Google, Youtube Data API v3

---

## Contributing 🤝

1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Make changes and commit: `git commit -m "Add feature"`
4. Push to your branch: `git push origin feature-name`
5. Open a Pull Request

---

## Contact & Support 📩

For issues or feature requests, please open an issue in the GitHub repository.

**Happy Learning!** 🎓🚀
