const express = require('express');
const DB = require('./Database/db');
const bcrypt = require('bcrypt');
const User = require('./model/userSchema');
const authRoutes = require('./Routes/authroutes');
const app = express();
const adminRoutes = require('./Routes/adminRouter');

app.use('/admin', adminRoutes);
app.use(express.json());

DB(),

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

async function seedUser() {
    try {
        for (let i = 0; i < 51; i++) {
            const userName = `student${i}`;
            const email = `user${i}@yopmail.com`;
            const existingUser = await User.findOne({ $or: [{ userName }, { email }] });

            if (existingUser) {
                console.log(`User with username ${userName} or email ${email} already exists`);
                continue;
            }

            const password = `password${i}`;
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                userName,
                password: hashedPassword,
                email,
                role: 'Student'
            });

            console.log('Seeding users with password');
            await newUser.save();
        }
        console.log("Users seeded successfully");

    } catch (error) {
        console.log("Error while seeding", error);
    }
}
seedUser();