// ======================== server.js ========================
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const DB = require('./Database/db');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./Routes/authroutes');

const app = express();

// Middleware
app.use(express.json());

DB(),
// Routes
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

