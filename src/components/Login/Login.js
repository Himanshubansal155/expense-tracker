import React from "react";
import Input from "../shared components/Input/Input";

const Login = () => {
  return (
    <div className=" h-screen bg-white flex">
      <div className=" h-screen bg-purple-700 w-2/5 ">
        <div className=" h-3/4 w-3/4 float-right bg-purple-700 mt-20 shadow-2xl">
          {" "}
        </div>
      </div>
      <div className=" h-screen bg-white w-3/5 ">
        <div className=" h-3/4 w-3/4 float-left bg-white mt-20 shadow-2xl">
          <div className="">
            <form action="#" className="flex flex-col w-full items-center">
              <div className=" mt-24">
                <h1 className="text-black text-2xl ">Log In</h1>
              </div>

              <div className="form-group w-1/2  mt-10">
                <label className="label" for="name">
                  Username
                </label>
                <Input
                  type="text"
                  className="form-control"
                  label="Username"
                  required
                />
              </div>
              <div className="form-group w-1/2  mt-10">
                <label className="label" for="password">
                  Password
                </label>
                <Input
                  type="password"
                  className="form-control"
                  label="password"
                  required
                />
              </div>
              <div>
                <a classname="no-underline float-right" href="#">
                  <p className="text-xs text-gray-600">Forget Password!</p>
                </a>
              </div>
              <div className="form-group mt-10">
                <button
                  type="submit"
                  className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-full"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
