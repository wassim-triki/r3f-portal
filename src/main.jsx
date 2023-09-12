import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/item/:id" element={<App />} />
        <Route path="/" element={<App />} />
        <Route path="/*" element={<Navigate to={"/"} />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
