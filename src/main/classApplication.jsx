import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "./navbar";
import "./css/class_application.css";

const ClassApplication = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // URL에서 id 가져오기

  useEffect(() => {
    console.log(id);
  }, []);
  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await fetch(
          `http://sangsang2.kr:8080/api/lecture/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Response status:", response.status); // 응답 상태 확인
        const data = await response.json();
        console.log("Fetched data:", data); // 응답 데이터 확인
        setClassData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching class data:", error);
        setLoading(false);
      }
    };

    fetchClassData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!classData) {
    return <div>No data available</div>;
  }

  const {
    name,
    description,
    price,
    type,
    member_limit,
    startTime,
    endTime,
    date,
    startDate,
    endDate,
    daysOfWeek,
    latitude,
    longitude,
    address,
    detailAddress,
    category,
    averageScore,
    scoreCount,
    imageUrl,
  } = classData;

  return (
    <div id="mobile-view">
      <header className="app-header applicationHeader defaultHeader">
        <Link to="/home/class_list">
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </Link>
      </header>
      <main id="classApplicationMain">
        <div className="classBanner">
          <img
            src={
              imageUrl && imageUrl.length > 0
                ? imageUrl[0].imageUrl
                : "./img/class_application_banner.svg"
            }
            alt="Class Banner"
            className="banner-image"
          />
        </div>
        <section className="classApplicationSection">
          <div className="titleContainer">
            <Link to="/home/class_application/review" className="classRating">
              <span className="star">⭐</span> {averageScore} ({scoreCount})
            </Link>
            <h3 className="classTitle">{name}</h3>
            <p className="classDate">
              {type === "Regular" ? date : `${startDate} - ${endDate}`}
            </p>
            <p className="classDescription">{description}</p>
          </div>
          <div className="classLocationBox classInfoBox">
            <p className="locationTxt">위치</p>
            <p>
              {address} {detailAddress}
            </p>
          </div>
          <div className="classCapacityBox classInfoBox">
            <p className="capacityTxt">클래스 인원 수</p>
            <p>{member_limit}</p>
          </div>
          <div className="classParkingBox classInfoBox">
            <p className="parkingTxt">가격</p>
            <p>{price}</p>
          </div>
        </section>
      </main>
      <div className="applicationBtnBox">
        <button
          className="applicationBtn"
          onClick={() => navigate(`/home/class_application/detail/${id}`, { state: { classData } })}
        >
          신청하기
        </button>
        <button className="chatBtn" onClick={() => navigate("/chats")}></button>
      </div>
    </div>
  );
};

export default ClassApplication;