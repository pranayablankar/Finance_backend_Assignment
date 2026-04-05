const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { authenticate, authorize } = require('../middleware/auth');

// All dashboard routes require authentication
router.use(authenticate);

// All authenticated users can access dashboard data
// Viewers can see their own data, analysts and admins can see their data
router.get('/summary', dashboardController.getSummary);
router.get('/trend', dashboardController.getMonthlyTrend);
router.get('/activity', dashboardController.getRecentActivity);
router.get('/full', dashboardController.getDashboardData);

module.exports = router;
