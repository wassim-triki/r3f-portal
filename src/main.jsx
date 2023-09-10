import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Experience } from "./components/Experience";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/item/:id" element={<App />} />
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
