import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "../App.css";
import "./css/search_main.css";
import "./css/searchList.css";

import Navbar from "../main/navbar";

function SearchList() {
  const location = useLocation();
  const navigate = useNavigate();
  const defaultImageUrl = "/defaultclass.png";
  const courses = location.state?.formattedData || [];
  return (
    <div id="mobile-view">
      <header className="app-header reviewHeader defaultHeader">
        <form className="second_search-form search-form">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="search-input"
          />
          <button type="submit" className="search-button">
            <span className="material-symbols-outlined">search</span>
          </button>
        </form>
      </header>
      <div className="searchList-main">
        <div id="searchList-selectBox">
          <select name="order">
            <option name="order" value="normal">
              기본 순
            </option>
            <option name="order" value="searchCount">
              최다 검색 순
            </option>
            <option name="order" value="scoreCount">
              리뷰 많은 순
            </option>
            <option name="order" value="averageScore">
              별점 높은 순
            </option>
          </select>
        </div>
        <main className="myclass-main">
          {" "}
          {/* 마이클래스 ui 가져옴*/}
          {courses.map((course) => (
            <div key={course.id} className="myclass-contentBox">
              <img
                src={course.imageUrls || defaultImageUrl}
                alt={course.name}
                className="myclass-contentBox_img"
              />
              <h3>{course.name}</h3>
              <span>${course.price.toLocaleString()}</span>
              <div className="myclass-content_btnBox">
                <span>정규 수업</span>
              </div>
            </div>
          ))}
        </main>
      </div>
      <Navbar></Navbar>
    </div>
  );
}

export default SearchList;
