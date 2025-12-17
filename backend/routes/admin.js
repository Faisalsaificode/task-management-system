const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
  getStats
} = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roleCheck');

// Apply middleware to all routes
router.use(protect);
router.use(authorize('admin'));

// User routes
router.route('/users').get(getAllUsers).post(createUser);
router.route('/users/:id').put(updateUser).delete(deleteUser);

// Task routes
router.route('/tasks').get(getAllTasks).post(createTask);
router.route('/tasks/:id').put(updateTask).delete(deleteTask);

// Stats route
router.get('/stats', getStats);

module.exports = router;