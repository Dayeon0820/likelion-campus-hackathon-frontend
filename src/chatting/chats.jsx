import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "../App.css";
import "./chats.css";

function Chats() {
  return (
    <div id="mobile-view">
      <main>
        <header id="chats_header">
          <img id="chats_myImg" src="/user.png" />
          <img id="pencil" src="/Pencil.png" />
        </header>
        <div id="chats_title">
          <h1>Chats</h1>
        </div>
        <div id="chats_search">
          <img src="/magnifyingGlass.png" id="input-glassIcon" />
          <input id="chats_input" type="text" placeholder="Search" />
        </div>
        <div id="chats_list">
          <div className="chats_listItem">
            <div className="chats_li-column">
              <img className="chats_li-img" src="/user.png" />
            </div>
            <div className="chats_li-column">
              <h2 id="chats_li-title">The Art</h2>
              <h4 id="chats_li-subtitle">hello everyone nice to meet you</h4>
            </div>
          </div>
          <div className="chats_listItem">
            <div className="chats_li-column">
              <img className="chats_li-img" src="/user.png" />
            </div>
            <div className="chats_li-column">
              <h2 id="chats_li-title">The Art</h2>
              <h4 id="chats_li-subtitle">hello everyone nice to meet you</h4>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Chats;
