import React, { useState } from "react";
import SettingsCard from "./SettingsCard/SettingsCard";
import ErrorIcon from "@mui/icons-material/Error";
import ButtonField from "../shared components/Button/Button";
import Input from "./../shared components/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { userStoreSelector } from "../../store/stores.selector";
import {
  userDeleteAction,
  userUpdateAction,
  userVerifyAction,
} from "../../actions/auth.actions";
import toastService from "../../services/toastService";
import { CircularProgress } from "@mui/material";

const Settings = () => {
  const user = useSelector(userStoreSelector);
  const dispatch = useDispatch();
  const [verifiedPassword, setVerifiedPassword] = useState("");
  const [form, setForm] = useState({
    email: user.data.email || "",
    password: "",
    phone: user.data.phone || "",
    name: user.data.name || "",
    confirmPassword: "",
  });
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const handleDelete = () => {
    dispatch(userDeleteAction);
  };
  const handleSubmit = (type) => {
    if (type === "password") {
      if (form.password === form.confirmPassword) {
      } else {
        toastService.showErrorToast("Both Passwords Not same");
      }
    } else {
      try {
        dispatch(userUpdateAction({ [type]: form[type] }));
      } catch (error) {
        toastService.showErrorToast(error);
      }
    }
  };
  const handleVerifyPassword = () => {
    try {
      dispatch(userVerifyAction(verifiedPassword));
    } catch (error) {
      toastService.showErrorToast(error);
    }
  };
  const SaveButton = (type, title = "Save") => (
    <div className="flex justify-center">
      <ButtonField
        className="bg-darkPrimary mx-auto mt-3 w-80"
        onClick={() => handleSubmit(type)}
      >
        {title}
        {user.isLoading && (
          <CircularProgress size={20} color="inherit" className="ml-2" />
        )}
      </ButtonField>
    </div>
  );
  return (
    <div>
      {user.isVerified ? (
        <div className="flex flex-col p-10 space-y-5">
          <SettingsCard title={"Change Username"} subTitle={user.data.name}>
            <div className="w-full px-5">
              <Input
                label="Enter New Username"
                onChange={handleChange}
                name="name"
                value={form.name}
              />
              {SaveButton("name")}
            </div>
          </SettingsCard>
          <SettingsCard title={"Change Email"} subTitle={user.data.email}>
            <div className="w-full px-5">
              <Input
                label="Enter New Email"
                onChange={handleChange}
                name="email"
                value={form.email}
              />
              {SaveButton("email")}
            </div>
          </SettingsCard>
          <SettingsCard title={"Change Password"}>
            <div className="w-full px-5">
              <Input
                type="password"
                label="New Password"
                onChange={handleChange}
                name="password"
              />
              <Input
                label="Confirm Password"
                onChange={handleChange}
                name="confirmPassword"
              />
              {SaveButton("password")}
            </div>
          </SettingsCard>
          <SettingsCard title={"Delete User"}>
            <div className="flex justify-between w-full">
              <div className="flex">
                <ErrorIcon className="text-yellow-900 mr-2" />
                <div className="text-yellow-900">
                  Are You Sure want to delete User?
                </div>
              </div>
              <div className="flex space-x-4">
                <ButtonField
                  buttonstyle={{ backgroundColor: "red", opacity: 0.5 }}
                  hoverstyle={{ backgroundColor: "red", opacity: 1 }}
                  onClick={handleDelete}
                >
                  Yes
                  {user.isLoading && (
                    <CircularProgress size={20} color="inherit" />
                  )}
                </ButtonField>
              </div>
            </div>
          </SettingsCard>
        </div>
      ) : (
        <div className="pt-10 px-5">
          <div className="w-full text-center">
            Verify Password To Open Settings
          </div>
          <div className="w-full pt-10">
            <Input
              type="password"
              label="Password"
              onChange={(event) => setVerifiedPassword(event.target.value)}
              name="password"
              value={verifiedPassword}
            />
            <div className="flex justify-center">
              <ButtonField
                className="bg-darkPrimary mx-auto mt-3 w-80"
                onClick={handleVerifyPassword}
              >
                Save
                {user.isLoading && (
                  <CircularProgress size={20} color="inherit" />
                )}
              </ButtonField>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
