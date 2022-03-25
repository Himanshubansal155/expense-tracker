import React, { useEffect } from "react";
import { useSpeechContext } from "@speechly/react-client";
import {
  IntroPopup,
  BigTranscript,
  PushToTalkButton,
  ErrorPanel,
} from "@speechly/react-ui";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "./../../constants/Routes.js";
import { useSelector } from "react-redux";
import { LOGGED_OUT } from "../../constants/action.constants";

const Speechly = () => {
  const { segment } = useSpeechContext();
  const navigate = useNavigate();
  const loginStatus = useSelector((state) => state.user?.loginStatus);

  useEffect(() => {
    if (segment) {
      if (segment?.intent?.intent === "route") {
        segment?.entities?.map((route) => {
          sendToRoute(route.value);
        });
      }
    }
  }, [segment]);

  const sendToRoute = (type) => {
    if (loginStatus === LOGGED_OUT) {
      switch (type) {
        case "LOGIN":
        case "IN":
          navigate(ROUTES.LOGIN);
          break;
        case "UP":
        case "SIGNUP":
        case "REGISTER":
          navigate(ROUTES.REGISTER);
          break;
        case "DASHBOARD":
        case "HOME":
        case "WELCOME":
          navigate(ROUTES.WELCOME);
          break;
        default:
          break;
      }
    } else {
      switch (type) {
        case "DASHBOARD":
        case "HOME":
        case "WELCOME":
          navigate(ROUTES.DASHBOARD);
          break;

        default:
          break;
      }
    }
  };
  return (
    <div>
      <IntroPopup>
        <span slot="priming-body">
          You will be able to book faster with voice.
        </span>
      </IntroPopup>
      <BigTranscript placement="top" fontSize="14px" />
      <ErrorPanel placement="bottom" />
      <PushToTalkButton
        // gradientStops={["#508CFF", "#009FFA", "#00E48F"]}
        size="0px"
        showTime={2000}
        tapToTalkTime={0}
        placement={"top"}
        intro=""
      />
    </div>
  );
};

export default Speechly;
