import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "../App.css";
import "../profile/profile_c.css";
import "../profile/profile.css";
import "./makeReview.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function MakeReview() {
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
            onClick={() => navigate("/myClass")}
          />
        </header>
        <div id="header-title">
          <h2>
            클래스를 <br />
            평가해주세요
          </h2>
        </div>
        <div className="process-dot-box">
          <span className="process-dot blue-dot"></span>
          <span className="process-dot"></span>
          <span className="process-dot"></span>
        </div>
        <h2 id="profile-questionTxt">1단계: 클래스에 만족하셨나요?</h2>
        <div id="profile-quesionBox">
          <h4>1개에서 5개까지 별을 클릭해주세요</h4>
        </div>
        <div id="review-starBox">
          <h1>{rating}</h1>
          <div id="review-starts">
            {[1, 2, 3, 4, 5].map((index) => (
              <FontAwesomeIcon
                key={index}
                icon={faStar} // FontAwesome의 별 아이콘
                onClick={() => handleClick(index)} // 클릭한 별점을 저장
                style={{
                  color:
                    index <= rating
                      ? "rgba(54, 158, 255, 1)"
                      : "rgba(219, 224, 229, 1)",
                  cursor: "pointer",
                  fontSize: "30px",
                  margin: "5px",
                }}
              />
            ))}
          </div>
        </div>
        <button
          className="nextBtn secondBtn"
          onClick={() => {
            navigate("/makeReview2");
          }}
        >
          사진, 글 추가하러 가기
        </button>

        <button className="nextBtn">등록하기</button>
      </div>
    </div>
  );
}

export default MakeReview;
