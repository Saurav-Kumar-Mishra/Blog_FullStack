import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NavBar = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.user.isLoggedIn);
  const [menuOpen, setMenuOpen] = useState(false);
  console.log(isLogged);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  function handleLogout() {
    dispatch(logout());
  }
  useEffect(() => {
    if (!isLogged) {
      toast.success("🦄 Logout successful", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/login");
    }
  }, [isLogged]);

  return (
    <nav className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="hidden sm:block">
            HOME
          </Link>
          <p className="hidden sm:block">Features</p>
          <p className="hidden sm:block">LifeStyle</p>
          <p className="hidden sm:block">Travel</p>
          <p className="hidden sm:block">Music</p>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="px-2 py-1 rounded-md outline-none bg-gray-200 text-black hidden sm:block"
          />

          {isLogged ? (
            <button
              onClick={handleLogout}
              className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600">
                Login
              </button>
            </Link>
          )}
          <Link
            to="/signUp"
            className={`bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 ${
              isLogged ? "hidden" : "visible"
            }`}
          >
            Sign Up
          </Link>
        </div>
        <div className="sm:hidden">
          <button onClick={toggleMenu}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="sm:hidden">
          <Link to="/" className="block py-2">
            HOME
          </Link>
          <p className="block py-2">Features</p>
          <p className="block py-2">LifeStyle</p>
          <p className="block py-2">Travel</p>
          <p className="block py-2">Music</p>
          <p className="block py-2">About Me</p>
          <p className="block py-2">Contact Me</p>
          <input
            type="text"
            placeholder="Search..."
            className="block px-2 py-1 rounded-md outline-none bg-gray-200 text-black my-2"
          />
          {isLogged ? (
            <button
              onClick={handleLogout}
              className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 w-full"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="block py-2">
              <button className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 w-full">
                Login
              </button>
            </Link>
          )}
          <Link
            to="/signUp"
            className={`block py-2 ${isLogged ? "hidden" : "visible"}`}
          >
            <button className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 w-full">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
