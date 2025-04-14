import React, { createContext, useContext, useState, useEffect } from 'react';

const WorkContext = createContext();

export const useWork = () => {
  const context = useContext(WorkContext);
  if (context === undefined) {
    throw new Error('useWork must be used within a WorkProvider');
  }
  return context;
};

export const WorkProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [timeEntries, setTimeEntries] = useState(() => {
    const savedEntries = localStorage.getItem('timeEntries');
    return savedEntries ? JSON.parse(savedEntries) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('timeEntries', JSON.stringify(timeEntries));
  }, [timeEntries]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const updateTask = (taskId, updates) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const addTimeEntry = (entry) => {
    setTimeEntries([entry, ...timeEntries]);
  };

  const updateTimeEntry = (entryId, updates) => {
    setTimeEntries(timeEntries.map(entry =>
      entry.id === entryId ? { ...entry, ...updates } : entry
    ));
  };

  const deleteTimeEntry = (entryId) => {
    setTimeEntries(timeEntries.filter(entry => entry.id !== entryId));
  };

  return (
    <WorkContext.Provider value={{
      tasks,
      timeEntries,
      addTask,
      updateTask,
      deleteTask,
      addTimeEntry,
      updateTimeEntry,
      deleteTimeEntry
    }}>
      {children}
    </WorkContext.Provider>
  );
}; 