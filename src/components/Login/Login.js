import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ME_LOGIN } from "../../constants/action.constants";
import ButtonField from "../shared components/Button/Button";
import Input from "../shared components/Input/Input";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useEffect(() => {
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
                <Input type="text" label="Username" required />
              </div>
              <div className="form-group w-1/2  mt-10">
                <Input type="password" label="Password" required />
              </div>
              <div>
                <a className="no-underline float-right" href="/">
                  <p className="text-xs text-gray-600">Forget Password!</p>
                </a>
              </div>
              <div className="form-group mt-10">
                <ButtonField
                  buttonStyle={{
                    margin: 10,
                    backgroundColor: "rgb(109, 40, 217)",
                    borderRadius: 20,
                    width: "100%",
                    color: "white",
                    fontWeight: "bold",
                    paddingLeft: 40,
                    paddingRight: 40,
                    paddingTop: 8,
                    paddingBottom: 8,
                  }}
                  hoverStyle={{ backgroundColor: "rgb(91, 33, 182)" }}
                  type="submit"
                >
                  Login
                </ButtonField>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
