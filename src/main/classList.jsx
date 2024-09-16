// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Navbar from "./navbar";
// import "./css/class_list.css";

// const ClassList = () => {
//     const [classData, setClassData] = useState([]);
//     const navigate = useNavigate();
//     const categories = ["전체", "요리", "미술", "공예", "플라워", "뷰티", "음악", "운동"];

//     // API에서 강의 데이터를 불러오는 함수
//     const fetchClassData = async () => {
//         try {
//             const response = await fetch("http://sangsang2.kr:8080/api/lecture/all");
//             const data = await response.json();
//             console.log("API Response Data:", data); 
//             // 데이터 변환
//             const transformedData = data.map((lecture) => ({
//                 id: lecture.id,
//                 title: lecture.name,
//                 price: `₩${lecture.price.toLocaleString()}`, // 가격을 원화 형식으로 변환
//                 image: lecture.imageUrl[0]?.imageUrl || "https://via.placeholder.com/100" // 첫 번째 이미지 URL
//             }));
//             setClassData(transformedData);
//         } catch (error) {
//             console.error("Error fetching class data:", error);
//         }
//     };

//     useEffect(() => {
//         fetchClassData();
//     }, []);

//     const handleClassItemClick = (id) => {
//         // 선택한 클래스를 ID로 URL을 구성
//         navigate(`/home/class_application?id=${id}`);
//     };

//     return (
//         <div id="mobile-view">
//             <header className="classListHeader">
//                 <div className="headerTop">
//                     <Link to="/home">
//                         <span className="material-symbols-outlined">arrow_back_ios</span>
//                     </Link>
//                     <select name="" className="classSelect">
//                         <option value="allClass" className="allClass">전체</option>
//                         <option value="regularClass" className="regularClass">정규</option>
//                         <option value="onedayClass" className="onedayClass">원데이</option>
//                     </select>
//                 </div>
//                 <div className="headerCategories">
//                     <p className="categoryTxt categoryTitle">카테고리</p>
//                     <ul className="categoryList">
//                         {categories.map((list, i) => (
//                             <li key={i} className={`${i === 0 ? "active" : ""} categoryTxt`}>
//                                 {list}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </header>
//             <main className="classListMain">
//                 <section className="classListContainer">
//                     {classData.map((classItem) => (
//                         <div
//                             key={classItem.id}
//                             className="classItem"
//                             onClick={() => handleClassItemClick(classItem.id)}
//                         >
//                             <img src={classItem.image} className="classImage" alt={classItem.title} />
//                             <div className="classInfo">
//                                 <h4 className="classTitle">{classItem.title}</h4>
//                                 <p className="classPrice">{classItem.price}</p>
//                             </div>
//                         </div>
//                     ))}
//                 </section>
//             </main>
//             <Navbar />
//         </div>
//     );
// }

// export default ClassList;


import {React, useState, useEffect } from "react-dom";
import { Link, useNavigate, NavLink } from "react-router-dom";
import Navbar from "./navbar";
import "./css/class_list.css";

const ClassList = () =>{
    const navigate = useNavigate();
    const categories = ["전체", "요리", "미술", "공예", "플라워", "뷰티", "음악", "운동"];
    const classData = [/* API 호출 전에 그리드 확인용 */
        { id: 1, title: "요리 클래스", price: "₩30,000", image: "https://via.placeholder.com/100" },
        { id: 2, title: "미술 클래스", price: "₩50,000", image: "https://via.placeholder.com/100" },
        { id: 3, title: "공예 클래스", price: "₩40,000", image: "https://via.placeholder.com/100" },
        { id: 4, title: "플라워 클래스", price: "₩60,000", image: "https://via.placeholder.com/100" },
        { id: 5, title: "뷰티 클래스", price: "₩25,000", image: "https://via.placeholder.com/100" },
        { id: 6, title: "음악 클래스", price: "₩35,000", image: "https://via.placeholder.com/100" },
        { id: 7, title: "음악 클래스", price: "₩35,000", image: "https://via.placeholder.com/100" },
        { id: 8, title: "음악 클래스", price: "₩35,000", image: "https://via.placeholder.com/100" },
        { id: 9, title: "음악 클래스", price: "₩35,000", image: "https://via.placeholder.com/100" },
        { id: 10, title: "음악 클래스", price: "₩35,000", image: "https://via.placeholder.com/100" },
    ];
    const handleClassItemClick = (id) => {
        // 선택한 클래스를 ID로 URL을 구성
        navigate(`/home/class_application?id=${id}`);
    };

    return(
        <div id="mobile-view">
            <header className="classListHeader">
                <div className="headerTop"> 
                    <Link to="/home">
                        <span className="material-symbols-outlined">arrow_back_ios</span>
                    </Link>                   
                    <select name="" className="classSelect">
                        <option value="allClass" className="allClass">전체</option>
                        <option value="regularClass" className="regularClass">정규</option>
                        <option value="onedayClass" className="onedayClass">원데이</option>
                    </select>
                </div>    
                <div className="headerCategories">                        
                    <p className="categoryTxt categoryTitle">카테고리</p>
                    <ul className="categoryList">
                        {categories.map((list, i) => {
                            return(
                                <li key={i} className={`${i === 0 ? "active" : " "} categoryTxt`}>{list}</li>
                            )                            
                        })}
                    </ul>
                </div>     
            </header>
            <main className="classListMain">
                <section className="classListContainer">
                    {classData.map((classItem) => (
                        <div 
                        key={classItem.id} 
                        className="classItem"
                        onClick={() => handleClassItemClick(classItem.id)}
                        >
                            <img src={classItem.image} className="classImage" />
                            <div className="classInfo">
                                <h4 className="classTitle">{classItem.title}</h4>
                                <p className="classPrice">{classItem.price}</p>
                            </div>
                        </div>
                    ))}
                </section>
                
            </main>
            <Navbar></Navbar>
        </div>
    )
}

export default ClassList;