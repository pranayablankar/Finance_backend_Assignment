const { validationResult, body, param, query } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array(),
    });
  }
  next();
};

// Auth validators
const registerValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  handleValidationErrors,
];

const loginValidator = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors,
];

// Financial Record validators
const createRecordValidator = [
  body('amount').isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
  body('type').isIn(['income', 'expense']).withMessage('Type must be income or expense'),
  body('category')
    .isIn([
      'salary',
      'freelance',
      'investment',
      'bonus',
      'food',
      'transportation',
      'utilities',
      'entertainment',
      'healthcare',
      'education',
      'other',
    ])
    .withMessage('Invalid category'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('note').trim().optional(),
  handleValidationErrors,
];

const updateRecordValidator = [
  body('amount').optional().isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
  body('type').optional().isIn(['income', 'expense']).withMessage('Type must be income or expense'),
  body('category')
    .optional()
    .isIn([
      'salary',
      'freelance',
      'investment',
      'bonus',
      'food',
      'transportation',
      'utilities',
      'entertainment',
      'healthcare',
      'education',
      'other',
    ])
    .withMessage('Invalid category'),
  body('date').optional().isISO8601().withMessage('Valid date is required'),
  body('note').optional().trim(),
  handleValidationErrors,
];

const recordIdValidator = [
  param('id').isMongoId().withMessage('Invalid record ID'),
  handleValidationErrors,
];

// Query validators
const dateRangeValidator = [
  query('startDate').optional().isISO8601().withMessage('Valid start date required'),
  query('endDate').optional().isISO8601().withMessage('Valid end date required'),
  query('category').optional().trim(),
  query('type').optional().isIn(['income', 'expense']).withMessage('Type must be income or expense'),
  query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be positive'),
  query('skip').optional().isInt({ min: 0 }).withMessage('Skip must be non-negative'),
  handleValidationErrors,
];

module.exports = {
  registerValidator,
  loginValidator,
  createRecordValidator,
  updateRecordValidator,
  recordIdValidator,
  dateRangeValidator,
};
