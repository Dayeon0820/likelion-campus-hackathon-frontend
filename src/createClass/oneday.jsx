import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "../App.css";
import "../profile/profile.css";
import "./createClass.css";
function CreateOnedayClass() {
  const navigate = useNavigate();
  const location = useLocation();
  const classInfo2 = location.state?.classInfo2;
  const token = localStorage.getItem("token");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [finTime, setFinTime] = useState("");
  const [number, setNumber] = useState(0);
  const title = classInfo2.title;
  const category = classInfo2.category;
  const image = classInfo2.image;
  const subtitle = classInfo2.subtitle;
  const type = classInfo2.type;
  const price = classInfo2.price;
  const address = classInfo2.address;
  const dateTimeString = date && startTime ? `${date}T${startTime}:00` : ""; // 기본값 처리
  const dateObject = dateTimeString ? new Date(dateTimeString) : null;

  const isoDateTime = dateObject ? dateObject.toISOString() : ""; // Date 객체가 null일 수 있음

  // 한국 시간대로  내일 날짜를 가져오기
  const getTomorrowDateKST = () => {
    const now = new Date();

    // 하루(24시간 * 60분 * 60초 * 1000밀리초)
    const oneDay = 24 * 60 * 60 * 1000;

    // 한국 시간대 (UTC+9)와 하루 더한 시간
    const kstOffset = 9 * 60 * 60 * 1000;
    const kstTomorrow = new Date(now.getTime() + kstOffset + oneDay);

    // YYYY-MM-DD 형식으로 변환
    const year = kstTomorrow.getUTCFullYear();
    const month = String(kstTomorrow.getUTCMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = String(kstTomorrow.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`; // 공백 없이 YYYY-MM-DD 형식으로 반환
  };
  useEffect(() => {
    console.log(classInfo2);
  }, []);
  const requestDTO = {
    name: title,
    description: subtitle,
    price: price,
    type: type,
    member_limit: number,
    dateTime: isoDateTime,
    location: address,
  };
  useEffect(() => {
    console.log("requestDTO: ", requestDTO);
  }, [Date, startTime, finTime]);
  // 클래스 생성 API 호출
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const baseUrl = "http://sangsang2.kr:8080/api/lecture/create";

    formData.append(
      "lecture",
      new Blob([JSON.stringify(requestDTO)], { type: "application/json" })
    );
    if (image) {
      formData.append("images", image, image.name);
    }

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
          if (data.error === "사용자 찾을 수 없음") {
            alert("사용자를 찾을 수 없습니다.");
          } else if (data.error === "접근 권한 없음") {
            alert("클래스 생성 권한이 없습니다.");
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
      <div id="default-padding">
        <header className="app-header header_3components">
          <img
            src="/arrow.png"
            id="header-arrowIcon"
            onClick={() => navigate("/create_class2")}
          />
          <div id="chatting-title">
            <h1>클래스 개최하기</h1>
          </div>
          <span></span>
        </header>
        <h1 className="createclass-title">날짜와 시간을 설정해주세요</h1>

        <form id="createClass-main" onSubmit={onSubmit}>
          <span className="createclass-txt">날짜 설정하기</span>
          <div className="createInput-box">
            <input
              type="date"
              id="createclass-date-input"
              min={getTomorrowDateKST()}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </div>
          <span className="createclass-txt">시간 설정하기</span>
          <div className="createInput-box inputBox-white">
            <label
              className="createclass-input_lable"
              htmlFor="createclass-time-input"
            >
              시작하는 시간
            </label>
            <input
              type="time"
              id="createclass-time-input"
              onChange={(e) => {
                setStartTime(e.target.value);
              }}
            />
          </div>
          <div className="createInput-box inputBox-white">
            <label
              className="createclass-input_lable"
              htmlFor="createclass-time-input"
            >
              끝나는 시간
            </label>
            <input
              type="time"
              id="createclass-time-input"
              onChange={(e) => {
                setFinTime(e.target.value);
              }}
            />
          </div>
          <h1 className="createclass-title">몇 명이 참여 가능한가요?</h1>
          <span className="createclass-txt">참여 가능 인원 수</span>
          <div className="createInput-box">
            <input
              type="number"
              className="createclass-input"
              placeholder="참가 인원"
              min={1}
              onChange={(e) => {
                setNumber(e.target.value);
              }}
            />
          </div>
          <button className="nextBtn">클래스 개최하기</button>
        </form>
      </div>
    </div>
  );
}

export default CreateOnedayClass;
