import { useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import { COLORS } from "../../constants/Colors";
import { ROUTES } from "../../constants/Routes";
import ButtonField from "../shared components/Button/Button";
import Input from "../shared components/Input/Input";
import * as Yup from "yup";

const SignupForm = ({ onSubmit }) => {
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
      onSubmit(values);
      formik.resetForm({});
    },
  });
  return (
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
            Sign up
          </ButtonField>
        </div>
      </form>
      <div className="flex flex-col sm:flex-row justify-end items-center mx-5 md:mx-2 lg:mx-10 mt-2">
        <Link to={ROUTES.LOGIN}>
          <p className="text-xs text-gray-600">Already have an account?</p>
        </Link>
      </div>
    </div>
  );
};

export default SignupForm;
