import {React, useState, useEffect} from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import Navbar from "./navbar"
import "./css/navbar.css";
import "./css/home_main.css"


function Home() {
  const category = [
    {text: '전체' , className: 'all'},
    {text: '요리' , className: 'cook'},
    {text: '미술' , className: 'art'},
    {text: '공예' , className: 'craft'},
    {text: '원예' , className: 'gardening'},
    {text: '뷰티' , className: 'beauty'},
    {text: '음악' , className: 'music'},
    {text: '운동' , className: 'exercise'},
  ]

  return (
  <div id="mobile-view">
    <main>
      <header className="homeHeader">
        <h3>MOMENT CLASS</h3>
      </header>
      <div className="mainContent">
        <section className="classTypeContainer">
          <h4 className="classTxt">클래스 유형</h4>
          <div className="classTypeBox">
            <div className="typeContent"><p>전체</p></div>
            <div className="typeContent"><p>정규</p></div>
            <div className="typeContent"><p>원데이</p></div>
          </div>
        </section>
        <section className="bestClassContainer">
          <h4 className="classTxt">인기 클래스</h4>
          <div className="banner">배너</div>
        </section>
        <section className="categoryContainer">
          <h4 className="classTxt">카테고리</h4>
          <ul className="categoryBox">
            {category.map((item, i) => {
              return(
                  <li className={`${item.className} categoryList`} key={i}>{item.text}</li>
              )
            })}
            </ul>
        </section>
      </div>
    </main>
    <Navbar/>
  </div>
  );
}

export default Home;
