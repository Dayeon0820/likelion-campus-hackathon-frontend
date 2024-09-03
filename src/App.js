import "./App.css";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login/login";
import Signup1 from "./signup/signup";
import Login_email from "./login/login_email";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup1" element={<Signup1 />} />
        <Route path="/EmailLogin" element={<Login_email />} />
      </Routes>
    </Router>
  );
}

export default App;
