import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "../App.css";

function Login_email() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const onLogin = async (e) => {
    e.preventDefault();
    const loginDTO = {
      email: email,
      password: password,
    };
    console.log(loginDTO);
    if (!email || !password) {
      alert("모든 입력칸을 채워주십시오");
      return;
    } else {
      try {
        const response = await fetch(baseURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginDTO),
        });

        if (!response.ok) {
          if (response.status === 400) {
            alert("아이디 또는 패스워드가 틀렸습니다.");
            return;
          } else {
            alert("로그인에 실패했습니다.");
            return;
          }
        }

        const data = await response.json();
        console.log("response received", data);
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        alert("추카포카^^&&~**% 로그인 성공");
      } catch (error) {
        console.error("Error occurred during login:", error);
        alert("Error occurred " + error.message);
      }
    }
  };
  const baseURL = "http://sangsang2.kr:8080/api/member/login";
  return (
    <div id="mobile-view">
      <form onSubmit={onLogin}>
        <div>
          <span>이메일</span>
          <input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <span>패스워드</span>
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default Login_email;
