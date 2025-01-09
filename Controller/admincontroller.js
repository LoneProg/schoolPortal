const User = require('../model/userSchema');
const schoolSettings = require('../model/schoolSetting');
const bcrypt = require('bcrypt');


//Endpoint to allow Admin to add new student or teacher accounts
const addNewUser = async (req, res) => {
    const { username, password, role } = req.body;

  if (!['Student', 'Teacher'].includes(role)) {
    return res.status(400).json({ message: 'Role must be either Student or Teacher.' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create user', error: err.message });
  }
};

//Endpoint to allow the Admin update user details
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, role } = req.body;
  
    if (role && !['Student', 'Teacher', 'Admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role.' });
    }
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { username, role },
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) return res.status(404).json({ message: 'User not found.' });
  
      res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
      res.status(500).json({ message: 'Failed to update user', error: err.message });
    }
  };


//Endpoint to allow the Admin delete a user from the database.
const deleteUser = async (req, res) => {
    const { id } = req.params;
   // const { role } = req.body;
    
    if (role && role!== 'Admin') {
      return res.status(403).json({ message: 'Only Admins can delete users.' });
    }

    try {
       const deletedUser =  await User.findByIdAndDelete(id);

        if (!deletedUser) return res.status(404).json({ message: 'User not found.' });
        res.status(200).json({ message: 'User deleted successfully.', user: deleteUser });

    } catch (err) {
        res.status(500).json({ message: 'Failed to delete user', error: err.message });
    }
};

//Endpoint to allow admin to generate reports for student performance and attendance

const generateReport = async (req, res) => {
const { id } = req.params;

try {
    // Example: Mock data for student performance
    const reports = [
      { student: 'John Doe', performance: 'A', attendance: '95%' },
      { student: 'Jane Smith', performance: 'B+', attendance: '90%' },
    ];

    res.status(200).json({ message: 'Reports generated successfully', reports });
  } catch (err) {
    res.status(500).json({ message: 'Failed to generate reports', error: err.message });
  }
};



//Endpoint to Fetch All Users from the database.
const fetchAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); //excludes password
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//Endpoint to allow the admin to get school settings

const getSettings = async (req, res) => {
    try {
      const settings = await schoolSettings.find();
      res.status(200).json({ message: 'Settings fetched successfully', settings });
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch settings', error: err.message });
    }
  };


  //Endpoint to modify school settings
  const updateSetting = async (req, res) => {
    const { settingName, value } = req.body;
  
    try {
      // Find the setting by name and update it, or create it if it doesn't exist
      const updatedSetting = await SchoolSettings.findOneAndUpdate(
        { settingName },
        { value, updatedAt: Date.now() },
        { new: true, upsert: true, runValidators: true }
      );
  
      res.status(200).json({
        message: 'Setting updated successfully',
        setting: updatedSetting,
      });
    } catch (err) {
      res.status(500).json({ message: 'Failed to update setting', error: err.message });
    }
  };



module.exports = { addNewUser, updateUser, deleteUser, generateReport, fetchAllUsers, getSettings, updateSetting };
