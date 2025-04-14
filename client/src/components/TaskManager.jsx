import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWork } from '../context/WorkContext';
import AISuggestions from './AISuggestions';
import { Plus, Calendar, ClipboardList, Search, Filter, Trash2, AlertTriangle, Clock, ArrowUpDown, LayoutDashboard, ListFilter, CheckCircle2, Circle, Timer, BarChart2, Settings, Brain } from 'lucide-react';
import TimeTracker from './TimeTracker';

const TaskManager = () => {
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '', priority: 'medium', category: 'work' });
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const [activeCategory, setActiveCategory] = useState('all');
  const { user } = useAuth();
  const { tasks, addTask, updateTask, deleteTask } = useWork();

  const categories = [
    { id: 'all', label: 'All Tasks', icon: ListFilter },
    { id: 'work', label: 'Work', icon: Timer },
    { id: 'personal', label: 'Personal', icon: Circle },
    { id: 'completed', label: 'Completed', icon: CheckCircle2 },
  ];

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.title.trim()) {
      const task = {
        id: Date.now(),
        ...newTask,
        status: 'pending',
        createdAt: new Date().toISOString(),
        createdBy: user?.email || 'anonymous'
      };
      addTask(task);
      setNewTask({ title: '', description: '', dueDate: '', priority: 'medium', category: 'work' });
    }
  };

  const handleStatusChange = (taskId, newStatus) => {
    updateTask(taskId, { status: newStatus });
  };

  const handlePriorityChange = (taskId, newPriority) => {
    updateTask(taskId, { priority: newPriority });
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId);
    }
  };

  const sortTasks = (tasksToSort) => {
    return [...tasksToSort].sort((a, b) => {
      const priorityValues = { high: 3, medium: 2, low: 1 };
      
      switch (sortBy) {
        case 'dueDate':
          const dateA = new Date(a.dueDate);
          const dateB = new Date(b.dueDate);
          return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        case 'priority':
          return sortOrder === 'asc' 
            ? priorityValues[a.priority] - priorityValues[b.priority]
            : priorityValues[b.priority] - priorityValues[a.priority];
        case 'status':
          const statusOrder = { pending: 1, 'in-progress': 2, completed: 3 };
          return sortOrder === 'asc'
            ? statusOrder[a.status] - statusOrder[b.status]
            : statusOrder[b.status] - statusOrder[a.status];
        default:
          return 0;
      }
    });
  };

  const filteredTasks = useMemo(() => {
    const filtered = tasks.filter(task => {
      const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || 
                            (activeCategory === 'completed' ? task.status === 'completed' : task.category === activeCategory);
      return matchesStatus && matchesSearch && matchesCategory;
    });
    return sortTasks(filtered);
  }, [tasks, filterStatus, searchQuery, sortBy, sortOrder, activeCategory]);

  const taskStats = useMemo(() => {
    return {
      total: tasks.length,
      pending: tasks.filter(t => t.status === 'pending').length,
      inProgress: tasks.filter(t => t.status === 'in-progress').length,
      completed: tasks.filter(t => t.status === 'completed').length,
    };
  }, [tasks]);

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navigation Bar */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <LayoutDashboard className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Task Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{taskStats.total}</p>
              </div>
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                <ClipboardList className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:border-yellow-500 dark:hover:border-yellow-400 transition-colors duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">{taskStats.pending}</p>
              </div>
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">In Progress</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{taskStats.inProgress}</p>
              </div>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Timer className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-400 transition-colors duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">{taskStats.completed}</p>
              </div>
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6">
          <div className="p-4">
            <nav className="flex space-x-4 overflow-x-auto" aria-label="Task categories">
              {categories.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveCategory(id)}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                    activeCategory === id
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          {/* Left Column - Task Creation and Filters */}
          <div className="lg:col-span-4 space-y-6">
            {/* Task Creation Form */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <Plus className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                  Create New Task
                </h3>
              </div>
              <form onSubmit={handleAddTask} className="p-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                    <input
                      type="text"
                      placeholder="Enter task title"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                    <textarea
                      placeholder="Enter task description"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white min-h-[100px] resize-none"
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date</label>
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-2" />
                      <input
                        type="date"
                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
                    <div className="flex items-center">
                      <AlertTriangle className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-2" />
                      <select
                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={newTask.priority}
                        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                      >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                    <div className="flex items-center">
                      <ListFilter className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-2" />
                      <select
                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={newTask.category}
                        onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                      >
                        <option value="work">Work</option>
                        <option value="personal">Personal</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center justify-center transition-colors duration-200"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Task
                  </button>
                </div>
              </form>
            </div>

            {/* Filters Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <Filter className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                  Filters & Sort
                </h3>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Search</label>
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search tasks..."
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="all">All Tasks</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sort By</label>
                  <div className="flex items-center space-x-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="dueDate">Due Date</option>
                      <option value="priority">Priority</option>
                      <option value="status">Status</option>
                    </select>
                    <button
                      onClick={toggleSortOrder}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 border dark:border-gray-600"
                      title={`Sort ${sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
                    >
                      <ArrowUpDown className={`w-5 h-5 text-gray-400 transform ${sortOrder === 'desc' ? 'rotate-180' : ''} transition-transform duration-200`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Task List */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm h-full">
              <div className="p-4 border-b dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <ClipboardList className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                  Task List
                </h3>
              </div>
              <div className="p-4">
                <div className="space-y-4 max-h-[calc(100vh-24rem)] overflow-y-auto">
                  {filteredTasks.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-gray-500 dark:text-gray-400">
                        {searchQuery ? 'No tasks found matching your search' : 'No tasks found'}
                      </p>
                    </div>
                  ) : (
                    filteredTasks.map(task => (
                      <div 
                        key={task.id} 
                        className={`group p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 ${
                          task.priority === 'high' ? 'border-red-200 dark:border-red-800' :
                          task.priority === 'medium' ? 'border-yellow-200 dark:border-yellow-800' :
                          'border-green-200 dark:border-green-800'
                        }`}
                      >
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="flex items-center gap-2 md:w-auto">
                            <select
                              value={task.status}
                              onChange={(e) => handleStatusChange(task.id, e.target.value)}
                              className={`h-8 px-3 rounded-full text-sm font-medium transition-colors duration-200 ${
                                task.status === 'completed'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                  : task.status === 'in-progress'
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                              }`}
                            >
                              <option value="pending">Pending</option>
                              <option value="in-progress">In Progress</option>
                              <option value="completed">Completed</option>
                            </select>
                            <select
                              value={task.priority}
                              onChange={(e) => handlePriorityChange(task.id, e.target.value)}
                              className={`h-8 px-3 rounded-full text-sm font-medium transition-colors duration-200 ${
                                task.priority === 'high'
                                  ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                  : task.priority === 'medium'
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                  : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                              }`}
                            >
                              <option value="low">Low</option>
                              <option value="medium">Medium</option>
                              <option value="high">High</option>
                            </select>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className={`text-lg font-medium ${task.status === 'completed' ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                                {task.title}
                              </h4>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                task.category === 'work'
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                  : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                              }`}>
                                {task.category}
                              </span>
                            </div>
                            {task.description && (
                              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{task.description}</p>
                            )}
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-xs text-gray-400 dark:text-gray-500">
                              <span>Created by: {task.createdBy}</span>
                              <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
                              {task.dueDate && (
                                <span className={`${
                                  new Date(task.dueDate) < new Date() && task.status !== 'completed'
                                    ? 'text-red-500 dark:text-red-400 font-medium'
                                    : ''
                                }`}>
                                  Due: {task.dueDate}
                                </span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 self-start md:self-center"
                            title="Delete task"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - AI Suggestions */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm h-full">
              <div className="p-4 border-b dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                  AI Suggestions
                </h3>
              </div>
              <div className="p-4">
                <AISuggestions tasks={filteredTasks} />
              </div>
            </div>
          </div>
        </div>

        {/* Time Tracker Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="p-4 border-b dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <Timer className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              Time Tracker
            </h3>
          </div>
          <div className="p-4">
            <TimeTracker />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManager; 