import "./App.css";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login/login";
import Signup1 from "./signup/signup";
import Chats from "./chatting/chats";
import Chatting from "./chatting/chatting";
import Home from "./main/home";
import ClassList from "./main/classList";
import ClassMap from "./map/map";
import Profile from "./profile/profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup1" element={<Signup1 />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/chatting" element={<Chatting />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/class_list" element={<ClassList />} />
        <Route path="/map" element={<ClassMap />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
