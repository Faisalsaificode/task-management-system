import React, { useState } from 'react';
import { UserPlus, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { register } from '../../services/api';
import Alert from '../common/Alert';

const RegisterPage = ({ userType, onSwitchToLogin, onSwitchType }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setAlert({ message: 'Please fill in all fields', type: 'error' });
      return false;
    }
    
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setAlert({ message: 'Please enter a valid email', type: 'error' });
      return false;
    }

    if (formData.password.length < 6) {
      setAlert({ message: 'Password must be at least 6 characters', type: 'error' });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setAlert({ message: 'Passwords do not match', type: 'error' });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      const data = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: userType,
      });
      
      if (data.success) {
        setAlert({ message: 'Registration successful! Redirecting to login...', type: 'success' });
        setTimeout(() => {
          onSwitchToLogin();
        }, 2000);
      } else {
        setAlert({ message: data.message || 'Registration failed', type: 'error' });
      }
    } catch (error) {
      setAlert({ message: error.response?.data?.message || 'Registration failed. Please try again.', type: 'error' });
    }
    setLoading(false);
  };

  const bgGradient = userType === 'admin' 
    ? 'bg-gradient-to-br from-purple-600 to-purple-800' 
    : 'bg-gradient-to-br from-green-500 to-teal-600';

  return (
    <div className={`min-h-screen flex items-center justify-center ${bgGradient} py-8`}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
        <div className={`${bgGradient} text-white p-8 rounded-t-2xl text-center`}>
          <div className="bg-white bg-opacity-20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <UserPlus size={40} />
          </div>
          <h2 className="text-3xl font-bold mb-2">Create Account</h2>
          <p className="text-purple-100">
            {userType === 'admin' ? 'Admin' : 'User'} Registration
          </p>
        </div>
        
        <div className="p-8">
          {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
          
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => onSwitchType('admin')}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                userType === 'admin' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => onSwitchType('user')}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                userType === 'user' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              User
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Min. 6 characters"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Re-enter password"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full mt-6 py-3 rounded-lg font-semibold text-white transition ${
              userType === 'admin' 
                ? 'bg-purple-600 hover:bg-purple-700' 
                : 'bg-green-600 hover:bg-green-700'
            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <p className="text-center mt-4 text-sm text-gray-600">
            Already have an account?{' '}
            <button 
              onClick={onSwitchToLogin}
              className={`font-semibold hover:underline ${
                userType === 'admin' ? 'text-purple-600' : 'text-green-600'
              }`}
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;