import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "../App.css";
import "../login/login.css";
import "../login/input.css";
import "./signup1.css";
import styles from "../login/background.module.css";

function PassWord() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [rePassW, setRePassW] = useState("");
  const [Verif, setVerif] = useState("");
  const [buttonTxt, setButtonTxt] = useState("인증하기");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [count, setCount] = useState(30);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    //30초 카운트 다운
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
    //인증번호 api 불러오기
    e.preventDefault();
    const baseURL = "https://sangsang2.kr:8080/api/member/send-verification";
    if (!email) {
      alert("이메일 주소를 입력해 주십시오"); //알림창 모달창으로 꾸며야함
      return;
    } else {
      const verifDTO = {
        email: email,
      };
      console.log(verifDTO);
      setIsButtonDisabled(true); // 버튼 비활성화
      setIsCounting(true);

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
  const onSignup = async (e) => {
    //회원가입 api 불러오기
    e.preventDefault();
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/;
    const baseURL = "https://sangsang2.kr:8080/api/member/verify";

    if (!email || !Verif) {
      alert("모든 입력칸dmf 채워주십시오");
      return;
    } else {
      const emailDTO = {
        email: email,
        verification: Verif,
      };
      console.log(emailDTO);
      try {
        const response = await fetch(baseURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailDTO),
        });
        if (!response.ok) {
          const data = await response.json();
          if (response.status === 400) {
            if (data.error === "유효하지 않은 인증코드") {
              alert("유효하지 않은 인증코드입니다.");
            } else {
              alert("이메일 인증에 실패했습니다."); // 다른 400 에러 처리
            }
          } else {
            alert("이메일 인증에 실패했습니다.");
          }

          console.log("response received", data);
          return;
        }

        const data = await response.text();
        console.log("response received", data);
        navigate("/password2");
      } catch (error) {
        console.error("Error occurred during signup:", error);
        alert("Error occurred" + error.message);
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

export default PassWord;
