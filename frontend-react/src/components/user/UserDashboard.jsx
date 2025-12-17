import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, Calendar, LogOut } from 'lucide-react';
import { getMyTasks, updateTaskStatus } from '../../services/api';
import Alert from '../common/Alert';

const UserDashboard = ({ user, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await getMyTasks();
      if (data.success) {
        setTasks(data.data);
      }
    } catch (error) {
      setAlert({ message: 'Failed to load tasks', type: 'error' });
    }
    setLoading(false);
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const data = await updateTaskStatus(taskId, newStatus);
      if (data.success) {
        setAlert({ message: 'Task status updated', type: 'success' });
        loadTasks();
      }
    } catch (error) {
      setAlert({ message: 'Failed to update status', type: 'error' });
    }
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <CheckCircle size={32} />
              <h1 className="text-2xl font-bold">Task Manager</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm">Welcome, {user.name}</span>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {alert && (
          <Alert 
            message={alert.message} 
            type={alert.type} 
            onClose={() => setAlert(null)} 
          />
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Tasks</p>
                <h3 className="text-3xl font-bold">{stats.total}</h3>
              </div>
              <CheckCircle size={40} className="text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 text-sm mb-1">Completed</p>
                <h3 className="text-3xl font-bold">{stats.completed}</h3>
              </div>
              <CheckCircle size={40} className="text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 text-sm mb-1">In Progress</p>
                <h3 className="text-3xl font-bold">{stats.inProgress}</h3>
              </div>
              <Clock size={40} className="text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 text-sm mb-1">Pending</p>
                <h3 className="text-3xl font-bold">{stats.pending}</h3>
              </div>
              <Clock size={40} className="text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Tasks */}
        <h2 className="text-2xl font-bold mb-6">My Tasks</h2>
        
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <CheckCircle size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No tasks assigned yet
            </h3>
            <p className="text-gray-500">Your assigned tasks will appear here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map(task => (
              <div
                key={task._id}
                className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow border-l-4 ${
                  task.priority === 'high' ? 'border-red-500' :
                  task.priority === 'medium' ? 'border-yellow-500' :
                  'border-blue-500'
                }`}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{task.description}</p>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Calendar size={16} />
                    <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task._id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div className="mt-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold block text-center ${
                      task.status === 'completed' ? 'bg-green-100 text-green-800' :
                      task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {task.status.toUpperCase().replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;