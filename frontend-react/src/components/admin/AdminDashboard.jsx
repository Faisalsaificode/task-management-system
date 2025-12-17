import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, Clock, Users, BarChart3, Plus, 
  Edit, Trash2, LogOut, Menu 
} from 'lucide-react';
import { 
  getStats, getAllUsers, getAllTasks, 
  deleteUser, deleteTask 
} from '../../services/api';
import Alert from '../common/Alert';
import StatCard from '../common/StatCard';
import UserModal from './UserModal';
import TaskModal from './TaskModal';

const AdminDashboard = ({ user, onLogout }) => {
  const [stats, setStats] = useState({ 
    totalUsers: 0, 
    totalTasks: 0, 
    completedTasks: 0, 
    pendingTasks: 0 
  });
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [alert, setAlert] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsData, usersData, tasksData] = await Promise.all([
        getStats(),
        getAllUsers(),
        getAllTasks(),
      ]);
      
      if (statsData.success) setStats(statsData.data);
      if (usersData.success) setUsers(usersData.data);
      if (tasksData.success) setTasks(tasksData.data);
    } catch (error) {
      setAlert({ message: 'Failed to load data', type: 'error' });
    }
    setLoading(false);
  };

  const handleDeleteUser = async (id, name) => {
    if (!window.confirm(`Delete user ${name}?`)) return;
    
    try {
      const data = await deleteUser(id);
      if (data.success) {
        setAlert({ message: 'User deleted successfully', type: 'success' });
        loadData();
      }
    } catch (error) {
      setAlert({ message: 'Failed to delete user', type: 'error' });
    }
  };

  const handleDeleteTask = async (id, title) => {
    if (!window.confirm(`Delete task "${title}"?`)) return;
    
    try {
      const data = await deleteTask(id);
      if (data.success) {
        setAlert({ message: 'Task deleted successfully', type: 'success' });
        loadData();
      }
    } catch (error) {
      setAlert({ message: 'Failed to delete task', type: 'error' });
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-gradient-to-b from-purple-700 to-purple-900 text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0'} overflow-hidden`}>
        <div className="p-6 border-b border-purple-600">
          <div className="flex items-center gap-3">
            <CheckCircle size={32} />
            <div>
              <h1 className="text-xl font-bold">Task Manager</h1>
              <p className="text-sm text-purple-200">Admin Portal</p>
            </div>
          </div>
        </div>
        
        <nav className="p-4 space-y-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeTab === 'dashboard' ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'
            }`}
          >
            <BarChart3 size={20} />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeTab === 'users' ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'
            }`}
          >
            <Users size={20} />
            <span>Users</span>
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeTab === 'tasks' ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'
            }`}
          >
            <CheckCircle size={20} />
            <span>Tasks</span>
          </button>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-purple-600">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="text-gray-600 hover:text-gray-800"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-semibold">
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'users' && 'Users Management'}
              {activeTab === 'tasks' && 'Tasks Management'}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Welcome, {user.name}</span>
            <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {alert && (
            <Alert 
              message={alert.message} 
              type={alert.type} 
              onClose={() => setAlert(null)} 
            />
          )}

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                  icon={Users} 
                  title="Total Users" 
                  value={stats.totalUsers} 
                  color="border-purple-500" 
                />
                <StatCard 
                  icon={CheckCircle} 
                  title="Total Tasks" 
                  value={stats.totalTasks} 
                  color="border-blue-500" 
                />
                <StatCard 
                  icon={CheckCircle} 
                  title="Completed" 
                  value={stats.completedTasks} 
                  color="border-green-500" 
                />
                <StatCard 
                  icon={Clock} 
                  title="Pending" 
                  value={stats.pendingTasks} 
                  color="border-yellow-500" 
                />
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Tasks</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Task</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Assigned To</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Priority</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {tasks.slice(0, 5).map(task => (
                        <tr key={task._id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">{task.title}</td>
                          <td className="px-4 py-3">{task.assignedTo?.name || 'Unknown'}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              task.priority === 'high' ? 'bg-red-100 text-red-800' :
                              task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {task.priority}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              task.status === 'completed' ? 'bg-green-100 text-green-800' :
                              task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {task.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b flex justify-between items-center">
                <h3 className="text-lg font-semibold">All Users</h3>
                <button
                  onClick={() => { setEditingUser(null); setShowUserModal(true); }}
                  className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  <Plus size={20} />
                  Add User
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {users.map(u => (
                      <tr key={u._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">{u.name}</td>
                        <td className="px-6 py-4">{u.email}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">
                            {u.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => { setEditingUser(u); setShowUserModal(true); }}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(u._id, u.name)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tasks Tab */}
          {activeTab === 'tasks' && (
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b flex justify-between items-center">
                <h3 className="text-lg font-semibold">All Tasks</h3>
                <button
                  onClick={() => { setEditingTask(null); setShowTaskModal(true); }}
                  className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  <Plus size={20} />
                  Assign Task
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Task</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Assigned To</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Priority</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Due Date</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {tasks.map(task => (
                      <tr key={task._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">{task.title}</td>
                        <td className="px-6 py-4">{task.assignedTo?.name || 'Unknown'}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            task.priority === 'high' ? 'bg-red-100 text-red-800' :
                            task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {task.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            task.status === 'completed' ? 'bg-green-100 text-green-800' :
                            task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {task.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {new Date(task.dueDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => { setEditingTask(task); setShowTaskModal(true); }}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteTask(task._id, task.title)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <UserModal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        user={editingUser}
        onSuccess={() => { 
          setShowUserModal(false); 
          loadData(); 
          setAlert({ message: 'User saved successfully', type: 'success' }); 
        }}
      />

      <TaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        task={editingTask}
        users={users}
        onSuccess={() => { 
          setShowTaskModal(false); 
          loadData(); 
          setAlert({ message: 'Task saved successfully', type: 'success' }); 
        }}
      />
    </div>
  );
};

export default AdminDashboard;
