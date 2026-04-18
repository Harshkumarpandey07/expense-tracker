const express = require('express');
const router = express.Router();
const {
  getExpenses,
  addExpense,
  deleteExpense,
} = require('../controllers/expenseController');

// GET    /api/expenses        - Fetch all expenses (with optional filters)
// POST   /api/expenses        - Add a new expense
// DELETE /api/expenses/:id    - Delete an expense by ID

router.get('/', getExpenses);
router.post('/', addExpense);
router.delete('/:id', deleteExpense);

module.exports = router;