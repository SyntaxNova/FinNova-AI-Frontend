import { useState } from "react";
import { loginUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

      const response =
        await loginUser(formData);

      const token =
        response.data.token;

      localStorage.setItem(
        "token",
        token
      );

      navigate("/dashboard");

    } catch (error) {

      console.error(error);

      alert("Login Failed");
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
          Welcome Back
        </h1>

        <p className="text-slate-500 mt-2">
          Login to FinNova AI
        </p>

      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

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
            bg-[#37a6c8]
            hover:bg-[#2c85a0]
            text-white
            py-3
            rounded-xl
            font-semibold
            transition
          "
        >
          Login
        </button>

      </form>

    </div>

  </div>
);
}

export default Login;