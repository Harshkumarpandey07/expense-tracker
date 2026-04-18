import axios from 'axios';

// Base URL for the expense API
const API_URL = 'http://localhost:5000/api/expenses';

/**
 * Fetches all expenses with optional filters
 * @param {Object} filters - Optional filters (category, startDate, endDate)
 * @returns {Promise} - List of expenses
 */
export const getExpenses = async (filters = {}) => {
  const response = await axios.get(API_URL, { params: filters });
  return response.data;
};

/**
 * Adds a new expense
 * @param {Object} expenseData - The expense data (title, amount, category, date)
 * @returns {Promise} - The saved expense
 */
export const addExpense = async (expenseData) => {
  const response = await axios.post(API_URL, expenseData);
  return response.data;
};

/**
 * Deletes an expense by ID
 * @param {string} id - The expense ID
 * @returns {Promise} - Deletion confirmation
 */
export const deleteExpense = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};