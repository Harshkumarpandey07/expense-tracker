import { useState } from 'react';
import { deleteExpense } from '../services/expenseService';
import { formatCurrency } from '../utils/formatCurrency';

// Category configuration with colors and icons
const CATEGORY_STYLES = {
  Food: { color: 'bg-green-100 text-green-700', icon: '🍔' },
  Transport: { color: 'bg-blue-100 text-blue-700', icon: '🚗' },
  Shopping: { color: 'bg-purple-100 text-purple-700', icon: '🛍️' },
  Health: { color: 'bg-red-100 text-red-700', icon: '💊' },
  Entertainment: { color: 'bg-yellow-100 text-yellow-700', icon: '🎬' },
  Other: { color: 'bg-gray-100 text-gray-700', icon: '📦' },
};

/**
 * ExpenseList component - Displays and filters list of expenses
 * @param {Array} expenses - List of expense objects
 * @param {Function} onExpenseDeleted - Callback to refresh expense list
 */
const ExpenseList = ({ expenses, onExpenseDeleted }) => {
  const [filterCategory, setFilterCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  /**
   * Handles deletion of an expense by ID
   * @param {string} id - Expense ID to delete
   */
  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      onExpenseDeleted();
    } catch (err) {
      console.error('Error deleting expense:', err);
    }
  };

  // Filter expenses based on selected category and date range
  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory = filterCategory ? expense.category === filterCategory : true;
    const matchesStartDate = startDate ? new Date(expense.date) >= new Date(startDate) : true;
    const matchesEndDate = endDate ? new Date(expense.date) <= new Date(endDate) : true;
    return matchesCategory && matchesStartDate && matchesEndDate;
  });

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-700 mb-4">📋 Expenses</h2>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
        >
          <option value="">All Categories</option>
          {Object.keys(CATEGORY_STYLES).map((cat) => (
            <option key={cat} value={cat}>
              {CATEGORY_STYLES[cat].icon} {cat}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
        />
      </div>

      {/* Expense count */}
      <p className="text-xs text-gray-400 mb-3">
        Showing {filteredExpenses.length} of {expenses.length} expenses
      </p>

      {/* Expense Items */}
      {filteredExpenses.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-4xl mb-2">🧾</p>
          <p className="text-gray-400 text-sm">No expenses found.</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {filteredExpenses.map((expense) => {
            const style = CATEGORY_STYLES[expense.category];
            return (
              <li
                key={expense._id}
                className={`flex items-center justify-between px-4 py-3 rounded-xl border ${style.color} border-opacity-40`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{style.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">{expense.title}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(expense.date).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${style.color}`}>
                    {expense.category}
                  </span>
                  <span className="text-sm font-bold text-gray-700">
                    {formatCurrency(expense.amount)}
                  </span>
                  <button
                    onClick={() => handleDelete(expense._id)}
                    className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg p-1 transition duration-200 text-xs font-medium"
                  >
                    🗑️
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;