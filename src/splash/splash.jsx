import { React, useState, useEffect } from "react";
import "./splash.css";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const [showWhiteLogo, setShowWhiteLogo] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);
  const [hideSplash, setHideSplash] = useState(false); // 스플래시 화면 숨김 여부
  const navigate = useNavigate();

  useEffect(() => {
    if (showWhiteLogo) {
      // 3초 후에 로컬스토리지에서 토큰 확인
      const timer = setTimeout(() => {
        const token = localStorage.getItem("token");
        if (token) {
          navigate("/home"); // 홈 화면으로 네비게이트
        } else {
          navigate("/login"); // 로그인 페이지로 이동
        }
      }, 1500); // 스플래시 화면을 3초 동안 보여줌

      return () => clearTimeout(timer);
    }
  }, [showWhiteLogo, navigate]);

  useEffect(() => {
    // 애니메이션이 끝났는지 확인
    if (animationFinished) {
      const timer = setTimeout(() => {
        setShowWhiteLogo(true);
      }, 1000); // 3초 후에 화이트 로고로 전환

      return () => clearTimeout(timer); // 컴포넌트가 언마운트 될 때 타이머 클리어
    }
  }, [animationFinished]);

  const handleAnimationEnd = () => {
    setAnimationFinished(true); // 애니메이션이 끝났다고 설정
  };

  useEffect(() => {
    if (showWhiteLogo) {
      // 2초 후 스플래시 화면을 서서히 사라지게 함
      const timer = setTimeout(() => {
        setHideSplash(true); // 스플래시 화면을 숨김
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [showWhiteLogo]);

  return (
    <div
      id="mobile-view"
      className={`splashBg ${hideSplash ? "fade-out" : ""}`} // fade-out 클래스 적용
    >
      {!showWhiteLogo ? (
        <div
          className="splashLogoSmall"
          onAnimationEnd={handleAnimationEnd}
        ></div>
      ) : (
        <div id="linear-box">
          <div className="splashBox">
            <div className="splashLogoWhite"></div>
            <h1>
              MOMENT
              <br />
              CLASS
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Splash;

// import { React, useState, useEffect, useRef } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import "./splash.css";

// const Splash = () => {

//     return(
//         <div id="mobile-view" className="splashBg">
//             <div
//                 className= "splashLogoSmall"></div>
//             <div className="splashLogoWhite"></div>
//         </div>
//     );
// }

// export default Splash;

// import { React, useState, useEffect, useRef } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import "./splash.css";

// const Splash = () => {

//     return(
//         <div id="mobile-view" className="splashBg">
//             <div
//                 className= "splashLogoSmall"></div>
//             <div className="splashBoxLogo"></div>
//             {/* <div className="splashBox">
//                 <div className="splashBoxLogo"></div>
//                 <h1>MOMENT<br/>CLASS</h1>
//             </div> */}
//         </div>
//     );
// }

// export default Splash;
