import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-[#d7edf4] shadow-sm">

      <div className="max-w-7xl mx-auto px-6 py-4">

        <div className="flex items-center justify-between">

          <img
            src="/FinNova.png"
            alt="FinNova AI"
            className="h-14 object-contain"
          />

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">

            <Link
              to="/dashboard"
              className="font-medium text-[#164350] hover:text-[#37a6c8] transition"
            >
              Dashboard
            </Link>

            <Link
              to="/add-transaction"
              className="font-medium text-[#164350] hover:text-[#37a6c8] transition"
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

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}
          </button>

        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-4 border-t pt-4">

            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="font-medium text-[#164350]"
            >
              Dashboard
            </Link>

            <Link
              to="/add-transaction"
              onClick={() => setIsOpen(false)}
              className="font-medium text-[#164350]"
            >
              Add Transaction
            </Link>

            <button
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="
                bg-[#e41b50]
                text-white
                py-2
                rounded-xl
                font-semibold
              "
            >
              Logout
            </button>

          </div>
        )}

      </div>

    </nav>
  );
}

export default Navbar;