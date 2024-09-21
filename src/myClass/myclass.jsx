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
    const baseUrl =
      "https://sangsang2.kr:8080/api/lecture/own?permission=CREATOR";

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

    console.log(data,'data')

    const formattedData = data.map((course,i) => {
      console.log(course.imageUrl,i, 'course imageUrl'); // 디버깅 로그 추가
      const imageUrl = course.imageUrl && Array.isArray(course.imageUrl) && course.imageUrl.length > 0
        ? course.imageUrl[0].imageUrl
        : defaultImageUrl;
      
      return {
        id: course.id,
        name: course.name,
        type: course.type,
        price: course.price,
        imageUrls: imageUrl,
      };
    });

      setCourses(formattedData);
      console.log(formattedData, 'formattedData');
    } catch (error) {
      console.error("Error occurred during delete:", error);
      alert("Error occurred " + error.message);
    }
  };

  const onDeleteClass = async (id) => {
    const baseUrl = `https://sangsang2.kr:8080/api/lecture/delete/${id}`;
    console.log("id: ", id);
    try {
      const response = await fetch(baseUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        alert("강의 삭제에 실패했습니다.");
        console.log("Error Data:", response);
        closeModal();
        return;
      }
      const data = await response.text();
      closeModal();
      console.log("delete classroom success: ", data);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting classroom:", error);
      closeModal();
    }
  };

  return (
    <div id="mobile-view">
      <header className="app-header profileHeader defaultHeader">
        <Link to="/profile">
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </Link>
        <h3>나의 클래스</h3>
      </header>
      <main id="default-padding" className="profileMain">
        <div id="myclass-header">
          <h3>내가 생성한 클래스</h3>
        </div>
        <section className="myclass-main myclass-gridBox">
          {courses.map((course) => (
            <div 
            key={course.id} 
            className="myclass-box"
            onClick = {()=> navigate(`/home/class_application/${course.id}`)}
            >
              <img
                src={course.imageUrls}
                alt={course.name}
                className="myclass-box_img"
              />
              <h4 className="myclass-box_title">{course.name}</h4>
              <span className="myclass-box_price">
                ${course.price.toLocaleString()}
              </span>
              <div className="myclass-box_type">
                <span>{course.type === "Regular" ? "정규" : "원데이"}</span>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Myclass;