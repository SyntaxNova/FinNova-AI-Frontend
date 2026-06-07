import { useState } from "react";
import { createTransaction } from "../services/transactionService";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function AddTransaction() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    type: "EXPENSE",
    description: "",
    transactionDate: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await createTransaction(formData);

      alert("Transaction Added Successfully");

      navigate("/dashboard");

    } catch (error) {

      console.error(error);

      alert("Failed to Add Transaction");
    }
  };

return (

  <div className="min-h-screen bg-[#f3f9ec]">

    <Navbar />

    <div className="max-w-2xl mx-auto p-6">

      <div className="flex items-center gap-4 mb-8">

        <img
          src="/logo.png"
          alt="FinNova AI"
          className="h-20 object-contain"
        />

        <div>

          <h1 className="text-4xl font-bold text-[#164350]">
            Add Transaction
          </h1>

          <p className="text-slate-600">
            Track your income and expenses
          </p>

        </div>

      </div>

      <div
        className="
          bg-white
          border
          border-[#d7edf4]
          rounded-2xl
          p-8
          shadow-lg
        "
      >

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="block mb-2 text-[#164350] font-medium">
              Amount
            </label>

            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={handleChange}
              className="
                w-full
                p-3
                rounded-xl
                border
                border-[#d7edf4]
                bg-white
                focus:outline-none
                focus:border-[#37a6c8]
              "
            />

          </div>

          <div>

            <label className="block mb-2 text-[#164350] font-medium">
              Category
            </label>

            <input
              type="text"
              name="category"
              placeholder="Food, Salary, Travel..."
              value={formData.category}
              onChange={handleChange}
              className="
                w-full
                p-3
                rounded-xl
                border
                border-[#d7edf4]
                bg-white
                focus:outline-none
                focus:border-[#37a6c8]
              "
            />

          </div>

          <div>

            <label className="block mb-2 text-[#164350] font-medium">
              Description
            </label>

            <input
              type="text"
              name="description"
              placeholder="Optional description"
              value={formData.description}
              onChange={handleChange}
              className="
                w-full
                p-3
                rounded-xl
                border
                border-[#d7edf4]
                bg-white
                focus:outline-none
                focus:border-[#37a6c8]
              "
            />

          </div>

          <div>

            <label className="block mb-2 text-[#164350] font-medium">
              Transaction Type
            </label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="
                w-full
                p-3
                rounded-xl
                border
                border-[#d7edf4]
                bg-white
                focus:outline-none
                focus:border-[#37a6c8]
              "
            >

              <option value="INCOME">
                INCOME
              </option>

              <option value="EXPENSE">
                EXPENSE
              </option>

            </select>

          </div>

          <div>

            <label className="block mb-2 text-[#164350] font-medium">
              Transaction Date
            </label>

            <input
              type="date"
              name="transactionDate"
              value={formData.transactionDate}
              onChange={handleChange}
              className="
                w-full
                p-3
                rounded-xl
                border
                border-[#d7edf4]
                bg-white
                focus:outline-none
                focus:border-[#37a6c8]
              "
            />

          </div>

          <button
            type="submit"
            className="
              w-full
              py-4
              rounded-xl
              bg-[#37a6c8]
              hover:bg-[#2c85a0]
              text-white
              font-semibold
              shadow-lg
              transition
            "
          >
            Add Transaction
          </button>

        </form>

      </div>

    </div>

  </div>

);
}

export default AddTransaction;