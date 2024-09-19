import { React, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../main/navbar";
import "../App.css";
import "./chats.css";

function Chats() {
  const token = localStorage.getItem("token");
  const [chatRoomList, setChatRoomList] = useState([]);
  const [myImg, setMyImg] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const handleButtonClick = (type) => {
    console.log("Button Clicked:", type); // 상태 업데이트 확인
    setSelectedType(type);
  };
  const navigate = useNavigate();
  const getChatsList = async (e) => {
    const baseUrl = "http://sangsang2.kr:8080/api/chat/chatRoom/all";

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
        console.log("Error Data:", data);
        return;
      }

      const { chatRoomList, memberInfoImageUrl } = data;
      const chatRooms = chatRoomList.map((chatRoom) => ({
        chatRoomId: chatRoom.chatRoomId,
        receiverImg: chatRoom.receiverImageUrl,
        chatRoomName: chatRoom.chatRoomName,
        count: chatRoom.notReadMessageCount,
        nickname: chatRoom.receiverNickname,
        type: chatRoom.isLectureOwner === "true" ? "creator" : "user",
      }));

      const processedData = {
        myImg: memberInfoImageUrl,
        chatRooms: chatRooms, // 가공된 메시지 리스트
      };

      console.log(" get chatList Success:", processedData);
      setChatRoomList(chatRooms);
      setMyImg(memberInfoImageUrl);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // 선택한 타입에 맞게 채팅방 필터링
  const filteredChatRooms = chatRoomList.filter((chatRoom) => {
    if (selectedType === "all") return true; // 전체를 보여줌
    return chatRoom.type === selectedType;
  });

  useEffect(() => {
    getChatsList(); // 초기 호출
    //const intervalId = setInterval(getChatsList, 10000); // 5초마다 호출

    // return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 클리어
  }, []); // 빈 배열로 초기 마운트 시만 실행되도록

  return (
    <div id="mobile-view">
      <div id="default-padding">
        <header id="chats_header">
          <img id="chats_myImg" src={myImg || "/user.png"} />
        </header>
        <div id="chats_title">
          <h1>Chats</h1>
        </div>
        <div id="chatRoomTypeButtons">
          <button
            onClick={() => handleButtonClick("all")}
            className={selectedType === "all" ? "active" : ""}
          >
            전체
          </button>
          <button
            onClick={() => handleButtonClick("user")}
            className={selectedType === "user" ? "active" : ""}
          >
            내 문의
          </button>
          <button
            onClick={() => handleButtonClick("creator")}
            className={selectedType === "creator" ? "active" : ""}
          >
            내 클래스 문의
          </button>
        </div>

        <div id="chats_list">
          {filteredChatRooms.map((chatRoom) => (
            <div
              key={chatRoom.chatRoomId}
              className="chats_listItem"
              onClick={() =>
                navigate(
                  `/sendingChats?chatRoomId=${chatRoom.chatRoomId}&chatRoomName=${chatRoom.chatRoomName}`
                )
              }
            >
              <div className="chats_li-column">
                <img
                  className="chats_li-img"
                  src={chatRoom.receiverImg || "/creator.png"}
                  alt={chatRoom.nickname}
                />
                <h2 id="chats_li-title">{chatRoom.chatRoomName}</h2>
              </div>
              <div className="chats_li-column">
                {chatRoom.count === 0 ? (
                  ""
                ) : (
                  <span id="chats-readingCount">{chatRoom.count}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Navbar></Navbar>
    </div>
  );
}

export default Chats;
