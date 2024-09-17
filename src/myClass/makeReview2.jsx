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
  const token = localStorage.getItem("token");
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
  useEffect(() => console.log("review2 :", requestDTO), []);
  const requestDTO = {
    reviewComment: "",
    score: rate,
    lectureId: courseId,
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(requestDTO, "이미지", image);
    const formData = new FormData();
    const baseUrl = "http://sangsang2.kr:8080/api/lecture/review/write";

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
      navigate("/myclass");
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

        <button className="nextBtn" onClick={onSubmit}>
          등록하기
        </button>
      </div>
    </div>
  );
}

export default MakeReview2;
