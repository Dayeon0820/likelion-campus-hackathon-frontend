import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useEffect } from "react";
import "../App.css";
import "./chatting.css";
import styles from "./chatting.module.css";

function SendingChats() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const id = query.get("chatRoomId");
  const title = query.get("chatRoomName");
  const [sending, setsending] = useState("");
  const [messages, setMessages] = useState({});
  const gobackHome = () => navigate(`/home`);

  const getMessage = async (e) => {
    const baseUrl = `http://sangsang2.kr:8080/api/chat/chatRoom?chatRoomId=${id}`;

    try {
      const response = await fetch(baseUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) {
        alert("메세지 불러오기에 실패했습니다.");

        console.log("Error Data:", data);
        return;
      }

      const { chatRoomId, created_at, messageList } = data;
      const processedMessages = messageList.map((message) => ({
        content: message.message,
        nickname: message.memberNickname,
        avatar: message.memberImageUrl,
        type: message.messageType === "SENDER" ? "Sent" : "Received",
      }));

      const processedData = {
        chatRoomId, // 채팅방 ID
        createdAt: created_at, // 채팅 생성 날짜
        messages: processedMessages, // 가공된 메시지 리스트
      };

      console.log(" get message Success:", processedData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getMessage();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    const baseUrl = "http://sangsang2.kr:8080/api/chat/send";

    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatRoomId: id,
          message: sending,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        alert("메세지 전송에 실패했습니다.");

        console.log("Error Data:", data);
        return;
      }

      console.log(" sending Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div id="mobile-view" className={styles.chattingBG}>
      <div id="default-padding">
        <header className="app-header  header_3components">
          <img
            src="/arrow.png"
            id="header-arrowIcon"
            onClick={() => navigate(`/chats`)}
          />
          <div id="chatting-title">
            <h1>{title}</h1>
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
          <form id="chatting-inputBox" onSubmit={sendMessage}>
            <input
              id="chatting-input"
              type="text"
              onChange={(e) => {
                setsending(e.target.value);
              }}
            />
            <button>
              <img src="/send.png" id="input-sendingIcon" type="submit" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SendingChats;
