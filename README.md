# Remote Work Management System

A comprehensive web application for managing remote work, including task management, time tracking, team collaboration, and more.

## Features

- **Task Management**: Create, update, and track tasks with AI-powered suggestions
- **Time Tracking**: Clock in/out and track work hours
- **Team Collaboration**: Chat with team members and share files
- **Calendar View**: Schedule and view events
- **Dashboard**: View key metrics and statistics
- **Teams Management**: Create and manage teams
- **Dark/Light Mode**: Toggle between dark and light themes
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **State Management**: React Context API
- **Routing**: React Router
- **UI Components**: Custom components with Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Chart.js, React-Chartjs-2
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/remote-work-management-system.git
cd remote-work-management-system
```

2. Install dependencies
```bash
cd client
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

## Project Structure

```
client/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # React components
│   │   ├── auth/        # Authentication components
│   │   ├── attendance/  # Attendance tracking components
│   │   ├── chat/        # Chat components
│   │   └── tasks/       # Task management components
│   ├── context/         # React context providers
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Project dependencies
├── tailwind.config.js   # Tailwind CSS configuration
└── vite.config.js       # Vite configuration
```

## Usage

1. **Authentication**: Sign up or log in to access the application
2. **Task Management**: Create, update, and track tasks
3. **Time Tracking**: Clock in/out to track work hours
4. **Team Collaboration**: Chat with team members and share files
5. **Calendar**: Schedule and view events
6. **Dashboard**: View key metrics and statistics
7. **Teams**: Create and manage teams

## License

This project is licensed under the ISC License.

## Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Chart.js](https://www.chartjs.org/)
- [Lucide React](https://lucide.dev/) 