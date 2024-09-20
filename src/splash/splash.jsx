import { React, useState, useEffect } from "react";
import "./splash.css";

const Splash = () => {
    const [showWhiteLogo, setShowWhiteLogo] = useState(false);
    const [animationFinished, setAnimationFinished] = useState(false);

    useEffect(() => {
        // 애니메이션이 끝났는지 확인
        if (animationFinished) {
            const timer = setTimeout(() => {
                setShowWhiteLogo(true);
            }, 3000); // 3초 후에 화이트 로고로 전환

            return () => clearTimeout(timer); // 컴포넌트가 언마운트 될 때 타이머 클리어
        }
    }, [animationFinished]);

    const handleAnimationEnd = () => {
        setAnimationFinished(true); // 애니메이션이 끝났다고 설정
    };

    return (
        <div id="mobile-view" className="splashBg">
            {!showWhiteLogo ? (
                <div className="splashLogoSmall" onAnimationEnd={handleAnimationEnd}></div>
            ) : (
                <div className="splashLogoWhite"></div>
            )}
        </div>
    );
}

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
