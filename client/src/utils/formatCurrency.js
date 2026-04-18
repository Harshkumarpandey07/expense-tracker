/**
 * Formats a number as Indian Rupee currency string
 * @param {number} amount - The amount to format
 * @returns {string} - Formatted currency string (e.g. ₹1,000.00)
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};