import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "../App.css";
import "../profile/profile_c.css";
import "../profile/profile.css";
import "./makeReview.css";

function MakeReview2() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0); // 선택한 별점
  const handleClick = (index) => {
    setRating(index);
  };

  return (
    <div id="mobile-view">
      <div id="default-padding">
        <header className="app-header header_1components">
          <img
            src="/arrow.png"
            id="header-arrowIcon"
            onClick={() => navigate("/makeReview")}
          />
        </header>
        <div id="header-title">
          <h2>
            클래스를 <br />
            평가해주세요
          </h2>
        </div>
        <div className="process-dot-box">
          <span className="process-dot "></span>
          <span className="process-dot  blue-dot"></span>
          <span className="process-dot"></span>
        </div>
        <h2 id="profile-questionTxt">2단계: 사진 추가하기</h2>
        <div id="profile-quesionBox">
          <h4>리뷰 사진을 추가해주세요.</h4>
        </div>

        <button
          className="nextBtn secondBtn"
          onClick={() => {
            navigate("/makeReview");
          }}
        >
          리뷰 작성하러 가기
        </button>

        <button className="nextBtn">등록하기</button>
      </div>
    </div>
  );
}

export default MakeReview2;
