import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Start from "./start";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { userReducer } from "./store/reducer";
import { AuthProvider } from "./context/auth";
import { HashRouter, Route, Routes } from "react-router-dom";
import App from "./App";

export const store = createStore(userReducer);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <HashRouter>
        <Routes>
                <Route path="/" element={<Start />} />
                <Route exact path="/video-chat-dpl" element={<Start/>} />
                <Route path="/room/:id" element={<App />} />
        </Routes>
        </HashRouter>
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
