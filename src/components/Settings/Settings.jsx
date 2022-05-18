import React from "react";
import SettingsCard from "./SettingsCard/SettingsCard";
import ErrorIcon from "@mui/icons-material/Error";
import ButtonField from "../shared components/Button/Button";

const Settings = () => {
  return (
    <div>
      <div className="flex flex-col p-10 space-y-5">
        <SettingsCard title={"Change Username"}>
          <div>New Username</div>
        </SettingsCard>
        <SettingsCard title={"Change Password"}>
          <div>New password</div>
        </SettingsCard>
        <SettingsCard title={"Change Email"}>
          <div>New Email</div>
        </SettingsCard>
        <SettingsCard title={"Change Phone Number"}>
          <div>New Phone Number</div>
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
              >
                Yes
              </ButtonField>
              <ButtonField
                buttonstyle={{ borderColor: "green", color: "green" }}
                variant={"outlined"}
              >
                No
              </ButtonField>
            </div>
          </div>
        </SettingsCard>
      </div>
    </div>
  );
};

export default Settings;
