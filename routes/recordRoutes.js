const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');
const { authenticate, authorize } = require('../middleware/auth');
const {
  createRecordValidator,
  updateRecordValidator,
  recordIdValidator,
  dateRangeValidator,
} = require('../middleware/validation');

// All record routes require authentication
router.use(authenticate);

// Create record - analyst and admin only
router.post(
  '/',
  authorize(['analyst', 'admin']),
  createRecordValidator,
  recordController.createRecord
);

// Get all records for the user - all authenticated users
router.get('/', dateRangeValidator, recordController.getRecords);

// Get record by ID - viewer, analyst, admin
router.get('/:id', recordIdValidator, recordController.getRecordById);

// Update record - analyst and admin only
router.put(
  '/:id',
  authorize(['analyst', 'admin']),
  recordIdValidator,
  updateRecordValidator,
  recordController.updateRecord
);

// Delete record - analyst and admin only
router.delete(
  '/:id',
  authorize(['analyst', 'admin']),
  recordIdValidator,
  recordController.deleteRecord
);

module.exports = router;
