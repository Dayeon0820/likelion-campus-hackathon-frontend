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
  const location = useLocation();
  const rate = location.state?.rating || 0;
  const courseId = location.state?.courseId || null;
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // 첫 번째 파일을 가져옴
    setImage(file); // 파일 객체를 상태에 저장
    setPreviewUrl(URL.createObjectURL(file)); // 미리보기 위해 URL로 변환
  };
  useEffect(() => {
    // 컴포넌트가 언마운트될 때 URL 해제
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);
  useEffect(() => console.log(rate, courseId), []);

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
          <h4 className="review-sub-title">리뷰 사진을 추가해주세요.</h4>
        </div>
        <div className="createInput-box createInput-box_image">
          <input
            type="file"
            accept="image/*"
            id="create-imgFile"
            className="create-imgFile-input"
            onChange={handleImageChange}
          />
          <label htmlFor="create-imgFile" className="create-imgFile-lable">
            <img
              src={previewUrl || "/image.png"}
              id={previewUrl ? "preview" : undefined}
            />
          </label>
        </div>

        <button
          className="nextBtn secondBtn"
          onClick={() => {
            navigate("/makeReview3", { state: { image, rate, courseId } });
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
