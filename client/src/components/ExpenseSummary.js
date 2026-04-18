import { formatCurrency } from '../utils/formatCurrency';

// Category configuration with colors and icons
const CATEGORY_STYLES = {
  Food: { color: 'bg-green-100 text-green-700', bar: 'bg-green-400', icon: '🍔' },
  Transport: { color: 'bg-blue-100 text-blue-700', bar: 'bg-blue-400', icon: '🚗' },
  Shopping: { color: 'bg-purple-100 text-purple-700', bar: 'bg-purple-400', icon: '🛍️' },
  Health: { color: 'bg-red-100 text-red-700', bar: 'bg-red-400', icon: '💊' },
  Entertainment: { color: 'bg-yellow-100 text-yellow-700', bar: 'bg-yellow-400', icon: '🎬' },
  Other: { color: 'bg-gray-100 text-gray-700', bar: 'bg-gray-400', icon: '📦' },
};

/**
 * ExpenseSummary component - Shows total spending per category with progress bars
 * @param {Array} expenses - List of expense objects
 */
const ExpenseSummary = ({ expenses }) => {
  /**
   * Calculates total amount spent per category
   * @returns {Object} - Object with category names as keys and totals as values
   */
  const calculateCategoryTotals = () => {
    return expenses.reduce((totals, expense) => {
      const { category, amount } = expense;
      totals[category] = (totals[category] || 0) + amount;
      return totals;
    }, {});
  };

  const categoryTotals = calculateCategoryTotals();

  // Calculate overall total
  const grandTotal = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-700 mb-4">📊 Summary</h2>

      {/* Grand Total */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl px-4 py-4 mb-4 text-white">
        <p className="text-xs text-blue-100">Total Spent</p>
        <p className="text-2xl font-extrabold">{formatCurrency(grandTotal)}</p>
        <p className="text-xs text-blue-100 mt-1">{expenses.length} expenses recorded</p>
      </div>

      {/* Per Category Totals with progress bars */}
      {Object.keys(categoryTotals).length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-4">No expenses yet.</p>
      ) : (
        <ul className="space-y-3">
          {Object.entries(categoryTotals).map(([category, total]) => {
            const style = CATEGORY_STYLES[category];
            // Calculate percentage of total for progress bar
            const percentage = grandTotal > 0 ? (total / grandTotal) * 100 : 0;
            return (
              <li key={category}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-gray-600">
                    {style.icon} {category}
                  </span>
                  <span className="text-xs font-bold text-gray-700">
                    {formatCurrency(total)}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`${style.bar} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{percentage.toFixed(1)}% of total</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ExpenseSummary;