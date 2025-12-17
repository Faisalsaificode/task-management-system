📋 Task Management System

A full-stack task management application with role-based access control, built with Node.js, Express, MongoDB, React, and Tailwind CSS.
Features • Demo • Installation • Usage • API Documentation • Contributing


📖 Table of Contents

Overview
Features
Tech Stack
System Architecture
Prerequisites
Installation
Configuration
Running the Application
Project Structure
API Documentation
Screenshots
Testing
Deployment
Security
Troubleshooting
Contributing
License
Contact


🎯 Overview
The Task Management System is a comprehensive web application designed to streamline task assignment, tracking, and management within organizations. It features separate portals for administrators and users, providing role-based access control and real-time task status updates.
Key Highlights

🔐 Secure Authentication - JWT-based authentication with bcrypt password hashing
👥 Role-Based Access - Separate admin and user portals with different permissions
📊 Real-Time Dashboard - Live statistics and task tracking
📱 Responsive Design - Works seamlessly on desktop, tablet, and mobile devices
⚡ Modern Stack - Built with latest technologies and best practices
🎨 Professional UI - Clean, intuitive interface with Tailwind CSS


✨ Features
For Administrators

✅ User Management

Create, read, update, and delete user accounts
View all registered users
Manage user roles and permissions


✅ Task Management

Create and assign tasks to users
Set task priorities (Low, Medium, High)
Define due dates and descriptions
Edit and delete tasks
Track task status across organization


✅ Dashboard Analytics

Total users count
Total tasks overview
Completed tasks statistics
Pending tasks monitoring
Recent tasks activity



For Users

✅ Personal Task Board

View all assigned tasks
Task details with priority indicators
Due date tracking
Status management


✅ Task Status Updates

Update task status (Pending → In Progress → Completed)
Real-time status reflection
Personal progress tracking


✅ Statistics Dashboard

Total assigned tasks
Completed tasks count
In-progress tasks
Pending tasks overview



Common Features

🔒 Secure Registration & Login

Separate registration for admins and users
Email and password validation
Secure password storage with bcrypt
JWT token-based sessions


🎨 Modern UI/UX

Responsive design for all devices
Intuitive navigation
Color-coded priority indicators
Status badges
Modal dialogs for forms




🛠️ Tech Stack
Backend
TechnologyVersionPurposeNode.js18.xRuntime environmentExpress.js4.18+Web application frameworkMongoDB6.0+NoSQL databaseMongoose8.0+MongoDB ODMJWT9.0+Authentication tokensBcrypt.js2.4+Password hashingCORS2.8+Cross-origin resource sharingDotenv16.3+Environment variables
Frontend
TechnologyVersionPurposeReact18.2UI libraryVite5.0+Build tool & dev serverTailwind CSS3.3+Utility-first CSS frameworkLucide React0.294+Icon libraryPostCSS8.4+CSS processingAutoprefixer10.4+CSS vendor prefixing
Development Tools

Nodemon - Auto-restart server on changes
ESLint - Code linting
Prettier - Code formatting
MongoDB Compass - Database GUI


🏗️ System Architecture
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  React Frontend (Vite + Tailwind CSS)                 │  │
│  │  - Admin Dashboard    - User Dashboard                │  │
│  │  - Login/Register     - Task Management               │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/HTTPS
                              │ REST API
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Application Layer                       │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Express.js Server                                     │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐ │  │
│  │  │    Auth     │  │    Admin     │  │    User     │ │  │
│  │  │  Controller │  │  Controller  │  │  Controller │ │  │
│  │  └─────────────┘  └──────────────┘  └─────────────┘ │  │
│  │  ┌─────────────────────────────────────────────────┐ │  │
│  │  │  Middleware: Auth, Role Check, Validation       │ │  │
│  │  └─────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Mongoose ODM
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       Database Layer                         │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  MongoDB                                               │  │
│  │  ┌─────────────┐           ┌─────────────┐          │  │
│  │  │    Users    │           │    Tasks    │          │  │
│  │  │  Collection │           │  Collection │          │  │
│  │  └─────────────┘           └─────────────┘          │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘

