import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../apiClient"; // apiClient 임포트
import "../App.css";
import "./login.css";
import "./input.css";
import styles from "./background.module.css";

function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const loginDTO = {
      email: email,
      password: password,
    };
    const baseURL = "https://sangsang2.kr:8080/api/member/login";
    console.log(loginDTO);
    if (!email || !password) {
      alert("모든 입력칸을 채워주십시오");
      return;
    }

    try {
      const data = await apiClient(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: loginDTO,
      });

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      alert("로그인 성공");
      navigate("/home");
    } catch (error) {
      if (error.message.includes("비밀번호가 일치하지 않음")) {
        alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
      } else if (error.message.includes("사용자 찾을 수 없음")) {
        alert("사용자를 찾을 수 없습니다");
      } else {
        alert("로그인에 실패했습니다.");
      }
      console.error("Error occurred during login:", error);
    }
  };

  return (
    <div id="mobile-view" className={styles.background}>
      <div id="login-container">
        <form onSubmit={onLogin} id="login_Box">
          <img src="/logo.png" id="logo" />

          <div className="input_divider">
            <h1 id="greetingTxt">
              모먼트 클래스에
              <br /> 오신걸 환영합니다.
            </h1>
            <div className="login-inputBox">
              <span className="inputBox_txt">이메일</span>
              <input
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="inputBox_input"
              />
            </div>
            <div className="login-inputBox">
              <span className="inputBox_txt">비밀번호</span>
              <input
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="inputBox_input"
              />
            </div>
          </div>
          <div className="input_divider">
            <button type="submit" className="submitBTN">
              <span>로그인</span>
            </button>
            <footer id="login-footer">
              <span id="login-footerTxt">아직 계정이 없으신가요?</span>
              <Link to="/signup1" id="login-footerLink">
                회원가입
              </Link>
            </footer>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
