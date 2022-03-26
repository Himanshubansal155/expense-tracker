import React, { useState } from "react";
import SignupForm from "./SignupForm";
import OTPInput, { ResendOTP } from "otp-input-react";
import ButtonField from "../shared components/Button/Button";
import { CircularProgress } from "@mui/material";
import { COLORS } from "../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import toastService from "./../../services/toastService";
import { userSignUpAction } from "../../actions/auth.actions";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [form, setForm] = useState(null);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otp, setotp] = useState(null);
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const signInOtp = (values) => {
    if (!values) {
      setForm(null);
      return;
    }
    setForm(values);
    try {
      const verifier = new RecaptchaVerifier(
        "recaptcha-container",
        { size: "invisible" },
        auth
      );
      setRecaptchaVerifier(verifier);
      signInCall(values, verifier);
    } catch (error) {
      toastService.showErrorToast(error.message);
      console.log(error);
    }
  };
  const signInCall = (values, verifier) => {
    console.log(auth, verifier || recaptchaVerifier);
    signInWithPhoneNumber(
      auth,
      `+91${values.phone}`,
      verifier || recaptchaVerifier
    )
      .then((confirmationResult) => {
        setConfirmationResult(confirmationResult);
      })
      .catch((error) => {
        setForm(null);
        toastService.showErrorToast(error.message);
        console.log(error);
      });
  };
  const verifyAndSignUp = () => {
    if (confirmationResult) {
      confirmationResult
        .confirm(otp)
        .then((result) => {
          dispatch(userSignUpAction(form, navigate));
        })
        .catch((error) => {
          toastService.showErrorToast(error.message);
          console.log(error.message);
        });
    }
  };
  return (
    <>
      <div className="h-screen bg-white flex flex-col md:flex-row">
        <div className="h-screen bg-purple-700 md:w-2/5 flex items-end justify-center md:justify-end md:items-start">
          <div className="h-3/4 w-3/4 bg-purple-700 md:mt-20 shadow-2xl"> </div>
        </div>

        <div className="h-screen bg-white md:w-3/5 ">
          <div id="recaptcha-container"></div>
          <div className="md:h-3/4 w-3/4 md:float-left mx-auto md:mx-0 bg-white py-4 sm:p-10 md:mt-20 shadow-2xl">
            {!form ? (
              <SignupForm onSubmit={signInOtp} />
            ) : (
              <div className="flex flex-col items-center h-full justify-center space-y-5">
                <h1>Verify Phone Number</h1>
                <div className="flex flex-col w-full items-center">
                  <OTPInput
                    value={otp}
                    onChange={setotp}
                    autoFocus
                    OTPLength={6}
                    otpType="number"
                    className="border border-gray-100"
                    placeholder={0}
                  />
                  <ResendOTP
                    onResendClick={() => signInCall(form)}
                    onTimerComplete={() => setConfirmationResult(null)}
                  />

                  <div className="form-group mt-10 flex justify-between">
                    <ButtonField
                      buttonstyle={{
                        backgroundColor: COLORS.primary,
                        borderRadius: 20,
                        color: "white",
                        fontWeight: "bold",
                        paddingLeft: 40,
                        paddingRight: 40,
                        paddingTop: 8,
                        paddingBottom: 8,
                      }}
                      hoverstyle={{ backgroundColor: COLORS.darkPrimary }}
                      onClick={verifyAndSignUp}
                    >
                      Verify
                      {user.isLoading && (
                        <CircularProgress size={20} color="inherit" />
                      )}
                    </ButtonField>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
