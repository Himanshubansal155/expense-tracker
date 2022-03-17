import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ME_LOGIN } from "../../constants/action.constants";
import ButtonField from "../shared components/Button/Button";
import Input from "../shared components/Input/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { COLORS } from "../../constants/Colors";
import { ROUTES } from "../../constants/Routes";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(30, "Must be 30 characters or less")
        .required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {},
  });
  // useEffect(() => {3000
  //   dispatch({
  //     type: ME_LOGIN,
  //     payload: {
  //       email: "himanshubansal1@gmail.com",
  //       password: "123456",
  //     },
  //   });
  //   navigate("/");
  // }, []);
  return (
    <div className="h-screen bg-white flex flex-col md:flex-row">
      <div className="h-screen bg-purple-700 md:w-2/5 flex items-end justify-center md:justify-end md:items-start">
        <div className="h-3/4 w-3/4 bg-purple-700 md:mt-20 shadow-2xl"> </div>
      </div>
      <div className="h-screen bg-white md:w-3/5 ">
        <div className="md:h-3/4 w-3/4 md:float-left mx-auto md:mx-0 bg-white p-10 md:mt-20 shadow-2xl">
          <div className="">
            <form
              action="#"
              className="flex flex-col w-full items-center"
              onSubmit={formik.handleSubmit}
            >
              <div className="md:mt-24">
                <h1 className="text-black text-2xl ">Log In</h1>
              </div>

              <div className="form-group w-3/4 lg:w-2/3  mt-10">
                <Input
                  type="text"
                  label="Username"
                  name="username"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.username && formik.errors.username ? (
                  <p>{formik.errors.username}</p>
                ) : null}
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
                />
                {formik.touched.password && formik.errors.password ? (
                  <p>{formik.errors.password}</p>
                ) : null}
              </div>
              <div className="form-group mt-10 flex justify-between">
                <ButtonField
                  buttonstyle={{
                    margin: 10,
                    backgroundColor: COLORS.primary,
                    borderRadius: 20,
                    width: "100%",
                    color: "white",
                    fontWeight: "bold",
                    paddingLeft: 40,
                    paddingRight: 40,
                    paddingTop: 8,
                    paddingBottom: 8,
                  }}
                  hoverstyle={{ backgroundColor: COLORS.darkPrimary }}
                  type="submit"
                >
                  Login
                </ButtonField>
              </div>
            </form>
            <div className="flex flex-col sm:flex-row justify-between items-center mx-5 md:mx-2 lg:mx-10">
              <a className="no-underline" href={ROUTES.REGISTER}>
                <p className="text-xs text-gray-600">Create an account?</p>
              </a>
              <a className="no-underline" href={ROUTES.REGISTER}>
                <p className="text-xs text-gray-600">Forget Password</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
