import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useEffect, useRef } from "react";
import "../App.css";
import "./chatting.css";
import styles from "./chatting.module.css";
import Modal from "react-modal";
Modal.setAppElement("#root");
function Chatting() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refresh_token");
  const id = location.state?.id;
  const lectureId = parseFloat(id);
  const title = location.state?.name || "";
  const [date, setDate] = useState("");
  const [sending, setsending] = useState("");
  const [messages, setMessages] = useState([]);
  const gobackHome = () => navigate(`/home`);
  const messageEndRef = useRef(null);
  const [flag, setFlag] = useState(false);
  const [chatRoomId, setChatRoomId] = useState(null); // 채팅방 ID 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onRefreshToken = async () => {
    const refreshResponse = await fetch(
      "https://sangsang2.kr:8080/api/memebr/refresh",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh_token: refreshToken,
        }),
      }
    );

    const refreshData = await refreshResponse.json();
    if (refreshResponse.ok) {
      // 새로운 액세스 토큰 저장
      localStorage.setItem("token", refreshData.accessToken);
      return refreshData.accessToken; // 새로운 토큰 반환
    } else {
      alert("로그인 기간이 만료되었습니다.");
      navigate("/loin"); // 로그인 페이지로 리다이렉트
      return null; // 실패 시 null 반환
    }
  };

  const deleteChats = async () => {
    const baseUrl = `https://sangsang2.kr:8080/api/chat/chatRoom/delete?chatRoomId=${chatRoomId}`;

    try {
      const response = await fetch(baseUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        alert("채팅방 삭제에 실패했습니다.");
        console.log("Error Data:", data);
        return;
      }
      const data = await response.text();
      closeModal();
      console.log("delete chatrooms success: ", response);
      navigate("/chats");
    } catch (error) {
      console.error("Error deleting chat room:", error);
    }
  };
  const handleConfirm = () => {
    deleteChats(); // '네'를 누르면 실행
  };

  const createChatting = async (e) => {
    const baseUrl = "https://sangsang2.kr:8080/api/chat/create/chatRoom";

    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lectureId: lectureId,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        if (data.error === "이미 채팅방이 존재합니다.") {
          alert("이미 존재하는 채팅방입니다.");
          navigate("/chats");
        } else if (
          data.error === "토큰이 유효하지 않습니다." ||
          data.error === "토큰 사용자를 찾을 수 없습니다."
        ) {
          const newToken = await onRefreshToken(); // 새로운 토큰 요청

          if (newToken) {
            // 새로운 토큰이 있으면 재시도
            return createChatting(); // 다시 호출
          }
        }
        console.log("Error Data:", data);
        return;
      }

      const { chatRoomId, created_at, messageList } = data;

      console.log(" create chatting Success", data);

      setChatRoomId(chatRoomId);
      console.log("chatRoodId: ", chatRoomId);
      setFlag(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    console.log("lecture id", lectureId);
    createChatting();
  }, []);

  const getMessage = async (e) => {
    if (!chatRoomId) return; // 채팅방 ID가 없으면 getMessage를 실행하지 않음
    const baseUrl = `https://sangsang2.kr:8080/api/chat/chatRoom?chatRoomId=${chatRoomId}`;

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
        navigate("/chats");
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
      setMessages(processedData.messages);
      setDate(processedData.createdAt);
    } catch (error) {
      console.error("Error:", error);
      navigate("/chats");
    }
  };

  useEffect(() => {
    if (chatRoomId) {
      console.log("ChatRoomId 설정 완료:", chatRoomId, flag);
      getMessage(); // chatRoomId가 설정된 후 처음 한 번 실행
      const intervalId = setInterval(getMessage, 3000); // 이후 3초마다 메시지 가져오기
      return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 정리
    }
  }, [chatRoomId, flag]); // chatRoomId가 변경될 때만 실행

  useEffect(() => {
    // 메시지가 업데이트 될 때마다 스크롤을 가장 아래로 이동
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const baseUrl = "https://sangsang2.kr:8080/api/chat/send";

    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatRoomId: chatRoomId,
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
      setsending("");
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
          <img
            src="/deleteChats.png"
            id="header-homeIcon"
            onClick={openModal}
          />
        </header>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="채팅방 나가기"
          className="modal"
          overlayClassName="overlay"
        >
          <h2>채팅방을 나가시겠습니까?</h2>
          <div className="modal-buttons">
            <button onClick={handleConfirm} className="confirm-btn">
              네
            </button>
            <button onClick={closeModal} className="cancel-btn">
              아니요
            </button>
          </div>
        </Modal>
        <div id="chatting-date">
          <span>{date}</span>
        </div>

        <div id="chatting-main">
          <div className="chat-room-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${
                  message.type === "Sent" ? "sent" : "received"
                }`}
              >
                {message.type === "Received" ? (
                  <>
                    <img
                      src={message.avatar || "/user.png"}
                      alt="avatar"
                      className="chatting-img"
                    />
                    <div className="message-content received">
                      <div className="chattingBox_name">
                        <span>{message.nickname}</span>
                      </div>
                      <div className="chattingBox-message chattingBox-message">
                        <p>{message.content}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="message-content sent">
                      <div className="chattingBox_name">
                        <span>{message.nickname}</span>
                      </div>
                      <div className="chattingBox-message chattingBox-message sent">
                        <p>{message.content}</p>
                      </div>
                    </div>
                    <img
                      src={message.avatar || "/user.png"}
                      alt="avatar"
                      className="chatting-img"
                    />
                  </>
                )}
              </div>
            ))}
          </div>
          <div ref={messageEndRef} /> {/* 메시지 끝부분을 가리키는 div */}
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
            value={sending}
          />
          <button>
            <img src="/send.png" id="input-sendingIcon" type="submit" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chatting;
