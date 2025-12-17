import React, { useState, useEffect } from 'react';
import { createUser, updateUser } from '../../services/api';
import Modal from '../common/Modal';

const UserModal = ({ isOpen, onClose, user, onSuccess }) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '' 
  });

  useEffect(() => {
    if (user) {
      setFormData({ 
        name: user.name, 
        email: user.email, 
        password: '' 
      });
    } else {
      setFormData({ 
        name: '', 
        email: '', 
        password: '' 
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const data = user
        ? await updateUser(user._id, { name: formData.name, email: formData.email })
        : await createUser(formData);
      
      if (data.success) {
        onSuccess();
      }
    } catch (error) {
      alert('Failed to save user');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={user ? 'Edit User' : 'Add New User'}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Enter name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Enter email"
          />
        </div>
        
        {!user && (
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Enter password"
            />
          </div>
        )}
        
        <div className="flex gap-2 justify-end pt-4">
          <button 
            onClick={onClose} 
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit} 
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            {user ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;