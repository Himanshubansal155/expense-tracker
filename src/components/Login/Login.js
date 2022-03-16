import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ME_LOGIN } from "../../constants/action.constants";
import Input from "../shared components/Input/Input";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch({
      type: ME_LOGIN,
      payload: {
        email: "himanshubansal1@gmail.com",
        password: "123456",
      },
    });
    navigate("/");
  }, []);
  return (
    <div>
      login
      <Input />
    </div>
  );
};

export default Login;
