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
  const token = localStorage.getItem("token");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get("id");
  const [rating, setRating] = useState(0); // 선택한 별점
  const handleClick = (index) => {
    setRating(index);
  };
  useEffect(() => {
    console.log(courseId);
  }, []);
  const requestDTO = {
    reviewComment: "",
    score: rating,
    lectureId: courseId,
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("review2 :", requestDTO);
    const formData = new FormData();
    const baseUrl = "http://sangsang2.kr:8080/api/lecture/review/write";

    formData.append(
      "review",
      new Blob([JSON.stringify(requestDTO)], { type: "application/json" })
    );

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
            navigate("/makeReview2", { state: { rating, courseId } });
          }}
        >
          사진, 글 추가하러 가기
        </button>

        <button className="nextBtn" onClick={onSubmit}>
          등록하기
        </button>
      </div>
    </div>
  );
}

export default MakeReview;
