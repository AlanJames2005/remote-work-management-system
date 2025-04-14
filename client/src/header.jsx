import React from 'react';

const Header = () => {
  return (
    <div className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
        Clock In
      </button>
    </div>
  );
};

export default Header;
