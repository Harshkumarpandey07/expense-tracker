import { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import ChartComponent from './components/ChartComponent';
import { getExpenses } from './services/expenseService';

/**
 * App component - Root component that manages expense state
 */
const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('list');

  /**
   * Fetches all expenses from the backend
   */
  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const data = await getExpenses();
      setExpenses(data);
    } catch (err) {
      setError('Failed to fetch expenses. Make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch expenses on component mount
  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-6 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">💰 Expense Tracker</h1>
            <p className="text-sm text-blue-200 mt-1">Track your daily expenses easily</p>
          </div>
          {/* Total badge in header */}
          <div className="bg-white bg-opacity-20 rounded-2xl px-5 py-3 text-right">
            <p className="text-xs text-blue-200">Total Spent</p>
            <p className="text-2xl font-bold">
              ₹{expenses.reduce((sum, e) => sum + e.amount, 0).toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
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
              <ExpenseForm onExpenseAdded={fetchExpenses} />
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
                  onExpenseDeleted={fetchExpenses}
                />
              ) : (
                <ChartComponent expenses={expenses} />
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;