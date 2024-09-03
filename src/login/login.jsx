import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "../App.css";
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const gotoLogin = () => navigate("/EmailLogin");
  return (
    <div id="mobile-view">
      <div id="login-container">
        <h1 id="logo">로고</h1>
        <div id="login_btnBox">
          <Link to="/signup1">회원가입 하기</Link>

          <button className="loginBtn" onClick={gotoLogin}>
            이메일 로그인
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
