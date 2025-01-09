// ======================== server.js ========================
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const DB = require('./Database/db');
const bcrypt = require('bcrypt');
const User = require('./model/userSchema');
// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./Routes/authroutes');

const app = express();

//AdminRoute
const adminRoutes = require('./Routes/adminRouter');
app.use('/admin', adminRoutes);

// Middleware
app.use(express.json());

DB(),
// Routes
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


async function seedUser  ()  {
    try {
        for (let i =0 ; i<51; i++) {
            const password = `password${i}`;
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                userName:`student${i}`,
                password: hashedPassword,
                email: `user${i}@yopmail.com`,
                role: 'Student'
        });
console.log('Seeding users with password');
        await newUser.save();
    }
    console.log("Users seeded successfully");
    

    } catch (error) {
        console.log("Error while seeding", error);
        
    }
} seedUser();