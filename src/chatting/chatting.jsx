import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useEffect } from "react";
import "../App.css";
import "./chatting.css";

function Chatting() {
  return (
    <div id="mobile-view">
      <main>
        <header id="chatting-header">
          <img src="/arrow.png" id="header-arrowIcon" />
          <div id="chatting-title">
            <h1>beginner piano class</h1>
          </div>
          <img src="/ellipsis.png" id="header-ellipsisIcon" />
        </header>

        <div id="chatting-main">
          <div id="chatting-date">
            <span>Today</span>
          </div>
          <div className="chattingBox ">
            <div className="my_chattingBox_column1">
              <div className="chattingBox_name">
                <span>Elia</span>
              </div>
              <div className="chattingBox-message">
                <p>dlksjfdsjfkjdskfjvlsjfvksjfvgjsklfjsjkdvksjljlk</p>
              </div>
            </div>
            <div className="my_chattingBox_column2">
              <img className="chatting-img" src="/user.png" />
            </div>
          </div>
          <div className="chattingBox ">
            <div className="chattingBox_column2">
              <img className="chatting-img" src="/user.png" />
            </div>
            <div className="chattingBox_column1 ">
              <div className="chattingBox_name">
                <span>Elia</span>
              </div>
              <div className="chattingBox-message">
                <p>dlksjfdsjfkjdskfjvlsjfvksjfvgjsklfjsjkdvksjljlk</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Chatting;
