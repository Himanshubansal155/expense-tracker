import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ME_LOGOUT } from "../../constants/action.constants";
import { ROUTES } from "../../constants/Routes";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div>
      Dashboard
      <Link to={ROUTES.LOGIN}>Login</Link>
      <button
        onClick={() => {
          dispatch({ type: ME_LOGOUT });
          navigate("/");
        }}
      >
        LOGOUT
      </button>
    </div>
  );
};

export default Dashboard;
