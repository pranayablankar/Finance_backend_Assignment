require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const recordRoutes = require('./routes/recordRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
let dbConnected = false;
mongoose
  .connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
  .then(() => {
    console.log('MongoDB connected');
    dbConnected = true;
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    console.log('Warning: Starting server without database connection');
    console.log('Some endpoints may not work. Please ensure MongoDB is running.');
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Finance Dashboard Backend API',
    version: '1.0.0',
    status: 'Running',
    documentation: 'See README.md for API documentation',
    endpoints: {
      auth: '/api/auth (register, login)',
      records: '/api/records (CRUD operations)',
      dashboard: '/api/dashboard (analytics)',
      users: '/api/users (admin only)',
      health: '/api/health (server status)'
    }
  });
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Backend is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
