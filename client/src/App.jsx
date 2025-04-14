import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useTheme } from './context/ThemeContext';
import { motion } from 'framer-motion';
import { Sun, Moon, LogOut, Menu } from 'lucide-react';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import TaskManager from './components/TaskManager';
import TeamChat from './components/TeamChat';
import TimeTracker from './components/TimeTracker';
import CalendarView from './components/CalendarView';
import Logo from './components/Logo';
import Dashboard from './components/Dashboard';
import FileSharing from './components/FileSharing';
import Teams from './components/Teams';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

const Layout = ({ children }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col">
        <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
                >
                  <Menu className="h-6 w-6" />
                </button>
                <div className="flex-shrink-0 flex items-center">
                  <Logo size="small" layout="horizontal" />
                </div>
              </div>
              
              <div className="hidden md:flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </motion.button>
                {user && (
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-700 dark:text-gray-300">{user.email}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={logout}
                      className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button
                  onClick={toggleDarkMode}
                  className="w-full flex items-center px-3 py-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {isDarkMode ? <Sun className="h-5 w-5 mr-2" /> : <Moon className="h-5 w-5 mr-2" />}
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
                {user && (
                  <button
                    onClick={logout}
                    className="w-full flex items-center px-3 py-2 rounded-md text-white bg-red-600 hover:bg-red-700"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                )}
              </div>
            </div>
          )}
        </nav>

        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout>
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 gap-6">
                    <TaskManager />
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Calendar</h2>
                    <CalendarView />
                  </div>
                  <Dashboard />
                  <Teams />
                  <FileSharing />
                  <div className="h-[150px]">
                    <TeamChat />
                  </div>
                </div>
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

