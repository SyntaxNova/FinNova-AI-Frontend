function TransactionTable({
  transactions,
  onDelete,
  onEdit
}) {

return (

  <div className="mt-10">

<div
  className="
    bg-white
    border
    border-[#d7edf4]
    rounded-2xl
    p-6
    shadow-lg
  "
>

  <h2 className="text-3xl font-bold text-[#164350] mb-6">
    Transactions
  </h2>

  <div className="overflow-x-auto">

    <table className="w-full text-left">

      <thead>

        <tr className="border-b border-[#d7edf4]">

          <th className="py-4 text-[#216478] font-semibold">
            Category
          </th>

          <th className="py-4 text-[#216478] font-semibold">
            Type
          </th>

          <th className="py-4 text-[#216478] font-semibold">
            Amount
          </th>

          <th className="py-4 text-[#216478] font-semibold">
            Date
          </th>

          <th className="py-4 text-[#216478] font-semibold">
            Actions
          </th>

        </tr>

      </thead>

      <tbody>

        {transactions.map((transaction) => (

          <tr
            key={transaction.id}
            className="
              border-b
              border-[#ebf6fa]
              hover:bg-[#f6f9f3]
              transition
            "
          >

            <td className="py-4 text-slate-700 font-medium">
              {transaction.category}
            </td>

            <td className="py-4">

              <span
                className={
                  transaction.type === "INCOME"
                    ? `
                      px-3 py-1
                      rounded-full
                      text-sm
                      font-semibold
                      bg-[#e7f3d8]
                      text-[#507425]
                    `
                    : `
                      px-3 py-1
                      rounded-full
                      text-sm
                      font-semibold
                      bg-[#fce8ee]
                      text-[#b71540]
                    `
                }
              >
                {transaction.type}
              </span>

            </td>

            <td
              className={
                transaction.type === "INCOME"
                  ? "py-4 text-[#86c23d] font-bold"
                  : "py-4 text-[#e41b50] font-bold"
              }
            >
              ₹{transaction.amount}
            </td>

            <td className="py-4 text-slate-600">
              {transaction.transactionDate}
            </td>

            <td className="py-4">

              <div className="flex gap-3">

                <button
                  onClick={() =>
                    onEdit(transaction)
                  }
                  className="
                    px-4
                    py-2
                    rounded-xl
                    bg-[#37a6c8]
                    hover:bg-[#2c85a0]
                    text-white
                    font-medium
                    transition
                  "
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    onDelete(transaction.id)
                  }
                  className="
                    px-4
                    py-2
                    rounded-xl
                    bg-[#e41b50]
                    hover:bg-[#b71540]
                    text-white
                    font-medium
                    transition
                  "
                >
                  Delete
                </button>

              </div>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>

  </div>
);
}

export default TransactionTable;