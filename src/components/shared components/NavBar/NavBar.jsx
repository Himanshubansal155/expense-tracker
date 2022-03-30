import React from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../../constants/Routes";
import "./Navbar.scss";

const NavBar = () => {
  return (
    <div>
      <div className="flex justify-between px-5 py-3 items-center shadow-md">
        <div className="p-2 flex items-end">
          <img src="/logo.png" alt="Logo" height={50} width={50} />
          <span className="title">budget-shaper</span>
        </div>
        <div className="flex space-x-3">
          <NavLink
            to={ROUTES.WELCOME}
            className={({ isActive }) =>
              isActive ? "button button-active" : "button"
            }
          >
            Home
          </NavLink>
          <NavLink
            to={ROUTES.DASHBOARD}
            className={({ isActive }) =>
              isActive ? "button button-active" : "button"
            }
          >
            How it works
          </NavLink>
          <NavLink
            to={ROUTES.SIGNUP}
            className={({ isActive }) =>
              isActive ? "button button-active" : "button"
            }
          >
            Register
          </NavLink>
          <NavLink
            to={ROUTES.LOGIN}
            className={({ isActive }) =>
              isActive ? "button button-active" : "button"
            }
          >
            Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
