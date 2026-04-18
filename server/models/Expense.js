const mongoose = require('mongoose');

/**
 * Mongoose schema for an Expense document
 */
const expenseSchema = new mongoose.Schema(
  {
    // Title or short description of the expense
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Amount spent
    amount: {
      type: Number,
      required: true,
    },

    // Category of the expense
    category: {
      type: String,
      required: true,
      enum: ['Food', 'Transport', 'Shopping', 'Health', 'Entertainment', 'Other'],
    },

    // Date of the expense
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Expense', expenseSchema);