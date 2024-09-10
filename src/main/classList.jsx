import {React, useState, useEffect } from "react-dom";
import Navbar from "./navbar"
import "./css/class_list.css";

const ClassList = () =>{
    const categories = ["전체", "요리", "미술", "공예", "플라워", "뷰티", "음악", "운동"];

    return(
        <div id="mobile-view">
            <main className="classListMain">
                <header className="classListHeader">
                    {/* <span class="material-symbols-outlined">arrow_back</span> */}
                    <span></span> {/* 구글폰트 안먹어서 임시로 위치 잡는 태그임 */}
                    <select name="" className="classSelect">
                        <option value="allClass" className="allClass">전체</option>
                        <option value="regularClass" className="regularClass">정규</option>
                        <option value="onedayClass" className="onedayClass">원데이</option>
                    </select>
                </header>
                <section className="categorySection">
                    <p className="categoryTxt categoryTitle">카테고리</p>
                    <ul className="categoryList">
                        {categories.map((list, i) => {
                            return(
                                <li key={i} className={`${i === 0 ? "active" : " "} categoryTxt`}>{list}</li>
                            )
                        })}
                    </ul>
                </section>
                
            </main>
            <Navbar></Navbar>
        </div>
    )
}

export default ClassList;