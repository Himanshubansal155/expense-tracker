import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ButtonField from "../shared components/Button/Button";
import Input from "../shared components/Input/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { COLORS } from "../../constants/Colors";
import { ROUTES } from "../../constants/Routes";
import { CircularProgress } from "@mui/material";
import { userLoginAction } from "../../actions/auth.actions";

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user);
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
    },
  });
  return (
    <div className="h-screen bg-white flex flex-col md:flex-row">
      <div className="h-screen bg-purple-700 md:w-2/5 flex items-end justify-center md:justify-end md:items-start">
        <div className="h-3/4 w-3/4 bg-purple-700 md:mt-20 shadow-2xl"> </div>
      </div>
      <div className="h-screen bg-white md:w-3/5 ">
        <div className="md:h-3/4 w-3/4 md:float-left mx-auto md:mx-0 bg-white p-10 md:mt-20 shadow-2xl">
          <div className="">
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
                  errorfield={formik.touched.password && formik.errors.password}
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
            </form>
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
  );
};

export default Login;
