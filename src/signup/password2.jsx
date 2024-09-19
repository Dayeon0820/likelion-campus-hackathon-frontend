import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../apiClient"; // apiClient 임포트
import "../App.css";
import "../login/login.css";
import "../login/input.css";
import "./signup1.css";
import styles from "../login/background.module.css";

function PassWord2() {
  const navigate = useNavigate();
  const goBack = () => navigate("/");
  const [passW, setPassW] = useState("");
  const [rePassW, setRePassW] = useState("");
  const token = localStorage.getItem("token");

  const onSignup = async (e) => {
    // 비밀번호 변경 API 호출
    e.preventDefault();
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/;
    const baseURL = "https://sangsang2.kr:8080/api/member/change-password";

    if (!passW || !rePassW) {
      alert("모든 입력칸을 채워주십시오");
      return;
    } else if (!passwordPattern.test(passW)) {
      alert(
        "비밀번호는 최소 8자 이상이어야 하며, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다."
      );
      return;
    } else if (passW !== rePassW) {
      alert("비밀번호가 일치하지 않습니다");
      return;
    } else {
      const passwordDTO = {
        newPassword: passW,
        checkNewPassword: rePassW,
      };
      console.log(passwordDTO);
      try {
        await apiClient(baseURL, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: passwordDTO,
        });
        alert("비밀번호가 변경되었습니다.");
        navigate("/profile");
      } catch (error) {
        alert("비밀번호 변경에 실패했습니다: " + error.message);
        navigate("/profile");
      }
    }
  };

  return (
    <div id="mobile-view" className={styles.background}>
      <div id="login-container">
        <form onSubmit={onSignup} id="login_Box">
          <img src="/logo.png" id="logo" />

          <div className="input_divider ">
            <h1 id="greetingTxt">비밀번호 변경하기</h1>

            <div className="login-inputBox">
              <span className="inputBox_txt">비밀번호</span>
              <input
                type="password"
                required
                onChange={(e) => setPassW(e.target.value)}
                placeholder="대.소문자, 숫자, 특수문자 포함 8자리 이상"
                className="inputBox_input"
              />
            </div>
            <div className="login-inputBox">
              <span className="inputBox_txt">비밀번호 확인</span>
              <input
                type="password"
                required
                onChange={(e) => setRePassW(e.target.value)}
                placeholder="비밀번호를 다시 한번 입력해주세요"
                className="inputBox_input"
              />
            </div>
          </div>
          <div className="input_divider" id="signup-footerBox">
            <button type="submit" className="submitBTN">
              변경하기
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

export default PassWord2;
