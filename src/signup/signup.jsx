import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import "../login/login.css";
import "./signup1.css";
import styles from "../login/background.module.css";
import Modal from "react-modal";
Modal.setAppElement("#root");

function Signup1() {
  const navigate = useNavigate();
  const goBack = () => navigate("/");
  const [passW, setPassW] = useState("");
  const [email, setEmail] = useState("");
  const [rePassW, setRePassW] = useState("");
  const [verif, setVerif] = useState("");
  const [buttonTxt, setButtonTxt] = useState("인증하기");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [count, setCount] = useState(30);
  const [isCounting, setIsCounting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      alert("이메일 주소를 입력해 주십시오"); // 알림창 모달창으로 꾸며야 함
      return;
    } else {
      const verifDTO = { email };
      console.log(verifDTO);
      setIsButtonDisabled(true); // 버튼 비활성화
      setIsCounting(true);

      try {
        const response = await axios.post(baseURL, verifDTO, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("response received", response.data);
        console.log("인증번호가 이메일로 전송되었습니다.");
      } catch (error) {
        console.error("Error occurred during verification:", error);
        alert("인증번호 전송에 실패했습니다.");
      }
    }
  };

  const onSignup = async (e) => {
    // 회원가입 API 호출
    e.preventDefault();
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/;
    const baseURL = "https://sangsang2.kr:8080/api/member/signup";

    if (!passW || !email || !rePassW || !verif) {
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
        email,
        password: passW,
        checkPassword: rePassW,
        verification: verif,
      };
      console.log(signupDTO);
      try {
        const response = await axios.post(baseURL, signupDTO, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("response received", response.data);
        setIsModalOpen(true);
      } catch (error) {
        console.error("Error occurred during signup:", error);
        if (error.response && error.response.data) {
          const { error: errorMessage } = error.response.data;
          if (error.response.status === 400) {
            if (errorMessage === "이메일 중복") {
              alert("이미 사용 중인 이메일입니다. 다른 이메일을 입력하세요.");
            } else if (errorMessage === "비밀번호 일치하지 않음") {
              alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
            } else if (errorMessage === "유효하지 않은 인증코드") {
              alert("유효하지 않은 인증코드입니다.");
            } else {
              alert("회원가입에 실패했습니다."); // 다른 400 에러 처리
            }
          } else {
            alert("회원가입에 실패했습니다.");
          }
        } else {
          alert("회원가입에 실패했습니다.");
        }
      }
    }
  };
  const handleConfirm = () => {
    setIsModalOpen(false); // 모달 닫기
    navigate("/login"); // 홈으로 이동
  };

  return (
    <div id="mobile-view" className={styles.background}>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="로그인 성공"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>회원가입 성공</h2>
        <div className="modal-buttons">
          <button onClick={handleConfirm} className="confirm-btn">
            로그인
          </button>
        </div>
      </Modal>
      <div id="login-container">
        <form onSubmit={onSignup} id="login_Box">
          <img src="/logo.png" id="logo" />

          <div className="input_divider">
            <h1 id="greetingTxt">
              모먼트 클래스의
              <br /> 회원이 되어주세요.
            </h1>

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
              회원가입
            </button>
            <footer id="login-footer">
              <span id="login-footerTxt">이미 회원이신가요?</span>
              <Link to="/login" id="login-footerLink">
                로그인하기
              </Link>
            </footer>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup1;
