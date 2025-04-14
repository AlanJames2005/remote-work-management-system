# Remote Work Management System

A comprehensive web application for managing remote work, including task tracking, time management, team collaboration, and file sharing.

## Features

- **User Authentication**: Secure login and signup functionality
- **Task Management**: Create, assign, and track tasks with priority levels
- **Time Tracking**: Track work hours with start/stop functionality
- **Team Collaboration**: Chat with team members in real-time
- **File Sharing**: Upload and share files with team members
- **Calendar View**: Visualize tasks and deadlines
- **Dashboard**: Overview of tasks, time entries, and team activity
- **Dark Mode**: Toggle between light and dark themes

## Tech Stack

### Frontend
- React.js with Vite
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- Context API for state management
- Axios for API requests
- Socket.io for real-time communication

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Socket.io for real-time communication

## Project Structure

```
remote-work-management-system/
├── client/                 # Frontend React application
│   ├── public/             # Static assets
│   ├── src/                # Source code
│   │   ├── assets/         # Images, fonts, etc.
│   │   ├── components/     # React components
│   │   ├── context/        # React context providers
│   │   ├── shared/         # Shared utilities and types
│   │   ├── App.jsx         # Main application component
│   │   └── main.jsx        # Entry point
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite configuration
│
├── server/                 # Backend Node.js application
│   ├── src/                # Source code
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Express middleware
│   │   └── server.js       # Server entry point
│   ├── package.json        # Backend dependencies
│   └── .env                # Environment variables
│
└── README.md               # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/remote-work-management-system.git
cd remote-work-management-system
```

2. Install frontend dependencies
```
cd client
npm install
```

3. Install backend dependencies
```
cd ../server
npm install
```

4. Create a `.env` file in the server directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/remote-work-management
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=30d
NODE_ENV=development
```

### Running the Application

1. Start the backend server
```
cd server
npm start
```

2. Start the frontend development server
```
cd client
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/) 