import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
  <nav className="bg-white border-b border-[#d7edf4] shadow-sm">

 <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

  <img
    src="/FinNova.png"
    alt="FinNova AI"
    className="h-14 object-contain"
  />

  <div className="flex items-center gap-8">

    <Link
      to="/dashboard"
      className="
        font-medium
        text-[#164350]
        hover:text-[#37a6c8]
        transition
      "
    >
      Dashboard
    </Link>

    <Link
      to="/add-transaction"
      className="
        font-medium
        text-[#164350]
        hover:text-[#37a6c8]
        transition
      "
    >
      Add Transaction
    </Link>

    <button
      onClick={handleLogout}
      className="
        bg-[#e41b50]
        hover:bg-[#b71540]
        text-white
        px-5
        py-2
        rounded-xl
        font-semibold
        transition
      "
    >
      Logout
    </button>

  </div>

</div>
</nav>

  );
}

export default Navbar;