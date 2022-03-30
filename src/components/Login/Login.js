import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ButtonField from "../shared components/Button/Button";
import Input from "../shared components/Input/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { COLORS } from "../../constants/Colors";
import { ROUTES } from "../../constants/Routes";
import { CircularProgress } from "@mui/material";
import {
  userLoginAction,
  userLoginMobileAction,
} from "../../actions/auth.actions";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import toastService from "./../../services/toastService";
import OTPInput, { ResendOTP } from "otp-input-react";

const Login = () => {
  const [loginMobile, setLoginMobile] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpPageOpen, setOtpPageOpen] = useState(false);
  const [otp, setotp] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user);
  const auth = getAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(30, "Must be 30 characters or less")
        .required("Email is Required"),
      password: Yup.string().required("Password is Required"),
    }),
    onSubmit: async (values) => {
      dispatch(
        userLoginAction(
          {
            email: values.email,
            password: values.password,
          },
          navigate
        )
      );
      formik.resetForm({});
    },
  });

  const signInOtp = () => {
    setOtpPageOpen(true);
    try {
      const verifier = new RecaptchaVerifier(
        "recaptcha-container",
        { size: "invisible" },
        auth
      );
      setRecaptchaVerifier(verifier);
      signInCall(verifier);
    } catch (error) {
      console.log(error);
    }
  };
  const signInCall = (verifier) => {
    signInWithPhoneNumber(
      auth,
      `+91${mobileNumber}`,
      verifier || recaptchaVerifier
    )
      .then((confirmationResult) => {
        setConfirmationResult(confirmationResult);
      })
      .catch((error) => {
        toastService.showErrorToast(error.message);
        window.location.reload();
        console.log(error);
      });
  };
  const verifyAndSignUp = () => {
    if (confirmationResult) {
      confirmationResult
        .confirm(otp)
        .then((result) => {
          dispatch(userLoginMobileAction({ phone: mobileNumber }, navigate));
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
    <div className="p-1">
      <div className="flex flex-col md:flex-row bg-gray-100">
        <div className="md:w-2/5 flex items-end justify-center md:justify-end md:items-start">
          <div className="h-3/4 w-3/4 bg-primary md:mt-20 shadow-2xl"> </div>
        </div>
        <div className="h-screen md:w-3/5 ">
          <div className="md:h-3/4 w-3/4 md:float-left mx-auto md:mx-0 bg-white p-10 md:mt-20 shadow-2xl">
            <div className="">
              {!otpPageOpen ? (
                !loginMobile ? (
                  <form className="flex flex-col w-full items-center">
                    <div className="md:mt-24">
                      <h1 className="text-black text-2xl ">Log In</h1>
                    </div>

                    <div className="form-group w-3/4 lg:w-2/3  mt-10">
                      <Input
                        type="text"
                        label="Email"
                        name="email"
                        required
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        errorfield={formik.touched.email && formik.errors.email}
                      />
                    </div>
                    <div className="form-group w-3/4 lg:w-2/3  mt-10">
                      <Input
                        type="password"
                        label="Password"
                        name="password"
                        required
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        errorfield={
                          formik.touched.password && formik.errors.password
                        }
                      />
                    </div>
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
                        onClick={formik.handleSubmit}
                      >
                        Login
                        {user.isLoading && (
                          <CircularProgress size={20} color="inherit" />
                        )}
                      </ButtonField>
                    </div>
                    <p
                      className="mt-5 text-sm cursor-pointer text-gray-500"
                      onClick={() => setLoginMobile(true)}
                    >
                      Login using Phone
                    </p>
                  </form>
                ) : (
                  <div className="flex flex-col w-full items-center justify-center h-full">
                    <div className="md:mt-24">
                      <h1 className="text-black text-2xl ">Log In</h1>
                    </div>

                    <div className="form-group w-3/4 lg:w-2/3  mt-10">
                      <Input
                        type="text"
                        label="Phone Number"
                        required
                        onChange={(e) => setMobileNumber(e.target.value)}
                        value={mobileNumber}
                      />
                    </div>
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
                        onClick={() => {
                          if (mobileNumber.length === 10) {
                            signInOtp();
                          } else {
                            toastService.showErrorToast("Enter valid Number");
                          }
                        }}
                      >
                        Send OTP
                        {user.isLoading && (
                          <CircularProgress size={20} color="inherit" />
                        )}
                      </ButtonField>
                    </div>
                    <p
                      className="mt-5 text-sm cursor-pointer text-gray-500"
                      onClick={() => setLoginMobile(false)}
                    >
                      Login using Email
                    </p>
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center h-full justify-center space-y-5 p-3">
                  <h1>Please enter One-Time Password to verify your account</h1>
                  <h1 className="text-sm text-gray-500">
                    A One-Time Password sent to{" "}
                    {`${mobileNumber.substring(0, 4)}`}
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
                      onResendClick={() => signInCall()}
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
              <div className="flex flex-col sm:flex-row justify-between items-center mx-5 md:mx-2 lg:mx-10 mt-2">
                <Link to={ROUTES.SIGNUP}>
                  <p className="text-xs text-gray-600">Create an account?</p>
                </Link>
                <Link to={ROUTES.REGISTER}>
                  <p className="text-xs text-gray-600">Forget Password</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
