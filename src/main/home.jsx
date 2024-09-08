import {React, useState, useEffect} from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import Navbar from "./navbar"
import "./css/navbar.css";


function Home() {

  return (
  <div id="mobile-view">
    <main>
      <header>
        <h3>MOMENT CLASS</h3>
      </header>
      <div className="mainContent">
        <section className="classTypeContainer">
          <h4 className="classTxt">클래스 유형</h4>
          <div className="classTypeBox">
            <button></button>
            <button></button>
            <button></button>
          </div>
        </section>
        <section className="bestClassContainer">
          <h4 className="classTxt">인기 클래스</h4>
          <div>배너 위치</div>
        </section>
        <section className="categoryContainer">
          <h4 className="classTxt">카테고리</h4>
          <div className="categoryBox">
          
          </div>
        </section>
      </div>
    </main>
    <Navbar/>
  </div>
  );
}

export default Home;
