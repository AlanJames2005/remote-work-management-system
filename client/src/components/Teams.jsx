import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, Building, ChevronDown, ChevronUp, Edit, Trash2 } from 'lucide-react';

const Teams = () => {
  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: 'Engineering',
      teams: [
        {
          id: 1,
          name: 'Frontend Team',
          lead: 'John Doe',
          members: ['John Doe', 'Jane Smith', 'Mike Johnson'],
        },
        {
          id: 2,
          name: 'Backend Team',
          lead: 'Sarah Wilson',
          members: ['Sarah Wilson', 'Tom Brown', 'Lisa Anderson'],
        },
      ],
    },
    {
      id: 2,
      name: 'Design',
      teams: [
        {
          id: 3,
          name: 'UI/UX Team',
          lead: 'Emily Davis',
          members: ['Emily Davis', 'Chris Taylor', 'Alex Martin'],
        },
      ],
    },
  ]);

  const [expandedDepartments, setExpandedDepartments] = useState({});
  const [showNewDepartmentForm, setShowNewDepartmentForm] = useState(false);
  const [newDepartmentName, setNewDepartmentName] = useState('');
  const [showNewTeamForm, setShowNewTeamForm] = useState(null);
  const [newTeam, setNewTeam] = useState({ name: '', lead: '' });

  const toggleDepartment = (departmentId) => {
    setExpandedDepartments(prev => ({
      ...prev,
      [departmentId]: !prev[departmentId]
    }));
  };

  const handleAddDepartment = (e) => {
    e.preventDefault();
    if (newDepartmentName.trim()) {
      setDepartments([
        ...departments,
        {
          id: Date.now(),
          name: newDepartmentName,
          teams: []
        }
      ]);
      setNewDepartmentName('');
      setShowNewDepartmentForm(false);
    }
  };

  const handleAddTeam = (departmentId) => {
    if (newTeam.name.trim() && newTeam.lead.trim()) {
      setDepartments(departments.map(dept => {
        if (dept.id === departmentId) {
          return {
            ...dept,
            teams: [
              ...dept.teams,
              {
                id: Date.now(),
                name: newTeam.name,
                lead: newTeam.lead,
                members: [newTeam.lead]
              }
            ]
          };
        }
        return dept;
      }));
      setNewTeam({ name: '', lead: '' });
      setShowNewTeamForm(null);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <Building className="h-6 w-6 mr-2" />
          Teams & Departments
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowNewDepartmentForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add Department
        </motion.button>
      </div>

      {/* New Department Form */}
      {showNewDepartmentForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
        >
          <form onSubmit={handleAddDepartment} className="flex gap-4">
            <input
              type="text"
              value={newDepartmentName}
              onChange={(e) => setNewDepartmentName(e.target.value)}
              placeholder="Department Name"
              className="flex-1 px-4 py-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setShowNewDepartmentForm(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </form>
        </motion.div>
      )}

      {/* Departments List */}
      <div className="space-y-4">
        {departments.map((department) => (
          <motion.div
            key={department.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border dark:border-gray-700 rounded-lg overflow-hidden"
          >
            <div
              onClick={() => toggleDepartment(department.id)}
              className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 cursor-pointer"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <Building className="h-5 w-5 mr-2" />
                {department.name}
              </h3>
              {expandedDepartments[department.id] ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </div>

            {expandedDepartments[department.id] && (
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-md font-medium text-gray-700 dark:text-gray-300">Teams</h4>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowNewTeamForm(department.id)}
                    className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    <UserPlus className="h-4 w-4 mr-1" />
                    Add Team
                  </motion.button>
                </div>

                {/* New Team Form */}
                {showNewTeamForm === department.id && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={newTeam.name}
                        onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                        placeholder="Team Name"
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                      />
                      <input
                        type="text"
                        value={newTeam.lead}
                        onChange={(e) => setNewTeam({ ...newTeam, lead: e.target.value })}
                        placeholder="Team Lead"
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddTeam(department.id)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                          Add
                        </button>
                        <button
                          onClick={() => setShowNewTeamForm(null)}
                          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Teams List */}
                <div className="space-y-3">
                  {department.teams.map((team) => (
                    <motion.div
                      key={team.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="text-lg font-medium text-gray-900 dark:text-white">
                            {team.name}
                          </h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Lead: {team.lead}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-1 text-blue-600 hover:text-blue-700 dark:text-blue-400">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-red-600 hover:text-red-700 dark:text-red-400">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-3">
                        <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Members ({team.members.length})
                        </h6>
                        <div className="flex flex-wrap gap-2">
                          {team.members.map((member, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-600 rounded-full text-sm text-gray-700 dark:text-gray-300"
                            >
                              {member}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Teams; 