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
  const [comment, setComment] = useState("");
  const token = localStorage.getItem("token");
  const location = useLocation();
  const rate = location.state?.rate || 0;
  const courseId = location.state?.courseId || null;
  const image = location.state?.image || null;
  const rateInt = parseFloat(rate);
  const lectureId = parseFloat(courseId);
  const requestDTO = {
    reviewComment: comment,
    score: rateInt,
    lectureId: lectureId,
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("review3", requestDTO);
    const formData = new FormData();
    const baseUrl = "http://sangsang2.kr:8080/api/review/write";

    formData.append(
      "review",
      new Blob([JSON.stringify(requestDTO)], { type: "application/json" })
    );
    if (image) {
      formData.append("images", image, image.name);
    }

    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        if (response.status === 404) {
          if (data.error === "존재하지 않는 회원입니다") {
            alert("사용자를 찾을 수 없습니다.");
          } else if (data.error === "존재하지 않는 클래스입니다.") {
            alert("존재하지 않는 클래스입니다.");
          } else if (data.error === "이미 리뷰를 작성한 회원입니다.") {
            alert("이미 리뷰를 작성한 회원입니다.");
          } else {
            alert("리뷰 생성에 실패했습니다."); // 다른 404 에러 처리
          }
        } else {
          alert("리뷰 생성에 실패했습니다.");
        }
        console.log(data.error);
        return;
      }

      console.log("Success:", data);
      navigate("/profile");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div id="mobile-view">
      <div id="default-padding">
        <header className="app-header header_1components">
          <img
            src="/arrow.png"
            id="header-arrowIcon"
            onClick={() => navigate("/makeReview2")}
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
        <h2 id="profile-questionTxt">3단계: 리뷰 작성하기</h2>
        <div id="profile-quesionBox">
          <h4 className="review-sub-title">여러분의 리뷰를 작성해주세요.</h4>
        </div>
        <div className=" editProfile-textarea review-textarea">
          <textarea
            type="text"
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
        </div>

        <button className="nextBtn secondBtn" onClick={onSubmit}>
          등록하기
        </button>

        <button className="nextBtn">취소하기</button>
      </div>
    </div>
  );
}

export default MakeReview2;
