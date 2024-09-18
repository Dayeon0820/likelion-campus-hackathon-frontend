import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "../../App.css";
import "../profile_c.css";
import "../profile.css";

function EditProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [check, setCheck] = useState(false);
  const [permission, setPermission] = useState("");

  const token = localStorage.getItem("token");

  const originalName = location.state?.nickname || "";

  const onCheck = () => {
    setCheck((current) => !current);
  };
  useEffect(() => {
    console.log(check);
    if (check === false) {
      setPermission("USER");
    } else if (check === true) {
      setPermission("CREATOR");
    }
  }, [check]);
  useEffect(() => {
    console.log(permission);
  }, [permission]);
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const baseUrl = "http://sangsang2.kr:8080/api/member-info/edit";
    const info = {
      permission: permission,
      nickname: originalName,
    };
    console.log(info);

    formData.append(
      "info",
      new Blob([JSON.stringify(info)], { type: "application/json" })
    );

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
            alert("회원 정보 수정에 실패했습니다."); // 다른 404 에러 처리
          }
        } else {
          alert("회원 정보 수정에 실패했습니다.");
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
        <header className="app-header header_1components">
          <img
            src="/arrow.png"
            id="header-arrowIcon"
            onClick={() => navigate("/profile")}
          />
        </header>
        <div id="header-title">
          <h2>
            권한 <br/>변경하기
            <span class="material-symbols-outlined">autorenew</span> 
          </h2>
        </div>

        <h2 id="profile-questionTxt">역할 선택하기</h2>
        <div id="profile-quesionBox">
          <h4>클래스 개최자이신가요? . . .</h4>
          <input type="checkbox" id="profileCheckBox" onClick={onCheck} />
        </div>
        <button className="profileBtn" onClick={onSubmit}>
          변경하기
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
