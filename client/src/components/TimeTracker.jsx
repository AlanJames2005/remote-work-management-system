import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWork } from '../context/WorkContext';
import { Play, Pause, Trash2, Clock, Calendar, AlertTriangle } from 'lucide-react';

const TimeTracker = () => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState('00:00:00');
  const [timeEntries, setTimeEntries] = useState(() => {
    const savedEntries = localStorage.getItem('timeEntries');
    return savedEntries ? JSON.parse(savedEntries) : [];
  });
  const { user } = useAuth();
  const { trackedTime, startTracking, stopTracking, deleteTimeEntry } = useWork();

  useEffect(() => {
    localStorage.setItem('timeEntries', JSON.stringify(timeEntries));
  }, [timeEntries]);

  useEffect(() => {
    let timer;
    if (isClockedIn && clockInTime) {
      timer = setInterval(() => {
        const now = new Date();
        const diff = now - new Date(clockInTime);
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setElapsedTime(
          `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isClockedIn, clockInTime]);

  const handleClockIn = () => {
    const now = new Date();
    setClockInTime(now);
    setIsClockedIn(true);
  };

  const handleClockOut = () => {
    const now = new Date();
    const entry = {
      id: Date.now(),
      userId: user?.email || 'anonymous',
      clockIn: clockInTime,
      clockOut: now,
      duration: now - new Date(clockInTime),
      date: now.toISOString().split('T')[0]
    };
    setTimeEntries([entry, ...timeEntries]);
    setIsClockedIn(false);
    setClockInTime(null);
    setElapsedTime('00:00:00');
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDuration = (ms) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this time entry?')) {
      setTimeEntries(timeEntries.filter(entry => entry.id !== id));
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Time Tracker</h2>
      
      <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
            <p className={`text-lg font-semibold ${isClockedIn ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {isClockedIn ? 'Clocked In' : 'Clocked Out'}
            </p>
          </div>
          {isClockedIn && (
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Time Elapsed</p>
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{elapsedTime}</p>
            </div>
          )}
        </div>
        
        <button
          onClick={isClockedIn ? handleClockOut : handleClockIn}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            isClockedIn
              ? 'bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600'
              : 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600'
          }`}
        >
          {isClockedIn ? 'Clock Out' : 'Clock In'}
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Time Entries</h3>
        <div className="space-y-4">
          {timeEntries.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">No time entries found</p>
          ) : (
            timeEntries.map(entry => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-4 border rounded-md dark:border-gray-700"
              >
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{entry.date}</p>
                  <p className="text-gray-900 dark:text-white">
                    {formatTime(entry.clockIn)} - {formatTime(entry.clockOut)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Duration: {formatDuration(entry.duration)}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {entry.userId}
                  </p>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="p-2 text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-400"
                    title="Delete time entry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeTracker; 