import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Start from "./start";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { userReducer } from "./store/reducer";
import { AuthProvider } from "./context/auth";
import { HashRouter, Route, Routes, BrowserRouter} from "react-router-dom";
import App from "./App";

export const store = createStore(userReducer);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <Start/>
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
