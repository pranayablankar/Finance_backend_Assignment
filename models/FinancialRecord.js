const mongoose = require('mongoose');

const financialRecordSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: true,
    },
    category: {
      type: String,
      enum: [
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
      ],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    note: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Index for common queries
financialRecordSchema.index({ createdBy: 1, date: -1 });
financialRecordSchema.index({ type: 1, category: 1 });

module.exports = mongoose.model('FinancialRecord', financialRecordSchema);