📋 Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v18.0.0 or higher)

Download from nodejs.org
Verify: node --version


npm (v9.0.0 or higher)

Comes with Node.js
Verify: npm --version


MongoDB (v6.0 or higher)

Download from mongodb.com
Verify: mongod --version


Git (optional, for version control)

Download from git-scm.com
Verify: git --version




🚀 Installation
1. Clone the Repository
bashgit clone https://github.com/yourusername/task-management-system.git
cd task-management-system
2. Backend Setup
bash# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration
nano .env
Backend Dependencies:
json{
  "express": "^4.18.2",
  "mongoose": "^8.0.0",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "dotenv": "^16.3.1",
  "cors": "^2.8.5",
  "express-validator": "^7.0.1"
}
3. Frontend Setup
bash# Navigate to frontend directory
cd ../frontend-react

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration
nano .env
Frontend Dependencies:
json{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "lucide-react": "^0.294.0"
}
4. Database Setup
Start MongoDB:
bash# macOS (using Homebrew)
brew services start mongodb-community

# Linux (Ubuntu)
sudo systemctl start mongod

# Windows
net start MongoDB
Verify MongoDB is running:
bashmongosh
# or
mongo

⚙️ Configuration
Backend Configuration
Create .env file in the backend directory:
env# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/task_management

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# CORS Configuration (optional)
CORS_ORIGIN=http://localhost:3000
Frontend Configuration
Create .env file in the frontend-react directory:
env# API Configuration
VITE_API_URL=http://localhost:5000/api

# App Configuration
VITE_APP_NAME=Task Management System
VITE_APP_VERSION=1.0.0
Security Notes
⚠️ Important: Never commit .env files to version control!

Add .env to .gitignore
Use strong, unique values for JWT_SECRET in production
Change default passwords and secrets
Use environment-specific configurations


🎮 Running the Application
Development Mode
Terminal 1 - Start Backend:
bashcd backend
npm run dev
Expected output:
🚀 Server running in development mode on port 5000
✅ MongoDB Connected: localhost
Terminal 2 - Start Frontend:
bashcd frontend-react
npm run dev
Expected output:
VITE v5.0.8  ready in 500 ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
Production Mode
Backend:
bashcd backend
npm start
Frontend:
bashcd frontend-react
npm run build
npm run preview

📁 Project Structure
task-management-system/
│
├── backend/                          # Backend Node.js application
│   ├── config/                       # Configuration files
│   │   └── db.js                    # Database connection
│   ├── controllers/                  # Request handlers
│   │   ├── authController.js        # Authentication logic
│   │   ├── adminController.js       # Admin operations
│   │   └── userController.js        # User operations
│   ├── middleware/                   # Custom middleware
│   │   ├── auth.js                  # JWT authentication
│   │   └── roleCheck.js             # Role authorization
│   ├── models/                       # Database models
│   │   ├── User.js                  # User schema
│   │   └── Task.js                  # Task schema
│   ├── routes/                       # API routes
│   │   ├── auth.js                  # Auth routes
│   │   ├── admin.js                 # Admin routes
│   │   └── user.js                  # User routes
│   ├── .env                         # Environment variables
│   ├── .gitignore                   # Git ignore file
│   ├── package.json                 # Dependencies & scripts
│   └── server.js                    # Entry point
│
├── frontend-react/                   # Frontend React application
│   ├── public/                       # Static files
│   │   └── index.html               # HTML template
│   ├── src/                          # Source code
│   │   ├── components/              # React components
│   │   │   ├── common/              # Reusable components
│   │   │   │   ├── Alert.jsx        # Alert component
│   │   │   │   ├── Modal.jsx        # Modal component
│   │   │   │   └── StatCard.jsx     # Statistics card
│   │   │   ├── admin/               # Admin components
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── UserModal.jsx
│   │   │   │   └── TaskModal.jsx
│   │   │   ├── user/                # User components
│   │   │   │   └── UserDashboard.jsx
│   │   │   └── auth/                # Authentication components
│   │   │       ├── LoginPage.jsx
│   │   │       └── RegisterPage.jsx
│   │   ├── services/                # API services
│   │   │   └── api.js               # API calls
│   │   ├── utils/                   # Utility functions
│   │   │   └── auth.js              # Auth helpers
│   │   ├── App.jsx                  # Main app component
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Global styles
│   ├── .env                         # Environment variables
│   ├── .gitignore                   # Git ignore file
│   ├── package.json                 # Dependencies & scripts
│   ├── vite.config.js               # Vite configuration
│   ├── tailwind.config.js           # Tailwind configuration
│   └── postcss.config.js            # PostCSS configuration
│
├── .gitignore                        # Root git ignore
├── README.md                         # This file
└── LICENSE                           # License file

