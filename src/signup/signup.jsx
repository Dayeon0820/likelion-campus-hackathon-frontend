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
  const [buttonTxt, setButtonTxt] = useState("인증코드 받기");
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
    const baseURL = "http://sangsang2.kr:8080/api/member/send-verification";
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
    const baseURL = "http://sangsang2.kr:8080/api/member/signup";

    if (!passW || !email || !rePassW || !Verif) {
      alert("모든 입력칸은 채워주십시오");
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
      const signupDTO = {
        email: email,
        password: passW,
        checkPassword: rePassW,
        verification: Verif,
      };
      console.log(signupDTO);
      try {
        const response = await fetch(baseURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupDTO),
        });
        if (!response.ok) {
          if (response.status === 400) {
            alert("인증코드가 일치하지 않습니다");
            return;
          } else {
            alert("회원가입에 실패했습니다.");
            return;
          }
        }

        const data = await response.text();
        console.log("response received", data);
        alert("회원가입 되었습니다. 다시 로그인해 주세요");
        navigate("/");
      } catch (error) {
        console.error("Error occurred during signup:", error);
        alert("Error occurred" + error.message);
      }
    }
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
        <button
          id="verification_btn"
          onClick={getVerifEmail}
          disabled={isButtonDisabled}
        >
          {buttonTxt}
        </button>

        <button type="submit" className="submitBtn">
          <FontAwesomeIcon icon={faCheck} />
        </button>
      </form>
    </div>
  );
}

export default Signup1;
