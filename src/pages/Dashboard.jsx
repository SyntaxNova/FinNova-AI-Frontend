import { useEffect, useState } from "react";
import { getSummary } from "../services/analyticsService";
import CategoryPieChart from "../components/CategoryPieChart";
import { getCategories } from "../services/analyticsService";
import MonthlyTrendChart
from "../components/MonthlyTrendChart";
import { getAIInsights } from "../services/aiService";
import {
  getTransactions,
  deleteTransaction,
  updateTransaction
}
from "../services/transactionService";
import TransactionTable
from "../components/TransactionTable";
import Navbar from "../components/Navbar";

import SavingsGoalSection
from "../components/SavingsGoalSection";
import {
  generateFinancialReport
} from "../services/pdfService";

import {
  FaWallet,
  FaMoneyBillWave,
  FaPiggyBank
} from "react-icons/fa";

import {
  getGoals
}
from "../services/goalService";


import {
  getMonthlyTrend
} from "../services/analyticsService";

function Dashboard() {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    netSavings: 0,
  });
  const [transactions, setTransactions] =
  useState([]);
  const [categories, setCategories] = useState([]);
  const [monthlyData, setMonthlyData] =
  useState([]);
  const [insights, setInsights] = useState("");
  const [editingTransaction,
       setEditingTransaction] =
       useState(null);

const [editForm,
       setEditForm] =
       useState({
         amount: "",
         category: "",
         description: "",
         type: "",
         transactionDate: ""
       });
const [goals, setGoals] = useState([]);
const [loadingInsights,
       setLoadingInsights] =
       useState(false);
  

