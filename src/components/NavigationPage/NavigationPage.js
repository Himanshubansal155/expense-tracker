import React from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../../constants/Routes";
import Dashboard from "../Dashboard/Dashboard";
import Login from "../Login/Login";

const NavigationPage = () => {
  return (
    <Routes >
      <Route path={`/`} element={<Dashboard />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path="*" element={<div>Not Found 404</div>} />
    </Routes>
  );
};

export default NavigationPage;
