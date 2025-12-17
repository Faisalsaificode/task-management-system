import { getAuthToken } from '../utils/auth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};

export const register = (userData) => {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

// Admin APIs
export const getStats = () => request('/admin/stats');
export const getAllUsers = () => request('/admin/users');
export const createUser = (userData) => {
  return request('/admin/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};
export const updateUser = (id, userData) => {
  return request(`/admin/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  });
};
export const deleteUser = (id) => {
  return request(`/admin/users/${id}`, { method: 'DELETE' });
};

export const getAllTasks = () => request('/admin/tasks');
export const createTask = (taskData) => {
  return request('/admin/tasks', {
    method: 'POST',
    body: JSON.stringify(taskData),
  });
};
export const updateTask = (id, taskData) => {
  return request(`/admin/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(taskData),
  });
};
export const deleteTask = (id) => {
  return request(`/admin/tasks/${id}`, { method: 'DELETE' });
};

// User APIs
export const getMyTasks = () => request('/user/tasks');
export const updateTaskStatus = (id, status) => {
  return request(`/user/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
};