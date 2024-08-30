import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "../App.css";
import "./signup1.css";

function Signup1() {
  const navigate = useNavigate();
  const goBack = () => navigate("/");
  return (
    <div id="mobile-view">
      <div id="signup_header">
        <div className="signup_header-devider" onClick={goBack}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <div className="signup_header-devider">
          <h1>회원가입</h1>
        </div>
        <div className="signup_header-devider"></div>
      </div>
      <form id="signup-form">
        <div id="signup-inputBox">
          <span className="input_txt">이메일</span>
          <input className="signup-input" type="email" required />
        </div>
        <div id="signup-inputBox">
          <span className="input_txt">비밀번호</span>
          <input className="signup-input" type="password" required />
        </div>
        <div id="signup-inputBox">
          <span className="input_txt">비밀번호 확인</span>
          <input className="signup-input" type="password" required />
        </div>
        <button id="verification_btn">인증코드 받기</button>
        <div id="signup-inputBox">
          <span className="input_txt">인증번호</span>
          <input className="signup-input" type="text" required />
        </div>
        <footer>
          <button type="submit" className="submitBtn">
            <FontAwesomeIcon icon={faCheck} />
          </button>
        </footer>
      </form>
    </div>
  );
}

export default Signup1;
