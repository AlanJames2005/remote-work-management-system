import React, { useState } from 'react';
import Sidebar from './sidebar';
import Header from './header';
import TaskManager from './components/tasks/TaskManager';
import TeamChat from './components/chat/TeamChat';
import AttendanceSystem from './components/attendance/AttendanceSystem';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('tasks');

  const renderContent = () => {
    switch (activeTab) {
      case 'tasks':
        return <TaskManager />;
      case 'chat':
        return <TeamChat />;
      case 'attendance':
        return <AttendanceSystem />;
      default:
        return <TaskManager />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
