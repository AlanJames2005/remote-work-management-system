import React from 'react';
import { useWork } from '../context/WorkContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Dashboard = () => {
  const { tasks, timeEntries } = useWork();

  // Calculate task statistics
  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(task => task.status === 'completed').length,
    inProgress: tasks.filter(task => task.status === 'in-progress').length,
    pending: tasks.filter(task => task.status === 'pending').length,
  };

  // Prepare data for task status doughnut chart
  const taskStatusData = {
    labels: ['Completed', 'In Progress', 'Pending'],
    datasets: [
      {
        data: [taskStats.completed, taskStats.inProgress, taskStats.pending],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for time tracking bar chart
  const timeTrackingData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Hours Tracked',
        data: [6, 7, 8, 6.5, 7.5], // Example data - replace with actual time entries
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for productivity line chart
  const productivityData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Tasks Completed',
        data: [5, 8, 12, 15], // Example data - replace with actual productivity metrics
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Task Status Chart */}
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Task Status</h3>
          <div className="h-64">
            <Doughnut data={taskStatusData} options={chartOptions} />
          </div>
        </div>

        {/* Time Tracking Chart */}
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Weekly Time Tracking</h3>
          <div className="h-64">
            <Bar data={timeTrackingData} options={chartOptions} />
          </div>
        </div>

        {/* Productivity Chart */}
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Productivity Trend</h3>
          <div className="h-64">
            <Line data={productivityData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">Total Tasks</h4>
          <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{taskStats.total}</p>
        </div>
        <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-green-800 dark:text-green-200">Completed</h4>
          <p className="text-2xl font-bold text-green-900 dark:text-green-100">{taskStats.completed}</p>
        </div>
        <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">In Progress</h4>
          <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">{taskStats.inProgress}</p>
        </div>
        <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-red-800 dark:text-red-200">Pending</h4>
          <p className="text-2xl font-bold text-red-900 dark:text-red-100">{taskStats.pending}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 