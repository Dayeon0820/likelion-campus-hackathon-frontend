import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useEffect } from "react";
import "../App.css";
import "./chatting.css";
import styles from "./chatting.module.css";

function Chatting() {
  const navigate = useNavigate();
  const gobackHome = () => navigate("/home");
  return (
    <div id="mobile-view" className={styles.chattingBG}>
      <main>
        <header className="app-header">
          <img src="/arrow.png" id="header-arrowIcon" />
          <div id="chatting-title">
            <h1>beginner piano class</h1>
          </div>
          <img src="/home.png" id="header-homeIcon" onClick={gobackHome} />
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
              <div className="my_chattingBox-message chattingBox-message ">
                <p>안녕 내이름은 다연이야 나는 피아노 수업이 듣고싶어</p>
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
                <span>kai</span>
              </div>
              <div className="chattingBox-message">
                <p>
                  안녕 반가와 안녕 반가와 안녕 반가와 안녕 반가와 안녕 반가와
                  안녕 반가와안녕 반가와안녕 반가와안녕 반가와안녕 반가와안녕
                  반가와안녕 반가와안녕 반가와
                </p>
              </div>
            </div>
          </div>
        </div>
        <div id="chatting-footer">
          <img src="/user.png" id="chatting-img_footer" />
          <div id="chatting-inputBox">
            <input id="chatting-input" type="text" />
            <img src="/send.png" id="input-sendingIcon" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Chatting;
