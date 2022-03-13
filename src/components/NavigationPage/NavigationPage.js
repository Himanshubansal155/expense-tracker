import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { LOGGED_OUT } from "../../constants/action.constants";
import { ROUTES } from "../../constants/Routes";
import Dashboard from "../Dashboard/Dashboard";
import HomePage from "../Home/HomePage";
import Login from "../Login/Login";
import Speechly from "../Speechly/Speechly";

const NavigationPage = () => {
  const loginStatus = useSelector((state) => state.user?.loginStatus);
  return (
    <>
      <Speechly />
      {loginStatus === LOGGED_OUT ? (
        <Routes>
          <Route path={`/`} element={<HomePage />} />
          <Route path={`/dashboard`} element={<HomePage />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path="*" element={<div>Not Found 404</div>} />
        </Routes>
      ) : (
        <Routes>
          <Route path={`/`} element={<Dashboard />} />
          <Route path={`/dashboard`} element={<Dashboard />} />
          <Route path="*" element={<div>Not Found 404</div>} />
        </Routes>
      )}
    </>
  );
};

export default NavigationPage;
