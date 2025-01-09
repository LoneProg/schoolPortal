const express = require('express');
const admincontroller = require('../Controller/admincontroller');
const authenticate = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');


const router = express.Router();

// Apply authentication and authorization middleware
router.use(authenticate, authorize(['Admin']));

// Admin routes
router.get('/users', admincontroller.fetchAllUsers);
router.post('/users', admincontroller.addNewUser);
router.put('/users/:id', admincontroller.updateUser);
router.delete('/users/:id', admincontroller.deleteUser);
router.get('/reports', admincontroller.generateReport);
router.get('/settings', admincontroller.getSettings);
router.post('/settings', admincontroller.updateSetting);

module.exports = router;