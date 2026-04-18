# 💰 Expense Tracker

A full-stack expense tracking application built with React, Node.js, Express, and MongoDB Atlas.

## 🔗 Live Demo
- **Frontend:** https://expense-tracker-frontend-sffp.onrender.com
- **Backend API:** https://expense-tracker-p576.onrender.com/api/expenses

## ✨ Features
- Add expenses with title, amount, category and date
- View and filter expenses by category and date range
- Summary of total spending per category with progress bars
- Interactive Bar and Pie charts for visualization
- Color coded categories for better UX
- Fully responsive design for mobile and desktop

## 🛠️ Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Tailwind CSS, Recharts, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Deployment | Render (Frontend + Backend) |
| Version Control | Git, GitHub |

## 📁 Project Structure

expense-tracker/
├── client/                    # React frontend
│   └── src/
│       ├── components/        # Reusable UI components
│       │   ├── ExpenseForm.js
│       │   ├── ExpenseList.js
│       │   ├── ExpenseSummary.js
│       │   └── ChartComponent.js
│       ├── pages/             # Page level views
│       │   └── HomePage.js
│       ├── services/          # API call functions
│       │   └── expenseService.js
│       ├── utils/             # Helper functions
│       │   └── formatCurrency.js
│       └── assets/            # Images and styles
└── server/                    # Node.js backend
├── controllers/           # Business logic
│   └── expenseController.js
├── models/                # MongoDB schemas
│   └── Expense.js
├── routes/                # API route definitions
│   └── expenseRoutes.js
└── index.js               # Server entry point
