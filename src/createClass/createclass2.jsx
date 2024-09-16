import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "../App.css";
import "../profile/profile.css";
import "./createClass.css";

function CreateClass2() {
  const navigate = useNavigate();
  const location = useLocation();
  const classInfo = location.state?.classInfo;
  const [type, setType] = useState("regular");
  const [price, setPrice] = useState("0");
  const [address, setAddress] = useState("");
  useEffect(() => {
    console.log("classInfo in 2", classInfo);
  }, []);

  const title = classInfo.title;
  const category = classInfo.category;
  const image = classInfo.image;
  const subtitle = classInfo.subtitle;

  const classInfo2 = {
    type: type,
    price: price,
    title: title,
    category: category,
    subtitle: subtitle,
    image: image,
    address: address,
  };

  useEffect(() => {
    console.log(classInfo2);
  }, [price]);

  const goNext = () => {
    if (type === "" || price === "" || address === "") {
      alert("클래스 종류, 가격, 주소를 입력해주세요");
    } else if (type === "regular") {
      navigate("/create_class/regular", { state: { classInfo2 } });
    } else if (type === "oneday") {
      navigate("/create_class/oneday", { state: { classInfo2 } });
    } else {
      return;
    }
  };
  return (
    <div id="mobile-view">
      <div id="default-padding">
        <header className="app-header header_3components">
          <img
            src="/arrow.png"
            id="header-arrowIcon"
            onClick={() => navigate("/create_class")}
          />
          <div id="chatting-title">
            <h1>클래스 개최하기</h1>
          </div>
          <span></span>
        </header>
        <form id="createClass-main">
          <span className="createclass-txt">클래스 종류</span>
          <div className="createInput-box  inputBox-white">
            <label className="createclass-input_lable" htmlFor="regular">
              정규
            </label>
            <input
              className="createclass-input"
              name="classtype"
              type="radio"
              value="regular"
              id="regular"
              checked
              onChange={(e) => {
                setType(e.target.value);
              }}
            />
          </div>
          <div className="createInput-box inputBox-white">
            <label className="createclass-input_lable" htmlFor="oneday">
              원데이
            </label>
            <input
              className="createclass-input"
              type="radio"
              value="oneday"
              name="classtype"
              id="oneday"
              onChange={(e) => {
                setType(e.target.value);
              }}
            />
          </div>
          <span className="createclass-txt">클래스 가격</span>
          <div className="createInput-box ">
            <input
              className="createclass-input"
              placeholder="가격"
              type=" text"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <span className="createclass-txt">강의실 주소</span>
          <div className="createInput-box ">
            <input
              className="createclass-input"
              placeholder="주소 입력"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              type=" text"
            />
            <button id="addressBtn" disabled>
              검색
            </button>
          </div>{" "}
          <div className="createInput-box  inputBox-white">
            <input
              className="createclass-input"
              placeholder="기본 주소"
              type=" text"
            />
          </div>
          <div className="createInput-box  inputBox-white">
            <input
              className="createclass-input"
              placeholder="상세 주소"
              type=" text"
            />
          </div>
        </form>
        <button className="nextBtn" onClick={goNext}>
          다음
        </button>
      </div>
    </div>
  );
}

export default CreateClass2;
