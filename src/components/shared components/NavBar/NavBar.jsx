import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../../constants/Routes";
import "./Navbar.scss";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const NavBar = () => {
  let width = window.screen.width;
  const [navOpen, setNavOpen] = useState(false);
  useEffect(() => {
    if (width > 768) {
      setNavOpen(false);
    }
  }, [width]);
  return (
    <div className="px-5 py-3 shadow-lg">
      <div className="flex justify-between items-center">
        <div className="p-2 flex items-end">
          <img src="/logo.png" alt="Logo" height={50} width={50} />
          <span className="title">budget-shaper</span>
        </div>
        <div className="inline-block md:hidden">
          <span onClick={() => setNavOpen(!navOpen)}>
            <MenuOutlinedIcon />
          </span>
        </div>
        <div className="hidden md:flex space-x-3">
          <NavLink
            to={ROUTES.WELCOME}
            className={({ isActive }) =>
              isActive ? "button button-active" : "button"
            }
          >
            Home
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
      {navOpen && (
        <div className="flex flex-col space-y-3 mt-3">
          <NavLink
            to={ROUTES.WELCOME}
            className={({ isActive }) =>
              isActive ? "button button-active" : "button"
            }
          >
            Home
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
      )}
    </div>
  );
};

export default NavBar;
