import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { User } from "./AppContextProvider";

const NavBar = () => {
  const { isLogged } = useContext(User);
  
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/">HOME</Link>
          <p className="">Features</p>
          <p className="">LifeStyle</p>
          <p className="">Travel</p>
          <p className="">Music</p>
        </div>
        <div className="flex items-center space-x-4">
          <p className="">About Me</p>
          <p className="">Contact Me</p>
          <input
            type="text"
            placeholder="Search..."
            className="px-2 py-1 rounded-md outline-none bg-gray-200 text-black"
          />

          {isLogged ? (
            <Link to="/logout">
              <button className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600">
                Logout
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600">
                Login
              </button>
            </Link>
          )}
          <Link to="/signUp"  className={`bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 
              ${isLogged?'hidden':'visible'}`}>
              Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
