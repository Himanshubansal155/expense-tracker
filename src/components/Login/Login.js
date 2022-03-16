import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ME_LOGIN } from "../../constants/action.constants";
import ButtonField from "../shared components/Button/Button";
import Input from "../shared components/Input/Input";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div>
      login
      <Input />
      <ButtonField
        type="submit"
        onClick={() => {
          dispatch({
            type: ME_LOGIN,
            payload: {
              email: "himanshubansal1@gmail.com",
              password: "123456",
            },
          });
          navigate("/");
        }}
      >
        Submit
      </ButtonField>
    </div>
  );
};

export default Login;
