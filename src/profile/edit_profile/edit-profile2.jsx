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
  const permission = location.state?.permission || "";
  const tag = location.state?.tag || "";
  const originalIntro = location.state?.introduction || "";
  const [nickname, setNickname] = useState("");
  const [introduction, setIntroduction] = useState("");
  const originalName = location.state?.nickname || "모맨트 클래스";
  useEffect(() => {
    // 컴포넌트가 언마운트될 때 URL 해제
    return () => {
      if (previewUrl !== "") {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);
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
      permission: permission,
    };
    // 값이 존재하는 경우에만 info 객체에 추가
    if (nickname) {
      info.nickname = nickname;
    } else {
      info.nickname = originalName;
    }
    if (introduction) {
      info.introduction = introduction;
    } else {
      info.introduction = originalIntro;
    }
    console.log(info);

    console.log("Request DTO:", info);

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
      if (!response.ok) {
        if (response.status === 404) {
          if (data.error === "사용자 찾을 수 없음") {
            alert("사용자를 찾을 수 없습니다.");
          } else if (data.error === "사용자 정보 찾을 수 없음") {
            alert("사용자 정보를 찾을 수 없습니다.");
          } else if (data.error === "업데이트 사용자 정보 불러오기 실패") {
            alert("업데이트된 사용자 정보를 불러올 수 없습니다.");
          } else {
            alert("회원 정보 불러오기에 실패했습니다."); // 다른 404 에러 처리
          }
        } else {
          alert("회원 정보 불러오기에 실패했습니다.");
        }
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
      <div id="profile-padding">
        <header className="app-header header_3components ">
          <img
            src="/arrow.png"
            id="header-arrowIcon"
            onClick={() => navigate("/profile")}
          />
          <div id="chatting-title">
            <h1>프로필 수정하기</h1>
          </div>
          <span></span>
        </header>
        <div id="profile-humanImg">
          <label htmlFor="profile-imgInput">
            <img src={previewUrl || "/user.png"} id="profile-humanImg-lable" />
            <div id="profile-humanImg-img">
              <img src="/image.png" />
            </div>
          </label>
          <h4>{originalName}</h4>
          <h6>{tag}</h6>
        </div>

        <form onSubmit={onSubmit}>
          <div id="edit-nicknameBox">
            <div id="edit-nicnameBox-img">
              <img src="/smalluser.png" />
            </div>
            <div id="edit-nicknameBox-txt">
              <h4>닉네임 변경</h4>
              <h6>{originalName}</h6>
            </div>
          </div>
          <span id="edit-prifile2-span">닉네임</span>

          <input
            type="file"
            accept="image/*"
            id="profile-imgInput"
            onChange={handleImageChange}
          />
          <div className=" editProfile-input">
            <input
              placeholder="닉네임 변경하기"
              type="text"
              onChange={(e) => {
                setNickname(e.target.value);
              }}
            />
          </div>
          <span id="edit-prifile2-span">소개글</span>
          <div className=" editProfile-textarea">
            <textarea
              type="text"
              placeholder={originalIntro}
              onChange={(e) => {
                setIntroduction(e.target.value);
              }}
            />
          </div>
          <div id="changePassword" onClick={() => navigate("/password")}>
            비밀번호 변경하기
          </div>

          <button type="submit" className="profileBtn btnwhite">
            수정하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile2;
