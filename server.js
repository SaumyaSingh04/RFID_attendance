const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/attendance-office')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'RFID Attendance System', status: 'running' });
});

app.get('/api', (req, res) => {
  res.json({ message: 'RFID Attendance API is running' });
});

app.use('/api/users', require('./routes/users'));
app.use('/api/attendance', require('./routes/attendance'));

// Catch-all route for 404 errors
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});