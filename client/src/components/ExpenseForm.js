import { useState } from 'react';
import { addExpense } from '../services/expenseService';

// Category configuration with colors and icons
const CATEGORIES = [
  { name: 'Food', icon: '🍔', color: 'bg-green-100 text-green-700 border-green-300' },
  { name: 'Transport', icon: '🚗', color: 'bg-blue-100 text-blue-700 border-blue-300' },
  { name: 'Shopping', icon: '🛍️', color: 'bg-purple-100 text-purple-700 border-purple-300' },
  { name: 'Health', icon: '💊', color: 'bg-red-100 text-red-700 border-red-300' },
  { name: 'Entertainment', icon: '🎬', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
  { name: 'Other', icon: '📦', color: 'bg-gray-100 text-gray-700 border-gray-300' },
];

/**
 * ExpenseForm component - Form to add a new expense
 * @param {Function} onExpenseAdded - Callback to refresh expense list
 */
const ExpenseForm = ({ onExpenseAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  /**
   * Handles input field changes and updates form state
   * @param {Object} e - Event object
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Handles category selection
   * @param {string} category - Selected category name
   */
  const handleCategorySelect = (category) => {
    setFormData({ ...formData, category });
  };

  /**
   * Submits the expense form data to the server
   * @param {Object} e - Event object
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validate fields
    if (!formData.title || !formData.amount || !formData.date) {
      setError('All fields are required');
      return;
    }

    try {
      setLoading(true);
      await addExpense(formData);
      setFormData({ title: '', amount: '', category: 'Food', date: '' });
      setSuccess(true);
      onExpenseAdded();
      // Hide success message after 2 seconds
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      setError('Failed to add expense. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Get selected category config
  const selectedCategory = CATEGORIES.find((c) => c.name === formData.category);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-700 mb-4">➕ Add New Expense</h2>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg mb-4 text-sm">
          ❌ {error}
        </div>
      )}

      {/* Success message */}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-2 rounded-lg mb-4 text-sm">
          ✅ Expense added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Lunch, Uber ride"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Amount (₹)</label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400 text-sm">₹</span>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full border border-gray-200 rounded-xl pl-7 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
            />
          </div>
        </div>

        {/* Category - Interactive buttons */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Category</label>
          <div className="grid grid-cols-3 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                type="button"
                onClick={() => handleCategorySelect(cat.name)}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl border-2 text-xs font-medium transition duration-200 ${
                  formData.category === cat.name
                    ? `${cat.color} border-current scale-105 shadow-sm`
                    : 'bg-gray-50 text-gray-400 border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-lg mb-0.5">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full font-semibold py-3 rounded-xl transition duration-200 text-sm shadow-sm ${
            loading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : `${selectedCategory.color} border-2 border-current hover:shadow-md`
          }`}
        >
          {loading ? '⏳ Adding...' : `Add ${selectedCategory.icon} ${formData.category} Expense`}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;