import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CostumerProvider } from "./context/Costumer";
import "antd/dist/antd.css";
import "./assets/css/style.css";

ReactDOM.render(
  <CostumerProvider>
    <App />
  </CostumerProvider>,
  document.getElementById("root")
);
