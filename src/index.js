import React from "react";
import ReactDOM from "react-dom";
import "./fonts.scss";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { SpeechProvider } from "@speechly/react-client";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SpeechProvider appId="523cafb9-36bd-4449-b10a-c9c1af591908">
        <Provider store={store}>
          <App />
        </Provider>
      </SpeechProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
