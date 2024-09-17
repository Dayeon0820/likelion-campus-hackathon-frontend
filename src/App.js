import "./App.css";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login/login";
import Signup1 from "./signup/signup";
import Chats from "./chatting/chats";
import Chatting from "./chatting/chatting";
import Home from "./main/home";
import ClassList from "./main/classList";
import ClassApplication from "./main/classApplication";
import ApplicationDetail from "./main/ApplicationDetail";
import CompletedApplication from "./main/applicationCompleted";
import ReviewInquiry from "./main/reviewPage";
import ClassMap from "./map/map";
import Profile_USER from "./profile/profile_user";
import Profile from "./profile/profile";
import Profile_CREATOR from "./profile/profile-creator";
import EditProfile from "./profile/edit_profile/edit-profile";
import EditProfile2 from "./profile/edit_profile/edit-profile2";
import CreateClass from "./createClass/createclass";
import CreateOnedayClass from "./createClass/oneday";
import CreateRegularClass from "./createClass/regular";
import CreateClass2 from "./createClass/createclass2";
import SearchPage from "./search/search";
import Myclass from "./myClass/myclass";
import MakeReview from "./myClass/makeReview";
import MakeReview2 from "./myClass/makeReview2";
import MakeReview3 from "./myClass/makeReview3";
import CompletedClass from "./myClass/completed";

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
        <Route
          path="/home/class_application/:id"
          element={<ClassApplication />}
        />
        <Route
          path="/home/class_application/detail/:id"
          element={<ApplicationDetail />}
        />
        <Route
          path="/home/class_application/completed"
          element={<CompletedApplication />}
        />
        <Route
          path="/home/class_application/review"
          element={<ReviewInquiry />}
        />
        <Route path="/map" element={<ClassMap />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/myclass" element={<Myclass />} />
        <Route path="/completedClass" element={<CompletedClass />} />
        <Route path="/makeReview" element={<MakeReview />} />
        <Route path="/makeReview2" element={<MakeReview2 />} />
        <Route path="/makeReview3" element={<MakeReview3 />} />
        <Route path="/edit_profile" element={<EditProfile />} />
        <Route path="/edit_profile2" element={<EditProfile2 />} />
        <Route path="/create_class" element={<CreateClass />} />
        <Route path="/create_class2" element={<CreateClass2 />} />
        <Route path="/create_class/oneday" element={<CreateOnedayClass />} />
        <Route path="/create_class/regular" element={<CreateRegularClass />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
