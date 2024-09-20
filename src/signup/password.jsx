import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../apiClient"; // apiClient 임포트
import "../App.css";
import "../login/login.css";
import "../login/input.css";
import "./signup1.css";
import styles from "../login/background.module.css";

function PassWord() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [Verif, setVerif] = useState("");
  const [buttonTxt, setButtonTxt] = useState("인증하기");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [count, setCount] = useState(30);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    // 30초 카운트 다운
    let intervalId;
    if (isCounting) {
      intervalId = setInterval(() => setCount((current) => current - 1), 1000);
    }
    if (count === 0) {
      clearInterval(intervalId);
      setIsCounting(false);
      setButtonTxt("인증 번호 재발급");
      setIsButtonDisabled(false);
      setCount(30);
    }
    return () => clearInterval(intervalId);
  }, [isCounting, count]);

  useEffect(() => {
    // count가 변할 때마다 버튼 텍스트 업데이트
    if (isCounting && count > 0) {
      setButtonTxt(`${count}초 후 재발급 가능`);
    }
  }, [count, isCounting]);

  const getVerifEmail = async (e) => {
    // 인증번호 API 호출
    e.preventDefault();
    const baseURL = "https://sangsang2.kr:8080/api/member/send-verification";
    if (!email) {
      alert("이메일 주소를 입력해 주십시오");
      return;
    } else {
      const verifDTO = { email };
      setIsButtonDisabled(true); // 버튼 비활성화
      setIsCounting(true);

      try {
        await apiClient(baseURL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(verifDTO),
        });
        alert("인증번호가 이메일로 전송되었습니다.");
      } catch (error) {
        alert("인증번호 전송에 실패했습니다: " + error.message);
      }
    }
  };

  const onSignup = async (e) => {
    // 이메일 인증 API 호출
    e.preventDefault();
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/;
    const baseURL = "https://sangsang2.kr:8080/api/member/verify";

    if (!email || !Verif) {
      alert("모든 입력칸을 채워주십시오");
      return;
    } else {
      const emailDTO = { email, verification: Verif };

      try {
        await apiClient(baseURL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(emailDTO),
        });
        navigate("/password2");
      } catch (error) {
        alert("이메일 인증에 실패했습니다: " + error.message);
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
              <span className="inputBox_txt">이메일</span>
              <div id="email-input">
                <input
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일을 입력하세요"
                  className="inputBox_input"
                />
                <button
                  id="verification_btn"
                  onClick={getVerifEmail}
                  disabled={isButtonDisabled}
                >
                  {buttonTxt}
                </button>
              </div>
            </div>
            <div className="login-inputBox">
              <span className="inputBox_txt">인증번호</span>
              <input
                type="text"
                required
                onChange={(e) => setVerif(e.target.value)}
                className="inputBox_input"
                placeholder="전송된 인증번호를 입력해주세요"
              />
            </div>
          </div>
          <div className="input_divider" id="signup-footerBox">
            <button type="submit" className="submitBTN">
              인증하기
            </button>
            <footer id="login-footer">
              <span id="login-footerTxt">돌아가기</span>
              <Link to="/edit_profile2" id="login-footerLink">
                마이페이지
              </Link>
            </footer>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PassWord;