📡 API Documentation
Base URL
Development: http://localhost:5000/api
Production: https://your-domain.com/api
Authentication
All protected routes require a JWT token in the Authorization header:
Authorization: Bearer <token>
Endpoints
Authentication Endpoints
Register User
httpPOST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}

Response: 201 Created
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
Login
httpPOST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
Get Current User
httpGET /api/auth/me
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
Admin Endpoints
Get Dashboard Statistics
httpGET /api/admin/stats
Authorization: Bearer <admin_token>

Response: 200 OK
{
  "success": true,
  "data": {
    "totalUsers": 15,
    "totalTasks": 42,
    "completedTasks": 18,
    "pendingTasks": 24
  }
}
Get All Users
httpGET /api/admin/users
Authorization: Bearer <admin_token>

Response: 200 OK
{
  "success": true,
  "count": 15,
  "data": [...]
}
Create User
httpPOST /api/admin/users
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "password123"
}
Get All Tasks
httpGET /api/admin/tasks
Authorization: Bearer <admin_token>

Response: 200 OK
{
  "success": true,
  "count": 42,
  "data": [...]
}
Create Task
httpPOST /api/admin/tasks
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive docs",
  "assignedTo": "user_id_here",
  "priority": "high",
  "dueDate": "2024-12-31"
}
User Endpoints
Get My Tasks
httpGET /api/user/tasks
Authorization: Bearer <user_token>

Response: 200 OK
{
  "success": true,
  "count": 5,
  "data": [...]
}
Update Task Status
httpPUT /api/user/tasks/:id
Authorization: Bearer <user_token>
Content-Type: application/json

{
  "status": "completed"
}

Response: 200 OK
{
  "success": true,
  "data": {...}
}
Error Responses
json{
  "success": false,
  "message": "Error message here"
}
Common Status Codes:

200 - Success
201 - Created
400 - Bad Request
401 - Unauthorized
403 - Forbidden
404 - Not Found
500 - Server Error


📸 Screenshots
Login Page
Show Image
Admin and User login with role switching
Registration Page
Show Image
User registration with validation
Admin Dashboard
Show Image
Real-time statistics and recent tasks
User Management
Show Image
CRUD operations for users
Task Management
Show Image
Create and assign tasks
User Dashboard
Show Image
Personal task board with status updates

🧪 Testing
Manual Testing
Test Admin Flow:
bash1. Register as admin
2. Login with admin credentials
3. Create a user
4. Assign a task to user
5. Verify task appears in admin dashboard
Test User Flow:
bash1. Register as user
2. Login with user credentials
3. View assigned tasks
4. Update task status
5. Verify statistics update
API Testing with cURL
bash# Test user registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123","role":"user"}'

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
Using Postman

Import the API collection
Set environment variables
Run authentication tests
Test CRUD operations
Verify responses


🚢 Deployment
Backend Deployment (Railway/Render)
1. Prepare for deployment:
bashcd backend
npm run build  # if you have a build script
2. Deploy to Railway:
bash# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up
3. Set environment variables:
bashrailway variables set MONGODB_URI=your_mongodb_atlas_uri
railway variables set JWT_SECRET=your_secret_key
railway variables set NODE_ENV=production
Frontend Deployment (Vercel/Netlify)
Deploy to Vercel:
bash# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend-react
vercel

