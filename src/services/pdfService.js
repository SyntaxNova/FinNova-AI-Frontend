import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateFinancialReport = (
  summary,
  transactions,
  goals
) => {

  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("Finance Tracker Report", 14, 20);

  doc.setFontSize(12);

  doc.text(
    `Total Income: ₹${summary.totalIncome}`,
    14,
    40
  );

  doc.text(
    `Total Expense: ₹${summary.totalExpense}`,
    14,
    50
  );

  doc.text(
    `Net Savings: ₹${summary.netSavings}`,
    14,
    60
  );

  autoTable(doc, {
    startY: 80,
    head: [[
      "Category",
      "Type",
      "Amount",
      "Date"
    ]],
    body: transactions.map(t => [
      t.category,
      t.type,
      `₹${t.amount}`,
      t.transactionDate
    ])
  });

  let finalY =
    doc.lastAutoTable.finalY + 20;

  doc.text(
    "Savings Goals",
    14,
    finalY
  );

  autoTable(doc, {
    startY: finalY + 10,
    head: [[
      "Goal",
      "Current",
      "Target",
      "Progress"
    ]],
    body: goals.map(goal => [
      goal.goalName,
      `₹${goal.currentAmount}`,
      `₹${goal.targetAmount}`,
      `${goal.progressPercentage}%`
    ])
  });

  doc.save("Finance-Report.pdf");
};