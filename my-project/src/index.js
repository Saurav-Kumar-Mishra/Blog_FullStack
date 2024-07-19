import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
// import Store from "./store/Store.js";
import Store from './Store/store';
document.title = "BlogTank- Tank of Blogs";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <Provider store={Store}>
    <BrowserRouter>
      <App />
      <ToastContainer />
    </BrowserRouter>
  </Provider>

);


reportWebVitals();
