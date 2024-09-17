import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "../App.css";
import "../profile/profile.css";
import "./myclass.css";
import Navbar from "../main/navbar";
function Myclass() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [courses, setCourses] = useState([]);
  const defaultImageUrl = "/defaultclass.png";
  useEffect(() => {
    getclassList();
  }, []);
  const getclassList = async () => {
    const baseUrl = "http://sangsang2.kr:8080/api/lecture/own";
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
          } else {
            alert("클래스 내역 불러오기에 실패했습니다."); // 다른 404 에러 처리
          }
        } else {
          alert("클래스 내역 불러오기에 실패했습니다.");
        }
        return;
      }
      const formattedData = data.map((course) => ({
        id: course.id,
        name: course.name,
        type: course.type,
        price: course.price,
        imageUrls:
          course.imageUrl.length > 0
            ? course.imageUrl[0].imageUrl
            : defaultImageUrl,
      }));

      setCourses(formattedData);
      console.log(formattedData);
    } catch (error) {
      console.error("Error occurred during delete:", error);
      alert("Error occurred " + error.message);
    }
  };
  return (
    <div id="mobile-view">
      <div id="default-padding">
        <header className="app-header header_3components">
          <img
            src="/arrow.png"
            id="header-arrowIcon"
            onClick={() => {
              navigate("/profile");
            }}
          />
          <div id="chatting-title">
            <h1>나의클래스</h1>
          </div>
          <span></span>
        </header>
        <div id="myclass-header">
          <h1>참여 완료한 클래스</h1>
        </div>
        <main id="myclass-main">
          {courses.map((course) => (
            <div key={course.id} className="myclass-contentBox">
              <img
                src={course.imageUrls}
                alt={course.name}
                className="myclass-contentBox_img"
              />
              <h3>{course.name}</h3>
              <span>${course.price.toLocaleString()}</span>
              <div className="myclass-content_btnBox">
                <span>정규 수업</span>
                <button
                  className="myclass-reviewBtn"
                  onClick={() => {
                    navigate(`/makeReview?id=${course.id}`);
                  }}
                >
                  리뷰 작성하기
                </button>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}

export default Myclass;