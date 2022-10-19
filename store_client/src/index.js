import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store/store";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
const options = {
  position: positions.TOP_RIGHT,
  timeout: 2000,
  offset: "120px 20px ",
  transition: transitions.FADE,
};
ReactDOM.render(
  <Router>
    <AlertProvider template={AlertTemplate} {...options}>
      <Provider store={store}>
        <App />
      </Provider>
    </AlertProvider>
  </Router>,
  document.getElementById("root")
);
reportWebVitals();
