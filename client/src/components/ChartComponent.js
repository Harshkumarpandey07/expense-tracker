import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { useState } from 'react';


const CATEGORY_COLORS = {
  Food: '#4ade80',
  Transport: '#60a5fa',
  Shopping: '#c084fc',
  Health: '#f87171',
  Entertainment: '#fbbf24',
  Other: '#94a3b8',
};

/**
 * ChartComponent - Displays bar and pie charts of expenses per category
 * @param {Array} expenses - List of expense objects
 */
const ChartComponent = ({ expenses }) => {
  const [chartType, setChartType] = useState('bar');

  /**
   * Transforms expenses into chart friendly data format
   * @returns {Array} - Array of { category, total } objects
   */
  const getChartData = () => {
    const totals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    return Object.entries(totals).map(([category, total]) => ({
      category,
      total,
      color: CATEGORY_COLORS[category],
    }));
  };

  const chartData = getChartData();

  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 text-center">
        <p className="text-4xl mb-2">📊</p>
        <p className="text-gray-400 text-sm">Add expenses to see charts</p>
      </div>
    );
  }

  /**
   * Custom tooltip formatter for currency display
   */
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-lg">
          <p className="text-sm font-bold text-gray-700">{payload[0].payload.category}</p>
          <p className="text-sm text-blue-600">
            ₹{payload[0].value.toLocaleString('en-IN')}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-700">📈 Spending Chart</h2>

        {/* Chart type toggle */}
        <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
          <button
            onClick={() => setChartType('bar')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition duration-200 ${
              chartType === 'bar'
                ? 'bg-white text-blue-600 shadow'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Bar
          </button>
          <button
            onClick={() => setChartType('pie')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition duration-200 ${
              chartType === 'pie'
                ? 'bg-white text-blue-600 shadow'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Pie
          </button>
        </div>
      </div>

      {/* Bar Chart */}
      {chartType === 'bar' && (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="category" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="total" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}

      {/* Pie Chart */}
      {chartType === 'pie' && (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="total"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ category, percent }) =>
                `${category} ${(percent * 100).toFixed(0)}%`
              }
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ChartComponent;