import { useState } from "react";
import {
  createGoal,
  deleteGoal,
  updateGoal
} from "../services/goalService";

function SavingsGoalSection({
  goals,
  onGoalCreated
}) {
  const [goalName, setGoalName] =
    useState("");

  const [targetAmount,
         setTargetAmount] =
    useState("");

  const [currentAmount,
         setCurrentAmount] =
    useState("");

  const [editingGoal,
         setEditingGoal] =
    useState(null);

  const [editGoalForm,
         setEditGoalForm] =
    useState({
      goalName: "",
      targetAmount: "",
      currentAmount: ""
    });

  const handleCreateGoal =
    async () => {

      try {

        await createGoal({
          goalName,
          targetAmount,
          currentAmount
        });

        setGoalName("");
        setTargetAmount("");
        setCurrentAmount("");

        onGoalCreated();

      } catch (error) {

        console.error(error);
      }
    };

  const handleDeleteGoal =
    async (id) => {

      const confirmed =
        window.confirm(
          "Delete this goal?"
        );

      if (!confirmed) return;

      try {

        await deleteGoal(id);

        onGoalCreated();

      } catch (error) {

        console.error(error);
      }
    };

  const handleEditGoal = (goal) => {

    setEditingGoal(goal);

    setEditGoalForm({
      goalName: goal.goalName,
      targetAmount: goal.targetAmount,
      currentAmount: goal.currentAmount
    });
  };

  const handleUpdateGoal =
    async () => {

      try {

        await updateGoal(
          editingGoal.id,
          editGoalForm
        );

        setEditingGoal(null);

        onGoalCreated();

      } catch (error) {

        console.error(error);
      }
    };

return (

  <div className="mt-10">


<h2 className="text-3xl font-bold text-[#164350] mb-6">
  Savings Goals
</h2>

<div
  className="
    bg-white
    border
    border-[#d7edf4]
    rounded-2xl
    p-6
    mb-6
    shadow-lg
  "
>
  <h3 className="text-xl font-semibold text-[#164350] mb-5">
    Create Goal
  </h3>

  <div className="grid md:grid-cols-3 gap-4">

    <input
      type="text"
      placeholder="Goal Name"
      value={goalName}
      onChange={(e) =>
        setGoalName(e.target.value)
      }
      className="
        bg-[#ebf6fa]
        border
        border-[#afdce9]
        rounded-xl
        px-4
        py-3
        text-slate-900
      "
    />

    <input
      type="number"
      placeholder="Target Amount"
      value={targetAmount}
      onChange={(e) =>
        setTargetAmount(e.target.value)
      }
      className="
        bg-[#ebf6fa]
        border
        border-[#afdce9]
        rounded-xl
        px-4
        py-3
        text-slate-900
      "
    />

    <input
      type="number"
      placeholder="Current Amount"
      value={currentAmount}
      onChange={(e) =>
        setCurrentAmount(e.target.value)
      }
      className="
        bg-[#ebf6fa]
        border
        border-[#afdce9]
        rounded-xl
        px-4
        py-3
        text-slate-900
      "
    />

  </div>

  <button
    onClick={handleCreateGoal}
    className="
      mt-5
      bg-[#37a6c8]
      hover:bg-[#2c85a0]
      px-5
      py-3
      rounded-xl
      text-white
      font-semibold
      transition
    "
  >
    Create Goal
  </button>

</div>

{editingGoal && (

  <div
    className="
      bg-white
      border
      border-[#ffd166]
      rounded-2xl
      p-6
      mb-6
      shadow-lg
    "
  >

    <h3 className="text-xl font-semibold text-[#cc8f00] mb-5">
      Edit Goal
    </h3>

    <div className="grid md:grid-cols-3 gap-4">

      <input
        type="text"
        value={editGoalForm.goalName}
        onChange={(e) =>
          setEditGoalForm({
            ...editGoalForm,
            goalName: e.target.value
          })
        }
        className="
          bg-[#ebf6fa]
          border
          border-[#afdce9]
          rounded-xl
          px-4
          py-3
          text-slate-900
        "
      />

      <input
        type="number"
        value={editGoalForm.targetAmount}
        onChange={(e) =>
          setEditGoalForm({
            ...editGoalForm,
            targetAmount: e.target.value
          })
        }
        className="
          bg-[#ebf6fa]
          border
          border-[#afdce9]
          rounded-xl
          px-4
          py-3
          text-slate-900
        "
      />

      <input
        type="number"
        value={editGoalForm.currentAmount}
        onChange={(e) =>
          setEditGoalForm({
            ...editGoalForm,
            currentAmount: e.target.value
          })
        }
        className="
          bg-[#ebf6fa]
          border
          border-[#afdce9]
          rounded-xl
          px-4
          py-3
          text-slate-900
        "
      />

    </div>

    <div className="flex gap-3 mt-5">

      <button
        onClick={handleUpdateGoal}
        className="
          bg-[#86c23d]
          hover:bg-[#6b9b31]
          px-5
          py-2
          rounded-xl
          text-white
        "
      >
        Update Goal
      </button>

      <button
        onClick={() =>
          setEditingGoal(null)
        }
        className="
          bg-[#d4afb9]
          hover:bg-[#c99ca8]
          px-5
          py-2
          rounded-xl
          text-white
        "
      >
        Cancel
      </button>

    </div>

  </div>

)}

{goals.length === 0 ? (

  <div
    className="
      bg-white
      border
      border-[#d7edf4]
      rounded-2xl
      p-6
      text-slate-500
      shadow-lg
    "
  >
    No Goals Found
  </div>

) : (

  goals.map((goal) => (

    <div
      key={goal.id}
      className="
        bg-white
        border
        border-[#d7edf4]
        rounded-2xl
        p-6
        mb-4
        shadow-lg
      "
    >

      <div className="flex justify-between items-center mb-4">

        <h3 className="text-2xl font-bold text-[#164350]">
          {goal.goalName}
        </h3>

        <span
          className="
            bg-[#ebf6fa]
            text-[#216478]
            px-3
            py-1
            rounded-full
            text-sm
            font-semibold
          "
        >
          {goal.progressPercentage}%
        </span>

      </div>

      <p className="text-slate-600 mb-4">
        ₹{goal.currentAmount} / ₹{goal.targetAmount}
      </p>

      <div
        className="
          w-full
          h-4
          bg-[#d7edf4]
          rounded-full
          overflow-hidden
          mb-5
        "
      >

        <div
          className="h-full bg-[#86c23d]"
          style={{
            width: `${Math.min(
              goal.progressPercentage,
              100
            )}%`
          }}
        />

      </div>

      <div className="flex gap-3">

        <button
          onClick={() =>
            handleEditGoal(goal)
          }
          className="
            px-4
            py-2
            rounded-xl
            bg-[#37a6c8]
            hover:bg-[#2c85a0]
            text-white
            transition
          "
        >
          Edit Goal
        </button>

        <button
          onClick={() =>
            handleDeleteGoal(goal.id)
          }
          className="
            px-4
            py-2
            rounded-xl
            bg-[#e41b50]
            hover:bg-[#b71540]
            text-white
            transition
          "
        >
          Delete Goal
        </button>

      </div>

    </div>

  ))
)}


  </div>
);

}

export default SavingsGoalSection;