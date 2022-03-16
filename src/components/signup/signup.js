import React from "react";
import ButtonField from "../shared components/Button/Button";
import Input from "../shared components/Input/Input";
import { useFormik } from "formik";

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log("Form Data", values);
    },
  });

  //console.log('Form Values' , formik.values);

  return (
    <>
      <div className="flex-row ">
        <div className="flex justify-start mt-28">
          <h1>
            <b>WELCOME TO EXPENSE INCOME TRACKER</b>
          </h1>
        </div>

        <div className="flex justify-end mr-12">
          <form
            className="flex flex-col justify-center items-center border-4 border-green mt-10 mr-40 bg-purple-500"
            onSubmit={formik.handleSubmit}
            action=""
          >
            <div>
              <Input
                type="text"
                name="name"
                label="Name"
                onChange={formik.handleChange}
                value={formik.values.name}
              ></Input>
            </div>
            <br></br>
            <div>
              <Input
                type="email"
                name="email"
                label="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
              ></Input>
            </div>
            <br></br>
            <div>
              <Input
                type="phone"
                name="phone"
                label="Contact Number"
                onChange={formik.handleChange}
                value={formik.values.phone}
              ></Input>
            </div>
            <br></br>
            <div>
              <Input
                type="password"
                name="password"
                label="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
              ></Input>
            </div>
            <br></br> <br></br>
            <ButtonField type="submit">Create Account</ButtonField>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
