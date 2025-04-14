import React from 'react';

const Sidebar = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'tasks', label: 'Tasks', icon: '📋' },
    { id: 'chat', label: 'Team Chat', icon: '💬' },
    { id: 'attendance', label: 'Attendance', icon: '⏰' },
  ];

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">Remote Work</h2>
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-100 transition-colors ${
              activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
