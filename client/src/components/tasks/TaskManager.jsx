import React, { useState } from 'react';

const TaskManager = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete project proposal', status: 'pending', dueDate: '2023-05-15' },
    { id: 2, title: 'Review team reports', status: 'completed', dueDate: '2023-05-10' },
    { id: 3, title: 'Schedule team meeting', status: 'pending', dueDate: '2023-05-20' },
  ]);
  
  const [newTask, setNewTask] = useState({ title: '', dueDate: '', status: 'pending' });
  const [filter, setFilter] = useState('all');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title) return;
    
    const task = {
      id: Date.now(),
      ...newTask
    };
    
    setTasks([...tasks, task]);
    setNewTask({ title: '', dueDate: '', status: 'pending' });
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleStatusChange = (id) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, status: task.status === 'pending' ? 'completed' : 'pending' } 
        : task
    ));
  };

  const filteredTasks = filter === 'all' 
    ? tasks 
    : tasks.filter(task => task.status === filter);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Task Manager</h2>
      
      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Task title"
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <input
            type="date"
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add Task
          </button>
        </div>
      </form>
      
      {/* Filter Controls */}
      <div className="mb-4 flex space-x-2">
        <button
          className={`px-3 py-1 rounded-md ${filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`px-3 py-1 rounded-md ${filter === 'pending' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button
          className={`px-3 py-1 rounded-md ${filter === 'completed' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>
      
      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No tasks found</p>
        ) : (
          filteredTasks.map(task => (
            <div 
              key={task.id} 
              className="flex items-center justify-between p-4 border rounded-md hover:bg-gray-50"
            >
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={task.status === 'completed'}
                  onChange={() => handleStatusChange(task.id)}
                  className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <div>
                  <h3 className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                    {task.title}
                  </h3>
                  {task.dueDate && (
                    <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskManager; 