useEffect(() => {
  loadSummary();
  loadCategories();
  loadMonthlyTrend();
  loadTransactions();
  loadGoals();
}, []);

  const loadSummary = async () => {
    try {
      const response = await getSummary();

      setSummary(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const loadTransactions = async () => {
      try {

        const response =
          await getTransactions();

        setTransactions(response.data);

      } catch (error) {

        console.error(error);
      }
    };
      const loadCategories = async () => {

      try {

        const response =
          await getCategories();

        setCategories(response.data);

      } catch (error) {

        console.error(error);
      }
    };
    const loadMonthlyTrend = async () => {

      try {

        const response =
          await getMonthlyTrend();

        setMonthlyData(
          response.data
        );

      } catch (error) {

        console.error(error);
      }
    };

    const loadInsights = async () => {

      try {

        setLoadingInsights(true);

        const response =
          await getAIInsights();

        setInsights(
          response.data
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoadingInsights(false);

      }
    };

    const handleDelete = async (id) => {
      try {

        await deleteTransaction(id);

        loadTransactions();
        loadSummary();
        loadCategories();
        loadMonthlyTrend();

      } catch (error) {

        console.error(error);
      }
    };

    const handleEdit = (transaction) => {

      setEditingTransaction(
      transaction
        );

        setEditForm({
          amount: transaction.amount,
          category: transaction.category,
          description: transaction.description,
          type: transaction.type,
          transactionDate:
            transaction.transactionDate
        });
    };

    const handleUpdate = async () => {

      try {

        await updateTransaction(
          editingTransaction.id,
          editForm
        );

        alert(
          "Transaction Updated"
        );

        setEditingTransaction(
          null
    );

        loadTransactions();
        loadSummary();
        loadCategories();
        loadMonthlyTrend();
        loadGoals();

      } catch (error) {

        console.error(error);
      }
    };
    const loadGoals = async () => {

        try {

          const response =
            await getGoals();

          setGoals(
            response.data
          );

        } catch (error) {

          console.error(error);
        }
      };
  return (

<div className="min-h-screen bg-[#f3f9ec] text-slate-900">

  <Navbar />

  <div className="max-w-7xl mx-auto p-6">

    {/* Hero Section */}
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-10">

      <div>
        <h1 className="text-5xl font-extrabold text-[#164350]">
          FinNova AI
        </h1>

        <p className="text-slate-600 mt-2 text-lg">
          AI-Powered Personal Finance Tracker
        </p>
      </div>

      <button
        onClick={() =>
          generateFinancialReport(
            summary,
            transactions,
            goals
          )
        }
        className="
          bg-[#37a6c8]
          hover:bg-[#2c85a0]
          text-white
          px-8
          py-4
          rounded-2xl
          font-bold
          shadow-lg
          transition
        "
      >
        Download PDF Report
      </button>

    </div>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

      <div
        className="
          bg-white
          rounded-2xl
          p-6
          shadow-lg
          border
          border-[#d7edf4]
          hover:shadow-xl
          transition
        "
      >
        <p className="text-slate-500 font-medium">
          Total Income
        </p>

        <h2
          className="
            text-3xl
            md:text-4xl
            font-bold
            text-[#86c23d]
            mt-3
            break-words
          "
        >
          ₹{summary.totalIncome}
        </h2>
      </div>

      <div
        className="
          bg-white
          rounded-2xl
          p-6
          shadow-lg
          border
          border-[#f4a4b9]
          hover:shadow-xl
          transition
        "
      >
        <p className="text-slate-500 font-medium">
          Total Expense
        </p>

        <h2
          className="
            text-3xl
            md:text-4xl
            font-bold
            text-[#e41b50]
            mt-3
            break-words
          "
        >
          ₹{summary.totalExpense}
        </h2>
      </div>

      <div
        className="
          bg-white
          rounded-2xl
          p-6
          shadow-lg
          border
          border-[#afdce9]
          hover:shadow-xl
          transition
        "
      >
        <p className="text-slate-500 font-medium">
          Net Savings
        </p>

        <h2
          className="
            text-3xl
            md:text-4xl
            font-bold
            text-[#37a6c8]
            mt-3
            break-words
          "
        >
          ₹{summary.netSavings}
        </h2>
      </div>

    </div>

      <h2
        className="
          text-3xl
          font-bold
          text-[#164350]
          mb-6
        "
      >
        Analytics Overview
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

        <div className="bg-white p-6 rounded-xl border border-[#d7edf4]">

          <h2 className="text-xl font-semibold mb-4">
            Category Breakdown
          </h2>

          <CategoryPieChart
            data={categories}
          />

        </div>

        <div className="bg-white p-6 rounded-xl border border-[#d7edf4]">

          <h2 className="text-xl font-semibold mb-4">
            Monthly Trend
          </h2>

          <MonthlyTrendChart
            data={monthlyData}
          />

        </div>

      </div>
      <SavingsGoalSection
        goals={goals}
        onGoalCreated={loadGoals}
      />

      <TransactionTable
        transactions={transactions}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

    {editingTransaction && (

      <div className="mt-8 bg-white border border-[#d7edf4] rounded-2xl p-6 shadow-lg">

        <h2 className="text-2xl font-bold text-[#164350] mb-6">
          Edit Transaction
        </h2>

    <div className="grid md:grid-cols-2 gap-4">

      <input
        type="number"
        placeholder="Amount"
        value={editForm.amount}
        onChange={(e) =>
          setEditForm({
            ...editForm,
            amount: e.target.value
          })
        }
        className="
          p-3
          rounded-xl
          bg-[#ebf6fa]
          border
          border-[#afdce9]
          text-slate-900
        "
      />

 <input
        type="text"
        placeholder="Category"
        value={editForm.category}
        onChange={(e) =>
          setEditForm({
            ...editForm,
            category: e.target.value
          })
        }
        className="
          p-3
          rounded-xl
          bg-[#ebf6fa]
          border
          border-[#afdce9]
          text-slate-900
        "
      />

 <input
        type="text"
        placeholder="Description"
        value={editForm.description}
        onChange={(e) =>
          setEditForm({
            ...editForm,
            description: e.target.value
          })
        }
        className="
          p-3
          rounded-xl
          bg-[#ebf6fa]
          border
          border-[#afdce9]
          text-slate-900
          md:col-span-2
        "
      />

    </div>

    <div className="flex gap-3 mt-6">

     <button
        onClick={handleUpdate}
        className="
          bg-[#37a6c8]
          hover:bg-[#2c85a0]
          text-white
          px-5
          py-3
          rounded-xl
          font-semibold
          transition
        "
      >
        Update Transaction
      </button>

      <button
        onClick={() =>
          setEditingTransaction(null)
        }
        className="
          bg-[#d4afb9]
          hover:bg-[#c99ca8]
          text-white
          px-5
          py-3
          rounded-xl
          font-semibold
          transition
        "
      >
        Cancel
      </button>

    </div>

  </div>

)}

    <div className="mt-12 flex justify-center items-center">

  <button
    onClick={loadInsights}
    disabled={loadingInsights}
    className={`
      relative
      overflow-hidden
      px-8
      py-4
      rounded-xl
      font-semibold
      text-white
      transition-all
      duration-300
      shadow-lg
      ${
        loadingInsights
          ? "bg-[#996b00] cursor-not-allowed animate-pulse"
          : `
            bg-[#ffb300]
            hover:bg-[#cc8f00]
            hover:scale-105
            hover:shadow-2xl
            active:scale-95
          `
      }
    `}
  >

    {!loadingInsights && (
      <span
        className="
          absolute
          inset-0
          -translate-x-full
          hover:translate-x-full
          transition-transform
          duration-1000
          bg-gradient-to-r
          from-transparent
          via-white/30
          to-transparent
        "
      />
    )}

    <span className="relative flex items-center gap-2">

      {loadingInsights && (
        <div
          className="
            w-4
            h-4
            border-2
            border-white
            border-t-transparent
            rounded-full
            animate-spin
          "
        />
      )}

      {loadingInsights
        ? "Generating Insights..."
        : "✨ Generate AI Insights"}

    </span>

  </button>

</div>
      {insights && (

   <div className="mt-8 bg-white border border-[#ffe099] rounded-2xl p-6 shadow-lg">

    <h2 className="text-2xl font-bold text-[#cc8f00] mb-6">
      AI Financial Advisor
    </h2>

    <div
      className="
        text-slate-700
        whitespace-pre-line
        leading-8
      "
    >
      {insights}
    </div>

  </div>

)}
      </div>
<footer
  className="
    mt-20
    bg-white
    border-t
    border-[#d7edf4]
    py-8
  "
>

  <div
    className="
      max-w-7xl
      mx-auto
      px-6
      flex
      flex-col
      md:flex-row
      items-center
      justify-between
      gap-6
    "
  >

    <div className="flex items-center gap-4">

      <img
        src="/FinNova.png"
        alt="FinNova AI"
        className="h-16 object-contain"
      />

      <div>

        <h3 className="font-bold text-xl text-[#164350]">
          FinNova AI
        </h3>

        <p className="text-slate-600">
          AI-Powered Personal Finance Tracker
        </p>

      </div>

    </div>

    <div className="text-center">

      <p className="font-medium text-[#164350]">
        Developed by Atharva Pachpute
      </p>

      <div className="flex justify-center gap-6 mt-3">

        <a
          href="https://github.com/SyntaxNova"
          target="_blank"
          rel="noreferrer"
          className="
            text-[#37a6c8]
            font-semibold
            hover:text-[#164350]
            transition
          "
        >
          GitHub
        </a>

        <a
          href="https://www.linkedin.com/in/atharva-pachpute3/"
          target="_blank"
          rel="noreferrer"
          className="
            text-[#37a6c8]
            font-semibold
            hover:text-[#164350]
            transition
          "
        >
          LinkedIn
        </a>

      </div>

    </div>

  </div>

</footer>
    </div>
  );
}

export default Dashboard;