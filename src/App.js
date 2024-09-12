import "./App.css";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login/login";
import Signup1 from "./signup/signup";
import Chats from "./chatting/chats";
import Chatting from "./chatting/chatting";
import Home from "./main/home";
import ClassMap from "./map/map";
import Profile_USER from "./profile/profile_user";
import Profile from "./profile/profile";
import Profile_CREATOR from "./profile/profile-creator";
import EditProfile from "./profile/edit_profile/edit-profile";
import EditProfile2 from "./profile/edit_profile/edit-profile2";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup1" element={<Signup1 />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/chatting" element={<Chatting />} />
        <Route path="/home" element={<Home />} />
        <Route path="/map" element={<ClassMap />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit_profile" element={<EditProfile />} />
        <Route path="/edit_profile2" element={<EditProfile2 />} />
      </Routes>
    </Router>
  );
}

export default App;
