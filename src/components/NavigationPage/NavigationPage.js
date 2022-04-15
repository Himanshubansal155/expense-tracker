import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import { LOGGED_OUT } from "../../constants/action.constants";
import { ROUTES } from "../../constants/Routes";
import Category from "../Category/Category";
import Budget from "../Budget/Budget";
import Dashboard from "../Dashboard/Dashboard";
import MiniDrawer from "../Dashboard/Drawer/Drawer";
import Expenses from "../Expenses/Expenses";
import HomePageLazy from "../Home/HomePage.lazy";
import LoginLazy from "../Login/Login.lazy";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Profile from "../Profile/Profile";
import Settings from "../Settings/Settings";
import SignUpLazy from "../Signup/SignUp.lazy";
import Speechly from "../Speechly/Speechly";
import Trash from "../Trash/Trash";
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
            <Route path={ROUTES.WELCOME} element={<HomePageLazy />} />
            <Route path={ROUTES.LOGIN} element={<LoginLazy />} />
            <Route path={ROUTES.SIGNUP} element={<SignUpLazy />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </>
      ) : (
        <MiniDrawer>
          <Routes>
            <Route
              path={`/`}
              element={<Navigate to={ROUTES.DASHBOARD} replace />}
            />
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.EXPENSES} element={<Expenses />} />
            <Route path={ROUTES.BUDGET} element={<Budget />} />
            <Route path={ROUTES.CATEGORY} element={<Category />} />
            <Route path={ROUTES.SETTINGS} element={<Settings />} />
            <Route path={ROUTES.TRASH} element={<Trash />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </MiniDrawer>
      )}
    </>
  );
};

export default NavigationPage;
