import React, { useState, useEffect } from 'react';

const AttendanceSystem = () => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState('00:00:00');
  const [attendanceHistory, setAttendanceHistory] = useState([
    { date: '2023-05-01', clockIn: '09:00 AM', clockOut: '05:30 PM', totalHours: '8:30' },
    { date: '2023-05-02', clockIn: '08:45 AM', clockOut: '05:15 PM', totalHours: '8:30' },
    { date: '2023-05-03', clockIn: '09:15 AM', clockOut: '05:45 PM', totalHours: '8:30' },
  ]);
  
  const [currentDate] = useState(new Date().toLocaleDateString());
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Update elapsed time when clocked in
  useEffect(() => {
    let timer;
    if (isClockedIn && clockInTime) {
      timer = setInterval(() => {
        const now = new Date();
        const clockInDate = new Date(clockInTime);
        const diff = now - clockInDate;
        
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
    setClockOutTime(now);
    setIsClockedIn(false);
    
    // Calculate total hours
    const clockInDate = new Date(clockInTime);
    const diff = now - clockInDate;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const totalHours = `${hours}:${minutes.toString().padStart(2, '0')}`;
    
    // Add to history
    const newEntry = {
      date: currentDate,
      clockIn: clockInDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      clockOut: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      totalHours
    };
    
    setAttendanceHistory([newEntry, ...attendanceHistory]);
    setElapsedTime('00:00:00');
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Attendance System</h2>
      
      {/* Current Status */}
      <div className="mb-8 p-4 border rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-gray-500">Current Date</p>
            <p className="text-xl font-semibold">{currentDate}</p>
          </div>
          <div>
            <p className="text-gray-500">Current Time</p>
            <p className="text-xl font-semibold">{currentTime}</p>
          </div>
          <div>
            <p className="text-gray-500">Status</p>
            <p className={`text-xl font-semibold ${isClockedIn ? 'text-green-600' : 'text-red-600'}`}>
              {isClockedIn ? 'Clocked In' : 'Clocked Out'}
            </p>
          </div>
        </div>
        
        {isClockedIn && (
          <div className="mt-4">
            <p className="text-gray-500">Time Elapsed</p>
            <p className="text-3xl font-bold text-indigo-600">{elapsedTime}</p>
          </div>
        )}
        
        <div className="mt-6 flex justify-center">
          {!isClockedIn ? (
            <button
              onClick={handleClockIn}
              className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Clock In
            </button>
          ) : (
            <button
              onClick={handleClockOut}
              className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Clock Out
            </button>
          )}
        </div>
      </div>
      
      {/* Attendance History */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Attendance History</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clock In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clock Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Hours</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendanceHistory.map((entry, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.clockIn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.clockOut}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.totalHours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSystem; 