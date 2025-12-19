import { getAuthToken } from '../utils/auth';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');


const request = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth APIs
export const login = (credentials) => {
  return request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};

export const register = (userData) => {
  return request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};


// Admin APIs
export const getStats = () => request('/api/admin/stats');
export const getAllUsers = () => request('/api/admin/users');
export const createUser = (userData) => {
  return request('/api/admin/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};
export const updateUser = (id, userData) => {
  return request(`/api/admin/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  });
};
export const deleteUser = (id) => {
  return request(`/api/admin/users/${id}`, { method: 'DELETE' });
};

export const getAllTasks = () => request('/api/admin/tasks');
export const createTask = (taskData) => {
  return request('/api/admin/tasks', {
    method: 'POST',
    body: JSON.stringify(taskData),
  });
};
export const updateTask = (id, taskData) => {
  return request(`/api/admin/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(taskData),
  });
};
export const deleteTask = (id) => {
  return request(`/api/admin/tasks/${id}`, { method: 'DELETE' });
};

// User APIs
export const getMyTasks = () => request('/api/user/tasks');
export const updateTaskStatus = (id, status) => {
  return request(`/api/user/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
};