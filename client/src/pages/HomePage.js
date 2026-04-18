import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import ExpenseSummary from '../components/ExpenseSummary';
import ChartComponent from '../components/ChartComponent';

/**
 * HomePage component - Main page view of the Expense Tracker
 * @param {Array} expenses - List of all expenses
 * @param {boolean} loading - Loading state
 * @param {string} error - Error message if any
 * @param {Function} onExpenseAdded - Callback after adding expense
 * @param {Function} onExpenseDeleted - Callback after deleting expense
 * @param {string} activeTab - Currently active tab (list or chart)
 * @param {Function} setActiveTab - Function to switch tabs
 */
const HomePage = ({
  expenses,
  loading,
  error,
  onExpenseAdded,
  onExpenseDeleted,
  activeTab,
  setActiveTab,
}) => {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-1 space-y-6">
            <ExpenseForm onExpenseAdded={onExpenseAdded} />
            <ExpenseSummary expenses={expenses} />
          </div>

          {/* Right Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Tab switcher */}
            <div className="flex bg-white rounded-xl shadow-sm p-1 gap-1">
              <button
                onClick={() => setActiveTab('list')}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition duration-200 ${
                  activeTab === 'list'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-gray-500 hover:text-blue-600'
                }`}
              >
                📋 Expenses
              </button>
              <button
                onClick={() => setActiveTab('chart')}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition duration-200 ${
                  activeTab === 'chart'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-gray-500 hover:text-blue-600'
                }`}
              >
                📊 Chart
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'list' ? (
              <ExpenseList
                expenses={expenses}
                onExpenseDeleted={onExpenseDeleted}
              />
            ) : (
              <ChartComponent expenses={expenses} />
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default HomePage;