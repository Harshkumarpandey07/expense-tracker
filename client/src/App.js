import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import { getExpenses } from './services/expenseService';

/**
 * App component - Root component that manages global state
 * and renders the appropriate page
 */
const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('list');

  /**
   * Fetches all expenses from the backend API
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

  // Fetch expenses once when the app first loads
  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-6 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              💰 Expense Tracker
            </h1>
            <p className="text-sm text-blue-200 mt-1">
              Track your daily expenses easily
            </p>
          </div>
          {/* Total spent badge in header */}
          <div className="bg-white bg-opacity-20 rounded-2xl px-5 py-3 text-right">
            <p className="text-xs text-blue-200">Total Spent</p>
            <p className="text-2xl font-bold">
              ₹{expenses
                .reduce((sum, e) => sum + e.amount, 0)
                .toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </header>

      {/* Main Page */}
      <HomePage
        expenses={expenses}
        loading={loading}
        error={error}
        onExpenseAdded={fetchExpenses}
        onExpenseDeleted={fetchExpenses}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default App;