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
  const [passW, setpassW] = useState("");
  const [email, setEmail] = useState("");
  const [rePassW, setRePassW] = useState("");
  const [Verif, setVerif] = useState("");
  const getVerifEmail = async (e) => {
    e.preventDefault();
    const baseURL = "http://sangsang2.kr:8080/api/member/send-verification";
    if (!email) {
      alert("이메일 주소를 입력해 주십시오"); //알림창 모달창으로 꾸며야함
      return;
    } else {
      const verifDTO = {
        email: email,
      };
      console.log(verifDTO);
      try {
        const response = await fetch(baseURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(verifDTO),
        });
        if (!response.ok) {
          alert("인증번호 전송에 실패했습니다.");
          return;
        }

        const data = await response.json();
        console.log("response received", data);
        alert("인증번호가 이메일로 전송되었습니다.");
      } catch (error) {
        console.error("Error occurred during signup:", error);
        alert("Error occurred" + error.message);
      }
    }
  };
  const onSignup = (e) => {
    e.preventDefault();
    console.log(passW, email, rePassW, Verif);
  };
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
      <form id="signup-form" onSubmit={onSignup}>
        <div id="signup-inputBox">
          <span className="input_txt">이메일</span>
          <input
            className="signup-input"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div id="signup-inputBox">
          <span className="input_txt">비밀번호</span>
          <input
            className="signup-input"
            onChange={(e) => setpassW(e.target.value)}
            type="password"
            required
          />
        </div>
        <div id="signup-inputBox">
          <span className="input_txt">비밀번호 확인</span>
          <input
            className="signup-input"
            type="password"
            onChange={(e) => setRePassW(e.target.value)}
            required
          />
        </div>
        <div id="signup-inputBox">
          <span className="input_txt">인증번호</span>
          <input
            className="signup-input"
            type="text"
            required
            onChange={(e) => setVerif(e.target.value)}
          />
        </div>
        <button id="verification_btn" onClick={getVerifEmail}>
          인증코드 받기
        </button>

        <button type="submit" className="submitBtn">
          <FontAwesomeIcon icon={faCheck} />
        </button>
      </form>
    </div>
  );
}

export default Signup1;
