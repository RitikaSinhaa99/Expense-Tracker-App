// utils/aiHelper.js

export const generateSmartInsight = (transactions) => {
  if (!transactions || transactions.length === 0) return "No data to analyze yet.";

  const expenseTransactions = transactions.filter(t => t.transactionType === "expense");
  const incomeTransactions = transactions.filter(t => t.transactionType === "credit");

  if (expenseTransactions.length === 0 && incomeTransactions.length === 0)
    return "No transactions to analyze yet.";

  // Calculate total spent and earned
  const totalExpense = expenseTransactions.reduce((sum, t) => sum + Number(t.amount || 0), 0);
  const totalIncome = incomeTransactions.reduce((sum, t) => sum + Number(t.amount || 0), 0);

  // Find top spending category
  const categoryTotals = {};
  expenseTransactions.forEach((t) => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + Number(t.amount || 0);
  });

  const topCategory = Object.keys(categoryTotals).length
    ? Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]
    : null;

  // Avoid “Salary” being shown as a spending category
  if (!topCategory) {
    return "You're doing great! No major expenses detected yet 💰";
  }

  const [topCategoryName, topCategoryAmount] = topCategory;
  const topCategoryPercent = ((topCategoryAmount / totalExpense) * 100).toFixed(1);

  // Generate human-style insight
  let insight = `💡 Most of your spending (${topCategoryPercent}%) is on ${topCategoryName}.`;
  if (topCategoryPercent > 70) {
    insight += " You might try balancing it next month.";
  } else if (topCategoryPercent > 40) {
    insight += " This seems like a major area of focus.";
  } else {
    insight += " Your spending looks balanced overall!";
  }

  // Add simple AI-like tone
  if (totalExpense > totalIncome) {
    insight += " ⚠️ You're spending more than you earn — consider adjusting next month.";
  } else if (totalIncome > totalExpense * 2) {
    insight += " 🎯 Great job keeping expenses low compared to income!";
  }

  return ` ${insight}`;
};
