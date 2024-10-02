import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import TopNavigationRender from "./Components/Top-Navigation/Top-navigation";
// import Login from "./Components/Login/Login";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Login /> */}
    <TopNavigationRender />
  </React.StrictMode>
);

reportWebVitals();
