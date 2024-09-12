import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "../../App.css";
import "../profile_c.css";
import "../profile.css";

function EditProfile2() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const permission = location.state.permission;
  const [nickname, setNickname] = useState("");
  const [introduction, setIntroduction] = useState("");
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // 첫 번째 파일을 가져옴
    setImage(file); // 파일 객체를 상태에 저장
    setPreviewUrl(URL.createObjectURL(file)); // 미리보기 위해 URL로 변환
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const baseUrl = "http://sangsang2.kr:8080/api/member-info/edit";
    const info = {
      nickname: nickname,
      introduction: introduction || "",
      permission: permission,
    };

    formData.append(
      "info",
      new Blob([JSON.stringify(info)], { type: "application/json" })
    );
    if (image) {
      formData.append("images", image, image.name);
    }

    try {
      const response = await fetch(baseUrl, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      console.log("Success:", data);
      navigate("/profile");
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
        <form onSubmit={onSubmit}>
          <input
            type="file"
            accept="image/*"
            id="profile-imgInput"
            onChange={handleImageChange}
          />
          <input
            placeholder="닉네임"
            required
            type="text"
            onChange={(e) => {
              setNickname(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="소개글"
            onChange={(e) => {
              setIntroduction(e.target.value);
            }}
          />
          <button type="submit">수정하기</button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile2;
