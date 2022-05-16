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
import toastService from "../../services/toastService";
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
    signInWithPhoneNumber(
      auth,
      `+91${values.phone}`,
      verifier || recaptchaVerifier
    )
      .then((confirmationResult) => {
        setConfirmationResult(confirmationResult);
      })
      .catch((error) => {
        toastService.showErrorToast(error.message);
        setForm(null);
        window.location.reload();
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
  const renderButton = (buttonProps) => {
    return <button {...buttonProps}>Resend One-Time Password</button>;
  };
  return (
    <>
      <div className="h-screen flex flex-col md:flex-row image">
        <div className="h-4/5 md:h-full md:w-2/5 flex items-end justify-center md:justify-end md:items-start">
          <div className="h-3/4 w-3/4 bg-primary md:mt-20 shadow-2xl"> </div>
        </div>

        <div className="h-screen md:w-3/5 ">
          <div id="recaptcha-container"></div>
          <div className="md:h-3/4 w-3/4 md:float-left mx-auto md:mx-0 bg-white py-4 sm:p-10 md:mt-20 shadow-2xl mb-10 md:mb-0">
            {!form ? (
              <SignupForm onSubmit={signInOtp} />
            ) : (
              <div className="flex flex-col items-center h-full justify-center space-y-5 p-3">
                <h1>Please enter One-Time Password to verify your account</h1>
                <h1 className="text-sm text-gray-500">
                  A One-Time Password sent to {`${form.phone.substring(0, 4)}`}
                  ******
                </h1>
                <div className="flex flex-col w-full items-center">
                  <OTPInput
                    value={otp}
                    onChange={setotp}
                    autoFocus
                    OTPLength={6}
                    otpType="number"
                    inputClassName="border border-gray-300"
                    placeholder={0}
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
                  <ResendOTP
                    onResendClick={() => signInCall(form)}
                    onTimerComplete={() => setConfirmationResult(null)}
                    className="flex justify-between flex-col items-center mt-10"
                    renderButton={renderButton}
                  />

                  <p
                    className="text-sm text-gray-500 mt-5 cursor-pointer"
                    onClick={() => window.location.reload()}
                  >
                    Entered a wrong number?
                  </p>
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
