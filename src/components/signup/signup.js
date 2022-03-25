import React from "react";
import ButtonField from "../shared components/Button/Button";
import Input from "../shared components/Input/Input";
import { useFormik } from "formik";
import { ROUTES } from "../../constants/Routes";
import { COLORS } from "../../constants/Colors";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userSignUpAction } from "../../actions/auth.actions";

const SignUp = () => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Must be a valid email")
        .max(30, "Must be 30 characters or less")
        .required("Email is Required"),
      phone: Yup.string()
        .min(10, "Phone no. nust be valid")
        .max(10, "Phone no. nust be valid")
        .required("Phone no. is Required"),
      password: Yup.string().required("Password is Required"),
    }),
    onSubmit: (values) => {
      dispatch(userSignUpAction(values, navigate));
    },
  });

  return (
    <>
      <div className="h-screen bg-white flex flex-col md:flex-row">
        <div className="h-screen bg-purple-700 md:w-2/5 flex items-end justify-center md:justify-end md:items-start">
          <div className="h-3/4 w-3/4 bg-purple-700 md:mt-20 shadow-2xl"> </div>
        </div>

        <div className="h-screen bg-white md:w-3/5 ">
          <div className="md:h-3/4 w-3/4 md:float-left mx-auto md:mx-0 bg-white py-4 sm:p-10 md:mt-20 shadow-2xl">
            <div className="">
              <form className="flex flex-col w-full items-center">
                <h1 className="text-black text-2xl ">Sign Up</h1>
                <div className="form-group w-3/4 lg:w-2/3 mt-10">
                  <Input
                    type="text"
                    label="Name"
                    name="name"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                    errorfield={formik.touched.name && formik.errors.name}
                  />
                </div>
                <div className="form-group w-3/4 lg:w-2/3 mt-5">
                  <Input
                    type="email"
                    label="Email"
                    name="email"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    errorfield={formik.touched.email && formik.errors.email}
                  />
                </div>
                <div className="form-group w-3/4 lg:w-2/3 mt-5">
                  <Input
                    type="text"
                    label="Phone No."
                    name="phone"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    onBlur={formik.handleBlur}
                    errorfield={formik.touched.phone && formik.errors.phone}
                  />
                </div>
                <div className="form-group w-3/4 lg:w-2/3 mt-5">
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
                    Sign up
                    {user.isLoading && (
                      <CircularProgress size={20} color="inherit" />
                    )}
                  </ButtonField>
                </div>
              </form>
              <div className="flex flex-col sm:flex-row justify-end items-center mx-5 md:mx-2 lg:mx-10 mt-2">
                <Link to={ROUTES.LOGIN}>
                  <p className="text-xs text-gray-600">
                    Already have an account?
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