# Follow prompts
Deploy to Netlify:
bash# Build
npm run build

# Deploy build folder to Netlify (drag & drop or CLI)
MongoDB Atlas Setup

Create account at mongodb.com/cloud/atlas
Create new cluster (free tier available)
Setup database user
Whitelist IP addresses
Get connection string
Update MONGODB_URI in production


🔒 Security
Implemented Security Measures
✅ Authentication & Authorization

JWT token-based authentication
Role-based access control (RBAC)
Protected API routes
Secure password storage with bcrypt

✅ Data Protection

Password hashing (10 rounds)
JWT token expiration
CORS configuration
Environment variable protection

✅ Input Validation

Email format validation
Password strength requirements
Request data sanitization
MongoDB injection prevention

Security Best Practices
⚠️ Production Checklist:

 Change default JWT_SECRET to strong random string
 Use HTTPS in production
 Enable rate limiting
 Implement request logging
 Set up monitoring and alerts
 Regular security audits
 Keep dependencies updated
 Use helmet.js for HTTP headers
 Implement CSRF protection
 Add input sanitization


🐛 Troubleshooting
Common Issues
1. MongoDB Connection Error
Error: connect ECONNREFUSED 127.0.0.1:27017
Solution: Start MongoDB service
bash# Mac
brew services start mongodb-community

# Windows
net start MongoDB

# Linux
sudo systemctl start mongod
2. Port Already in Use
Error: listen EADDRINUSE: address already in use :::5000
Solution: Kill process or change port
bash# Find and kill process
lsof -ti:5000 | xargs kill -9

# Or change PORT in .env
3. CORS Error
Access to fetch blocked by CORS policy
Solution: Check backend CORS configuration in server.js
4. JWT Token Invalid
Error: jwt malformed
Solution: Clear localStorage and login again
5. Module Not Found
Error: Cannot find module
Solution: Reinstall dependencies
bashrm -rf node_modules package-lock.json
npm install
Debug Mode
Enable debug logging:
env# Backend .env
DEBUG=true
NODE_ENV=development

# Check server logs
npm run dev

🤝 Contributing
We welcome contributions! Please follow these steps:
1. Fork the Repository
bashgit clone https://github.com/yourusername/task-management-system.git
cd task-management-system
2. Create a Branch
bashgit checkout -b feature/your-feature-name
3. Make Changes

Write clean, readable code
Follow existing code style
Add comments where necessary
Update documentation

4. Commit Changes
bashgit add .
git commit -m "feat: add new feature description"
Commit Message Convention:

feat: New feature
fix: Bug fix
docs: Documentation changes
style: Code style changes
refactor: Code refactoring
test: Adding tests
chore: Maintenance tasks

5. Push and Create PR
bashgit push origin feature/your-feature-name
Then create a Pull Request on GitHub.
Code of Conduct

Be respectful and inclusive
Follow coding standards
Write meaningful commit messages
Test your changes thoroughly
Update documentation as needed


📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
MIT License

Copyright (c) 2024 Task Management System

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

👥 Authors
Your Name

GitHub: @yourusername
LinkedIn: Your Name
Email: your.email@example.com


📞 Contact & Support
Get Help

📧 Email: support@taskmanagement.com
💬 Discord: Join our community
📖 Documentation: docs.taskmanagement.com
🐛 Issues: GitHub Issues

Resources

User Guide
API Documentation
Contributing Guidelines
Changelog


🙏 Acknowledgments

Node.js - JavaScript runtime
Express - Web framework
MongoDB - Database
React - UI library
Tailwind CSS - CSS framework
Vite - Build tool
Lucide - Icon library


⭐ Star History
Show Image

📊 Project Stats
Show Image
Show Image
Show Image
Show Image
Show Image


Made by Faisal Saifi

