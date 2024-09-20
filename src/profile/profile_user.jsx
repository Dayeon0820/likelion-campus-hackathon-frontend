import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "../App.css";
import Navbar from "../main/navbar";
import "./profile.css";
import styles from "./profile.module.css";

function Profile_USER(props) {
  const navigate = useNavigate();
  const refreshToken = localStorage.getItem("refresh_token");
  const token = localStorage.getItem("token");
  const userInfo = props.userInfo;
  const nickname = userInfo.nickname;
  const introduction = userInfo.introduction;
  const tag = userInfo.tag;
  const permission = userInfo.permission;
  const imageurl = userInfo.imageUrl;
  const [userImg, setUserImg] = useState("");

  const onRefreshToken = async () => {
    const refreshResponse = await fetch(
      "https://sangsang2.kr:8080/api/memebr/refresh",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh_token: refreshToken,
        }),
      }
    );

    const refreshData = await refreshResponse.json();
    if (refreshResponse.ok) {
      // 새로운 액세스 토큰 저장
      localStorage.setItem("token", refreshData.accessToken);
      return refreshData.accessToken; // 새로운 토큰 반환
    } else {
      alert("로그인 기간이 만료되었습니다.");
      navigate("/login"); // 로그인 페이지로 리다이렉트
      return null; // 실패 시 null 반환
    }
  };

  useEffect(() => {
    //설정된 이미지가 없다면 기본 이미지
    if (imageurl) {
      setUserImg(imageurl);
    } else {
      setUserImg("/user.png");
    }
    console.log(userImg);
  }, [imageurl]);

  const onConfirm = async (e) => {
    e.preventDefault();

    const confirmedLogout = window.confirm("로그아웃 하시겠습니까?");
    if (confirmedLogout) {
      try {
        const response = await fetch(
          "https://sangsang2.kr:8080/api/member/logout",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const data = await response.json();
          if (response.status === 400) {
            if (data.error === "사용자 찾을 수 없음") {
              alert("사용자 정보를 찾을 수 없습니다.");
            } else {
              alert("로그아웃에 실패했습니다."); // 다른 400 에러 처리
            }
          } else if (
            data.error === "토큰이 유효하지 않습니다." ||
            data.error === "토큰 사용자를 찾을 수 없습니다."
          ) {
            const newToken = await onRefreshToken(); // 새로운 토큰 요청

            if (newToken) {
              // 새로운 토큰이 있으면 재시도
              return onConfirm(); // 다시 호출
            }
          } else {
            alert("로그인에 실패했습니다.");
          }
          return;
        }
        const data = await response.text();
        alert("계정에서 로그아웃 되었습니다.");
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        navigate("/login");
      } catch (error) {
        console.error("Error occurred during delete:", error);
        alert("Error occurred " + error.message);
      }
    }
  };
  return (
    <div id="mobile-view" className={styles.background}>
      <header className="app-header profileHeader defaultHeader">
        <Link to="/home">
          <span className="material-symbols-outlined">arrow_back_ios</span>{" "}
        </Link>
        <h3>마이 프로필</h3>
      </header>
      <main id="default-padding" className="profileMain">
        <div id="profile-info">
          <img src={userImg} id="profile-img" />
          <div id="username-box">
            <h2 id="profile-username">{nickname}</h2>
            <h6 id="profile-usertype">참가자</h6>
          </div>
        </div>
        <div id="profile-bthBox">
          <button
            className="profile-btn"
            onClick={() => {
              navigate("/edit_profile2", {
                state: { nickname, userImg, introduction, permission, tag },
              });
            }}
          >
            프로필 수정
          </button>
          <button
            className="profile-btn"
            id="myClass"
            onClick={() => {
              navigate("/completedClass");
            }}
          >
            나의 클래스
          </button>
        </div>
        <div id="profile-emptyBox">
          <span id="profile-introduction">{introduction}</span>
        </div>
        <button
          className="logoutBtn permissionBtn"
          onClick={() =>
            navigate("/edit_profile", {
              state: { nickname, introduction },
            })
          }
        >
          권한 변경하기
        </button>
        <button className="logoutBtn" onClick={onConfirm}>
          로그아웃
        </button>
      </main>
      <Navbar></Navbar>
    </div>
  );
}

export default Profile_USER;
