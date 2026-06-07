import { useState } from "react";
import { registerUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await registerUser(formData);

      alert(
        "Registration Successful"
      );

      navigate("/");

    } catch (error) {

      console.error(error);

      alert("Registration Failed");
    }
  };

return (
  <div className="min-h-screen bg-[#f3f9ec] flex items-center justify-center p-6">

    <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-[#d7edf4] p-8">

      <div className="flex flex-col items-center mb-8">

        <img
          src="/FinNova.png"
          alt="FinNova AI"
          className="h-24 mb-4"
        />

        <h1 className="text-3xl font-bold text-[#164350]">
          Create Account
        </h1>

        <p className="text-slate-500 mt-2">
          Start your finance journey
        </p>

      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border border-[#d7edf4] rounded-xl"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border border-[#d7edf4] rounded-xl"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 border border-[#d7edf4] rounded-xl"
        />

        <button
          type="submit"
          className="
            w-full
            bg-[#86c23d]
            hover:bg-[#6b9b31]
            text-white
            py-3
            rounded-xl
            font-semibold
            transition
          "
        >
          Create Account
        </button>

      </form>

    </div>

  </div>
);
}

export default Register;