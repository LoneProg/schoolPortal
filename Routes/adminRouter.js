const express = require('express');

const authenticate = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');
const { fetchAllUsers, addNewUser, updateUser, deleteUser, generateReport, getSettings, updateSetting } = require('../Controller/admincontroller');


const router = express.Router();

// Apply authentication and authorization middleware
router.use(authenticate, authorize(['Admin']));

// Admin routes
router.get('/users', fetchAllUsers);
router.post('/users', addNewUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get('/reports', generateReport);
router.get('/settings', getSettings);
router.post('/settings', updateSetting);

module.exports = router;