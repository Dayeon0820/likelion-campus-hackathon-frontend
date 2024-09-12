import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "../../App.css";
import "../profile_c.css";
import "../profile.css";
import Navbar from "../../main/navbar";
function EditProfile2() {
  const navigate = useNavigate();
  return (
    <div id="mobile-view">
      <div id="profile-padding">
        <header className="app-header header_1components">
          <img
            src="/arrow.png"
            id="header-arrowIcon"
            onClick={() => navigate("/edit_profile")}
          />
        </header>
        <div id="header-title">
          <h2>
            나의 프로필 <br />
            수정하기
          </h2>
        </div>
        <div className="process-dot-box">
          <span className="process-dot "></span>
          <span className="process-dot blue-dot"></span>
        </div>

        <h2 id="profile-questionTxt">2단계: 내 정보 입력하기</h2>
        <img id="profile-humanImg" src="/person.png" />
      </div>
    </div>
  );
}

export default EditProfile2;
