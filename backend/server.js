const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('../backend/src/config/db.js');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/auth', require('../backend/src/routes/auth.js'));
app.use('/api/admin', require('../backend/src/routes/admin.js'));
app.use('/api/user', require('../backend/src/routes/user.js'));

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Task Management API is running'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`❌ Error: ${err.message}`);
  server.close(() => process.exit(1));
});