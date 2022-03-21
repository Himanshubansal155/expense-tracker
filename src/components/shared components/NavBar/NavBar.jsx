import React from "react";
import "./Navbar.scss";

const NavBar = () => {
  return (
    <div className="flex justify-between p-5 items-center">
      <div className="p-2 flex items-end">
        <img src="/logo.png" alt="Logo" height={50} width={50} />
        <span className="title">budget-shaper</span>
      </div>
      <div>
        <ul className="flex space-x-3">
          <li className="button">Home</li>
          <li className="button">How it works</li>
          <li className="button">Register</li>
          <li className="py-1 px-5 hover:bg-yellow-400 shadow-lg bg-yellow-500 bg-opacity-80 text-white rounded-xl">
            Login
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
