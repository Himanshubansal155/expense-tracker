import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import { LOGGED_OUT } from "../../constants/action.constants";
import { ROUTES } from "../../constants/Routes";
import Dashboard from "../Dashboard/Dashboard";
import HomePage from "../Home/HomePage";
import Login from "../Login/Login";
import SignUp from "../signup/signup";
import Speechly from "../Speechly/Speechly";
import NavBar from "./../shared components/NavBar/NavBar";

const NavigationPage = () => {
  const loginStatus = useSelector((state) => state.user?.loginStatus);
  return (
    <>
      <Speechly />
      {loginStatus === LOGGED_OUT ? (
        <>
          <NavBar />
          <Routes>
            <Route
              path={`/`}
              element={<Navigate to={ROUTES.WELCOME} replace />}
            />
            <Route path={ROUTES.WELCOME} element={<HomePage />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.SIGNUP} element={<SignUp />} />
            <Route path="*" element={<div>Not Found 404</div>} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path={`/`} element={<Dashboard />} />
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path="*" element={<div>Not Found 404</div>} />
        </Routes>
      )}
    </>
  );
};

export default NavigationPage;
