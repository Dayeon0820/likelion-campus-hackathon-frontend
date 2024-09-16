import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "../App.css";
import "../profile/profile.css";
import "./createClass.css";
function CreateRegularClass() {
  const navigate = useNavigate();
  const location = useLocation();
  const classInfo = location.state.classInfo;
  const [startDate, setStartDate] = useState(null);
  const [finDate, setFindate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [finTime, setFinTime] = useState(null);
  const classInfo2 = {
    startDate: startDate,
    finDate: finDate,
    startTime: startTime,
    finTime: finTime,
  };
  useEffect(() => {
    console.log(classInfo2);
  }, [startDate, finDate, startTime, finTime]);
  useEffect(() => {
    console.log(classInfo);
  }, []);
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

        <form id="createClass-main">
          <div className="regular-Box">
            <div className="regular-Box_column">
              <span className="createclass-txt">시작일 설정하기</span>
              <div className="createInput-box">
                <input
                  type="date"
                  id="createclass-date-input"
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="regular-Box_column">
              <span className="createclass-txt">마감일 설정하기</span>
              <div className="createInput-box">
                <input
                  type="date"
                  id="createclass-date-input"
                  onChange={(e) => {
                    setFindate(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <span className="createclass-txt">반복 일정 설정하기</span>
          <div className="createInput-box">
            <input type="text" id="createclass-date-input" />
          </div>

          <div className="regular-Box">
            <div className="regular-Box_column">
              <span className="createclass-txt">시작하는 시간</span>
              <div className="createInput-box  inputBox-white">
                <input
                  type="time"
                  className="createclass-time-input2"
                  onChange={(e) => {
                    setStartTime(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="regular-Box_column">
              <span className="createclass-txt">끝나는 시간</span>
              <div className="createInput-box  inputBox-white">
                <input
                  type="time"
                  className="createclass-time-input2"
                  onChange={(e) => {
                    setFinTime(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          <h1 className="createclass-title">몇 명이 참여 가능한가요?</h1>
          <span className="createclass-txt">참여 가능 인원 수</span>
          <div className="createInput-box">
            <input
              type="number"
              className="createclass-input"
              placeholder="참가 인원"
            />
          </div>
          <button className="nextBtn">클래스 개최하기</button>
        </form>
      </div>
    </div>
  );
}

export default CreateRegularClass;
