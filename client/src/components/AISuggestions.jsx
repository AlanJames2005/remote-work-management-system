import React from 'react';
import { Brain, Clock, TrendingUp } from 'lucide-react';

const AISuggestions = ({ tasks }) => {
  // Function to generate task recommendations based on existing tasks and patterns
  const generateRecommendations = () => {
    const recommendations = [
      {
        type: 'priority',
        icon: <TrendingUp className="w-5 h-5 text-orange-500" />,
        title: 'Priority Task',
        suggestion: 'Consider prioritizing tasks with upcoming deadlines',
      },
      {
        type: 'reminder',
        icon: <Clock className="w-5 h-5 text-blue-500" />,
        title: 'Time Management',
        suggestion: 'Schedule breaks between long tasks to maintain productivity',
      },
      {
        type: 'optimization',
        icon: <Brain className="w-5 h-5 text-purple-500" />,
        title: 'Work Pattern',
        suggestion: 'Your most productive hours are in the morning. Plan important tasks accordingly',
      }
    ];

    return recommendations;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-6">
      <div className="flex items-center mb-4">
        <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Suggestions</h3>
      </div>
      <div className="space-y-4">
        {generateRecommendations().map((recommendation, index) => (
          <div 
            key={index}
            className="flex items-start p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <div className="flex-shrink-0 mr-3">
              {recommendation.icon}
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                {recommendation.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {recommendation.suggestion}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AISuggestions; 