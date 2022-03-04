import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/Routes";

const Dashboard = () => {
  return (
    <div>
      Dashboard
      <Link to={ROUTES.LOGIN}>Login</Link>
    </div>
  );
};

export default Dashboard;
