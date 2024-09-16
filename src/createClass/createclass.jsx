import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "../App.css";
import "../profile/profile.css";
import "./createClass.css";

function CreateClass() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const classInfo = {
    title: title,
    category: category,
    subtitle: subtitle,
    image: image,
  };
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

  const goNext = () => {
    if (title === "" || category === "" || subtitle === "") {
      alert("클래스 제목, 카테고리, 소개글을 입력해주세요");
    } else {
      navigate("/create_class2", { state: { classInfo } });
    }
  };

  return (
    <div id="mobile-view">
      <div id="default-padding">
        <header className="app-header header_3components">
          <img
            src="/X.png"
            id="header-arrowIcon"
            onClick={() => navigate("/profile")}
          />
          <div id="chatting-title">
            <h1>클래스 개최하기</h1>
          </div>
          <span></span>
        </header>
        <form id="createClass-main">
          <div className="createInput-box">
            <input
              className="createclass-input"
              placeholder="클래스 제목"
              required
              type=" text"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="createInput-box">
            <label htmlFor="category" className="createclass-input_lable">
              카테고리
            </label>
            <select
              className="createclass-input"
              required
              id="category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="COOK">요리</option>
              <option value="ART">미술</option>
              <option value="CRAFT">공예</option>
              <option value="GARDENING">원예</option>
              <option value="BEAUTY">뷰티</option>
              <option value="MUSIC">음악</option>
              <option value="EXERCISE">운동</option>
            </select>
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
          <div className="createInput-box createInput-box_image inputBox-white">
            <textarea
              type="text"
              placeholder="클레스 소개글을 입력하세요..."
              className="createclass-input_P createclass-input"
              onChange={(e) => {
                setSubtitle(e.target.value);
              }}
            />
          </div>

          <button className="nextBtn" onClick={goNext}>
            다음
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateClass;
