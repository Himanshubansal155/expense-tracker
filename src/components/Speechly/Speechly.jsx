import React, { useEffect } from "react";
import { useSpeechContext } from "@speechly/react-client";
import {
  IntroPopup,
  BigTranscript,
  PushToTalkButton,
  ErrorPanel,
} from "@speechly/react-ui";
import { useNavigate } from "react-router-dom";

const Speechly = () => {
  const { segment } = useSpeechContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (segment) {
      if (segment?.intent?.intent === "route") {
        segment?.entities?.map((route) => {
          navigate(`/${route.value}`);
        });
      }
      if (segment.isFinal) {
        console.log("✅", segment);
      }
    }
  }, [segment]);
  return (
    <div>
      <IntroPopup>
        <span slot="priming-body">
          You will be able to book faster with voice.
        </span>
      </IntroPopup>
      {/* <Counter /> */}
      <BigTranscript placement="top" fontSize="14px" />
      <ErrorPanel placement="bottom" />
      <PushToTalkButton
        // gradientStops={["#508CFF", "#009FFA", "#00E48F"]}
        // size="0px"
        showTime={2000}
        tapToTalkTime={0}
        placement={"top"}
        intro=""
      />
    </div>
  );
};

export default Speechly;
