import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "../../App.css";
import "../profile_c.css";
import "../profile.css";

function EditProfile() {
  const navigate = useNavigate();
  return (
    <div id="mobile-view">
      <div id="profile-padding">
        <header className="app-header header_1components">
          <img
            src="/arrow.png"
            id="header-arrowIcon"
            onClick={() => navigate("/profile")}
          />
        </header>
        <div id="header-title">
          <h2>
            나의 프로필 <br />
            수정하기
          </h2>
        </div>
        <div className="process-dot-box">
          <span className="process-dot blue-dot"></span>
          <span className="process-dot"></span>
        </div>

        <h2 id="profile-questionTxt">1단계: 역할 결정하기</h2>
        <div id="profile-quesionBox">
          <h4>클래스 개최자이신가요? . . .</h4>
          <div id="checkBox"></div>
        </div>
        <button
          className="profileBtn"
          onClick={() => {
            navigate("/edit_profile2");
          }}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
