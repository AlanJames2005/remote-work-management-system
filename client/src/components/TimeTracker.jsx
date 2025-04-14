import React, { useState, useEffect } from 'react';
import { Clock, Play, Square, Trash2 } from 'lucide-react';
import { useWork } from '../context/WorkContext';

const TimeTracker = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const { timeEntries, addTimeEntry, updateTimeEntry, deleteTimeEntry } = useWork();

  useEffect(() => {
    let interval;
    if (isTracking) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  const startTracking = () => {
    // Check for overlapping entries
    const hasActiveEntry = timeEntries.some(entry => 
      entry.status === 'active' && 
      new Date(entry.clockIn).toDateString() === new Date().toDateString()
    );

    if (hasActiveEntry) {
      alert('You already have an active time entry for today');
      return;
    }

    const newEntry = {
      id: Date.now().toString(),
      clockIn: new Date(),
      notes: 'Started work session',
      status: 'active'
    };
    addTimeEntry(newEntry);
    setIsTracking(true);
    setElapsedTime(0);
  };

  const stopTracking = () => {
    const activeEntry = timeEntries.find(entry => entry.status === 'active');
    if (!activeEntry) {
      alert('No active time entry found');
      return;
    }

    const updatedEntry = {
      ...activeEntry,
      clockOut: new Date(),
      status: 'completed',
      duration: Math.floor((new Date() - new Date(activeEntry.clockIn)) / 1000)
    };
    updateTimeEntry(activeEntry.id, updatedEntry);
    setIsTracking(false);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Time Tracker
          </h2>
          <div className="text-3xl font-mono text-gray-800 dark:text-white">
            {formatTime(elapsedTime)}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={isTracking ? stopTracking : startTracking}
            className={`flex items-center px-6 py-3 rounded-lg text-white font-semibold ${
              isTracking 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isTracking ? (
              <>
                <Square className="mr-2" size={20} />
                Stop Tracking
              </>
            ) : (
              <>
                <Play className="mr-2" size={20} />
                Start Tracking
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Recent Time Entries
        </h3>
        {timeEntries.length > 0 ? (
          <div className="space-y-4">
            {timeEntries.map((entry) => (
              <div 
                key={entry.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {formatDate(entry.clockIn)}
                    </p>
                    {entry.clockOut && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Duration: {formatTime(entry.duration)}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => deleteTimeEntry(entry.id)}
                  className="p-2 text-red-500 hover:text-red-600"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center">
            No time entries yet
          </p>
        )}
      </div>
    </div>
  );
};

export default TimeTracker; 