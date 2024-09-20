import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "../App.css";
import Navbar from "../main/navbar";
import Profile_USER from "./profile_user";
import Profile_CREATOR from "./profile-creator";
function Profile() {
  const [userInfo, getUserInfo] = useState({});
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refresh_token");
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();

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

  const onLoadProfile = async () => {
    const baseUrl = "https://sangsang2.kr:8080/api/member-info/info";
    try {
      const response = await fetch(baseUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          if (data.error === "사용자 찾을 수 없음") {
            alert("사용자를 찾을 수 없습니다.");
          } else if (data.error === "사용자 정보 찾을 수 없음") {
            alert("사용자 정보를 찾을 수 없습니다.");
          } else {
            alert("회원 정보 불러오기에 실패했습니다."); // 다른 404 에러 처리
          }
        } else if (
          data.error === "토큰이 유효하지 않습니다." ||
          data.error === "토큰 사용자를 찾을 수 없습니다."
        ) {
          const newToken = await onRefreshToken(); // 새로운 토큰 요청

          if (newToken) {
            // 새로운 토큰이 있으면 재시도
            return onLoadProfile(); // 다시 호출
          }
        } else {
          alert("회원 정보 불러오기에 실패했습니다.");
        }
        return;
      }

      getUserInfo(data);
      setFlag(true);
    } catch (error) {
      console.error("Error occurred during delete:", error);
      alert("Error occurred " + error.message);
    }
  };

  useEffect(() => {
    onLoadProfile();
  }, []);
  useEffect(() => {
    console.log("userInfo : ", userInfo);
  }, [flag]);

  switch (userInfo.permission) {
    case "USER":
      return <Profile_USER userInfo={userInfo} />;
    case "CREATOR":
      return <Profile_CREATOR userInfo={userInfo} />;
    default:
      return null;
  }

  // if (userInfo.permission === "USER") {
  //   //유저 타입별 조건부 랜더링
  //   return <Profile_USER userInfo={userInfo} />;
  // } else if (userInfo.permission === "CREATOR") {
  //   return <Profile_CREATOR userInfo={userInfo} />;
  // } else {
  //   return null;
  // }
}

export default Profile;
