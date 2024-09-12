import {React, useState, useEffect } from "react-dom";
import Navbar from "./navbar"
import "./css/class_list.css";

const ClassList = () =>{
    const categories = ["전체", "요리", "미술", "공예", "플라워", "뷰티", "음악", "운동"];
    const classData = [/* API 호출 전에 그리드 확인용 */
        { id: 1, title: "요리 클래스", price: "₩30,000", image: "https://via.placeholder.com/100" },
        { id: 2, title: "미술 클래스", price: "₩50,000", image: "https://via.placeholder.com/100" },
        { id: 3, title: "공예 클래스", price: "₩40,000", image: "https://via.placeholder.com/100" },
        { id: 4, title: "플라워 클래스", price: "₩60,000", image: "https://via.placeholder.com/100" },
        { id: 5, title: "뷰티 클래스", price: "₩25,000", image: "https://via.placeholder.com/100" },
        { id: 6, title: "음악 클래스", price: "₩35,000", image: "https://via.placeholder.com/100" },
        { id: 6, title: "음악 클래스", price: "₩35,000", image: "https://via.placeholder.com/100" },
        { id: 6, title: "음악 클래스", price: "₩35,000", image: "https://via.placeholder.com/100" },
        { id: 6, title: "음악 클래스", price: "₩35,000", image: "https://via.placeholder.com/100" },
        { id: 6, title: "음악 클래스", price: "₩35,000", image: "https://via.placeholder.com/100" },
    ]

    return(
        <div id="mobile-view">
            <header className="classListHeader">
                {/* <span class="material-symbols-outlined">arrow_back</span> */}
                <div className="headerTop">
                    <span></span> {/* 구글폰트 안먹어서 임시로 위치 잡는 태그임 */}                        
                    {/* <span class="material-symbols-outlined">arrow_back_ios</span> */}
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
                        <div key={classItem.id} className="classItem">
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