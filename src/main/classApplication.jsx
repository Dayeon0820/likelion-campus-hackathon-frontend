import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "./navbar";
import "./css/class_application.css";

const ClassApplication = () => {
    const navigate = useNavigate();
    const [classData, setClassData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams(); // URL에서 id 가져오기
    
    useEffect(() => {
        const fetchClassData = async () => {
            try {
                const response = await fetch(`http://sangsang2.kr:8080/api/lecture/${id}`);
                console.log('Response status:', response.status); // 응답 상태 확인
                const data = await response.json();
                console.log('Fetched data:', data); // 응답 데이터 확인
                setClassData(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching class data:", error);
                setLoading(false);
            }
        };

        fetchClassData();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!classData) {
        return <div>No data available</div>;
    }

    const {
        name,
        description,
        price,
        type,
        member_limit,
        startTime,
        endTime,
        date,
        startDate,
        endDate,
        daysOfWeek,
        latitude,
        longitude,
        address,
        detailAddress,
        category,
        averageScore,
        scoreCount,
        imageUrl
    } = classData;

    return (
        <div id="mobile-view">
            <header className="app-header applicationHeader defaultHeader">
                <Link to="/home/class_list">
                    <span className="material-symbols-outlined">arrow_back_ios</span>
                </Link>
            </header>
            <main id="classApplicationMain">
                <div className="classBanner">
                    <img
                        src={imageUrl && imageUrl.length > 0 ? imageUrl[0].imageUrl : "./img/class_application_banner.svg"}
                        alt="Class Banner"
                        className="banner-image"
                    />
                </div>
                <section className="classApplicationSection">
                    <div className="titleContainer">
                        <Link
                            to="/home/class_application/review" 
                            className="classRating">
                            <span className="star">⭐</span> {averageScore} ({scoreCount})
                        </Link>
                        <h3 className="classTitle">{name}</h3>
                        <p className="classDate">
                            {type === "Regular" ? date : `${startDate} - ${endDate}`}
                        </p>
                        <p className="classDescription">
                            {description}
                        </p>
                    </div>
                    <div className="classLocationBox classInfoBox">
                        <p className="locationTxt">위치</p>
                        <p>{address} {detailAddress}</p>
                    </div>
                    <div className="classCapacityBox classInfoBox">
                        <p className="capacityTxt">클래스 인원 수</p>
                        <p>{member_limit}</p>
                    </div>
                    <div className="classParkingBox classInfoBox">
                        <p className="parkingTxt">가격</p>
                        <p>{price}</p>
                    </div>
                </section>
            </main>
            <div className="applicationBtnBox">
                <button className="applicationBtn" onClick={() => navigate('/home/class_application/detail')}>신청하기</button>
                <button className="chatBtn" onClick={() => navigate('/chats')}></button>
            </div>
        </div>
    );
};

export default ClassApplication;


// import {React, useState, useEffect } from "react-dom";
// import { Link, useNavigate, NavLink } from "react-router-dom";
// import "./css/class_application.css";

// const ClassApplication = () => {
//     const navigate = useNavigate();
//     const handleApplicationClick = () => {
//         navigate('/home/class_application/detail')
//     }
//     const handleChatClick = () => {
//         navigate('/chats')
//     }

//     return(
//         <div id="mobile-view">
//             <header className="app-header applicationHeader defaultHeader">
//                 <Link to="/home/class_list">
//                     <span className="material-symbols-outlined">arrow_back_ios</span>
//                 </Link>
//             </header>
//             <main id="classApplicationMain">
//                 <div className="classBanner">
//                     <img
//                         src="./img/class_application_banner.svg" // 배너 이미지
//                         alt="Class Banner"
//                         className="banner-image"
//                     />
//                 </div>
//                 <section className="classApplicationSection">
//                     <div className="titleContainer">
//                         <Link
//                         to="/home/class_application/review" 
//                         className="classRating">
//                             <span className="star">⭐</span> 4.5 (1,500)
//                         </Link>
//                         <h3 className="classTitle">수채화로 풍경화 그리기! 내 그림을 액자로 만들어 보자~</h3>
//                         <p className="classDate">Sat, Dec 24, 2022 · 5:00 PM PST</p>
//                         <p className="classDescription">
//                             재미있고 편안한 그림 그리기를 통해 행복한 저녁을 같이 보내요
//                             수채화를 사용하여 아름다운 풍경을 그릴 예정입니다! 나만의 그림을 액자로 만들어 방을 꾸며보세요~
//                         </p>
//                     </div>
//                     <div className="classLocationBox classInfoBox">
//                         <p className="locationTxt">위치</p>
//                         <p>123 Main Street, San Francisco, CA</p>
//                     </div>
//                     <div className="classCapacityBox classInfoBox">
//                         <p className="capacityTxt">클래스 인원 수</p>
//                         <p>10/25</p>
//                     </div>
//                     <div className="classParkingBox classInfoBox">
//                         <p className="parkingTxt">가격</p>
//                         <p>$ 35000</p>
//                     </div>
//                 </section>
//             </main>
//             <div className="applicationBtnBox">
//                 <button className="applicationBtn" onClick = {handleApplicationClick}>신청하기</button>
//                 <button className="chatBtn" onClick = {handleChatClick}></button>
//             </div>
//         </div>
//     )
// }

// export default ClassApplication;