import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWork } from '../context/WorkContext';

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);
  const [view, setView] = useState('month'); // 'month' or 'week'
  const { user } = useAuth();
  const { tasks, timeEntries } = useWork();
  const [selectedDate, setSelectedDate] = useState(null);

  // Get days for the current view
  const getDays = (date, viewType) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    if (viewType === 'week') {
      const currentDay = date.getDay(); // 0-6
      const days = [];
      for (let i = 0; i < 7; i++) {
        const day = new Date(date);
        day.setDate(date.getDate() - currentDay + i);
        days.push(day);
      }
      return days;
    } else {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstDayOfMonth = new Date(year, month, 1).getDay();
      
      const days = [];
      // Add empty slots for days before the first day of the month
      for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(null);
      }
      // Add all days of the month
      for (let i = 1; i <= daysInMonth; i++) {
        days.push(new Date(year, month, i));
      }
      return days;
    }
  };

  // Get events for a specific day
  const getEventsForDay = (date) => {
    if (!date) return { tasks: [], timeEntries: [] };

    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    const dayTasks = tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return taskDate >= dayStart && taskDate <= dayEnd;
    });

    const dayTimeEntries = timeEntries.filter(entry => {
      const entryDate = new Date(entry.clockIn);
      return entryDate >= dayStart && entryDate <= dayEnd;
    });

    return { tasks: dayTasks, timeEntries: dayTimeEntries };
  };

  useEffect(() => {
    setCalendarDays(getDays(currentDate, view));
  }, [currentDate, view]);

  const navigate = (direction) => {
    const newDate = new Date(currentDate);
    if (view === 'week') {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const formatDuration = (ms) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const getTotalWorkTime = (entries) => {
    return entries.reduce((acc, entry) => acc + (new Date(entry.clockOut) - new Date(entry.clockIn)), 0);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Calendar</h2>
            <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setView('month')}
                className={`px-3 py-1 text-sm ${
                  view === 'month'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setView('week')}
                className={`px-3 py-1 text-sm ${
                  view === 'week'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                Week
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('prev')}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
            >
              ←
            </button>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              {view === 'week' 
                ? `Week of ${currentDate.toLocaleDateString('default', { month: 'long', day: 'numeric' })}`
                : currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </span>
            <button
              onClick={() => navigate('next')}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 text-center text-sm font-semibold text-gray-600 dark:text-gray-400 border-r last:border-r-0 border-gray-200 dark:border-gray-700">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 divide-x divide-y divide-gray-200 dark:divide-gray-700">
        {calendarDays.map((date, index) => {
          if (!date) {
            return (
              <div
                key={index}
                className="min-h-[120px] p-2 bg-gray-50 dark:bg-gray-900"
              />
            );
          }

          const { tasks: dayTasks, timeEntries: dayTimeEntries } = getEventsForDay(date);
          const isToday = date.toDateString() === new Date().toDateString();
          const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
          const totalWorkTime = getTotalWorkTime(dayTimeEntries);
          
          return (
            <div
              key={index}
              onClick={() => setSelectedDate(date)}
              className={`min-h-[120px] p-2 cursor-pointer transition-colors ${
                isSelected ? 'bg-indigo-50 dark:bg-indigo-900/20' : 
                isToday ? 'bg-blue-50 dark:bg-blue-900/20' : 
                'hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
            >
              <div className={`flex items-center justify-between mb-2 ${
                isToday ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-gray-600 dark:text-gray-400'
              }`}>
                <span className="text-sm">{date.getDate()}</span>
                {totalWorkTime > 0 && (
                  <span className="text-xs bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 px-1.5 py-0.5 rounded">
                    {formatDuration(totalWorkTime)}
                  </span>
                )}
              </div>
              <div className="space-y-1 max-h-[80px] overflow-y-auto">
                {dayTasks.map(task => (
                  <div
                    key={task.id}
                    className={`text-xs p-1 rounded truncate ${
                      task.status === 'completed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                    }`}
                    title={task.title}
                  >
                    {task.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {selectedDate && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {selectedDate.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric' })}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Tasks</h4>
              <div className="space-y-2">
                {getEventsForDay(selectedDate).tasks.map(task => (
                  <div
                    key={task.id}
                    className="p-2 rounded bg-white dark:bg-gray-700 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 dark:text-white">{task.title}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        task.status === 'completed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                    {task.description && (
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{task.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Time Entries</h4>
              <div className="space-y-2">
                {getEventsForDay(selectedDate).timeEntries.map(entry => (
                  <div
                    key={entry.id}
                    className="p-2 rounded bg-white dark:bg-gray-700 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {new Date(entry.clockIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {' - '}
                        {new Date(entry.clockOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="text-sm text-indigo-600 dark:text-indigo-400">
                        {formatDuration(new Date(entry.clockOut) - new Date(entry.clockIn))}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView; 