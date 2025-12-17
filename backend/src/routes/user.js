const express = require('express');
const router = express.Router();
const {
  getMyTasks,
  getTask,
  updateTaskStatus
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roleCheck');

// Apply middleware
router.use(protect);
router.use(authorize('user'));

router.get('/tasks', getMyTasks);
router.route('/tasks/:id').get(getTask).put(updateTaskStatus);

module.exports = router;