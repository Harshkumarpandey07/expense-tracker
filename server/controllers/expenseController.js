const Expense = require('../models/Expense');

/**
 * Get all expenses with optional category and date filters
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getExpenses = async (req, res) => {
  try {
    const { category, startDate, endDate } = req.query;

    // Build filter object based on query params
    let filter = {};

    if (category) filter.category = category;

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const expenses = await Expense.find(filter).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expenses', error });
  }
};

/**
 * Add a new expense to the database
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const addExpense = async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;

    // Validate required fields
    if (!title || !amount || !category || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newExpense = new Expense({ title, amount, category, date });
    const savedExpense = await newExpense.save();

    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(500).json({ message: 'Error adding expense', error });
  }
};

/**
 * Delete an expense by its ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Expense.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting expense', error });
  }
};

module.exports = { getExpenses, addExpense, deleteExpense };