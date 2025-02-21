# 🌙 Mental Health Tracker - Luna Joy

✨ _Track, visualize, and understand your mental health journey._ ✨

---

## Objective

The **Mental Health Tracker** is a full-stack web application designed to help users monitor their daily mental health and visualize trends over time. With a user-centric design and an intuitive interface, the application makes it easy to log emotional and physical well-being metrics, promoting self-reflection and awareness of mental health patterns.
The frontend is built using **React**, combined with modern frameworks and libraries to deliver a responsive and visually appealing experience. On the backend, **Node.js** powers the application, ensuring fast and reliable data processing, while a lightweight file-based database provides efficient data storage and retrieval. This seamless integration of technologies ensures a smooth and engaging user experience, empowering individuals to track their mental health journey with ease.

🚀 **Frontend:** Built with **React** and modern frameworks for a responsive experience.  
💾 **Backend:** Powered by **Node.js** and a lightweight file-based database for efficient data storage and retrieval.

---

## Features

### User Authentication

- **Google Sign-In Integration:** Users can securely log in using their Google accounts for seamless authentication.

### Daily Log Form

Users can submit their daily mental health status through a comprehensive form that captures:

- **Mood Rating:** Self-reported mood on a scale from very sad to very happy.
- **Anxiety Levels:** Self-assessed anxiety levels.
- **Sleep Patterns:** Hours of sleep, quality, and any disturbances.
- **Physical Activity:** Type and duration of physical activities.
- **Social Interactions:** Frequency of social engagements.
- **Stress Levels:** Self-reported stress levels.
- **Symptoms of Depression or Anxiety:** Presence and severity of specific symptoms.

### Data Visualization

- **Last 7 days track:** An interactive and clean chart display the user's trends based on a score calculated from their inputs.
- **Real-Time Updates:** Utilizes WebSocket from fastify to update visualizations as new data is entered and every 5 seconds.

### Interactive UI/UX Design

- Enhanced user interface with modals, tooltips, and notifications for a smooth and guided experience.

---

## Technologies Used

### **Frontend (React + Vite)**

- **Vite React CLI:** Fast and modern development environment for building React applications.
- **Shadcn Components:** Elegant and customizable UI components.
- **Tailwind CSS:** Utility-first CSS framework for responsive and maintainable styling.
- **Zod:** Schema validation for form inputs and data structures.
- **Date-fns:** Modern date utility library for formatting and manipulating dates.
- **Lucide Icons:** Crisp and versatile icon library.
- **Recharts:** Powerful charting library for interactive data visualizations.

### **Backend (Node.js + Fastify)**

- **Fastify:** High-performance web framework designed for speed and low overhead.
- **Better-SQLite3:** Lightweight and efficient SQLite database integration.
- **Drizzle ORM:** Type-safe and modern ORM for interacting with the database.
- **Zod:** Used for validating API requests and ensuring data integrity.

---

## Installation

1. **Clone the Repository**

```bash
git clone https://github.com/cmprc/lunajoy.git
cd lunajoy
```

2. **Frontend Setup**

```bash
cd web
npm install
npm run dev
```

3. **Backend Setup**

```bash
cd server
npm install
npm run dev
```

---

## Configuration

- Environment variables such as API keys and database connections are defined in `.env` files for both the frontend and backend.
- Ensure proper configuration of Google OAuth credentials for authentication.

Example `.env` for backend:
```env
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
DATABASE_URL=sqlite://data/mental-health.db
```

---

## Usage

1. Sign in with your Google account.
2. Submit your daily mental health logs using the form, accessed via the Add button.
3. View real-time charts and totalizers that display your mental health trends from the past week.

---

## Troubleshooting

- **Authentication Issues:** Verify that Google OAuth credentials are correctly configured in the `.env` file.
- **Database Errors:** Ensure that the SQLite database file is accessible and not corrupted.
- **WebSocket Issues:** Confirm that the WebSocket server is running and properly connected.

---

## License

This project is licensed under the [MIT License](LICENSE).
