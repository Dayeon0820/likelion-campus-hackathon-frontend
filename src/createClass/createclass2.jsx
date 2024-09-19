import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "../App.css";
import "../profile/profile.css";
import "./createClass.css";
import Modal from "react-modal";
import Postcode from "react-daum-postcode";

function CreateClass2() {
  const navigate = useNavigate();
  const location = useLocation();
  const classInfo = location.state?.classInfo;
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    console.log("classInfo in 2", classInfo);
  }, []);

  const title = classInfo?.title || "";
  const category = classInfo?.category || "";
  const image = classInfo?.image || "";
  const subtitle = classInfo?.subtitle || "";

  const classInfo2 = {
    type: type,
    price: price,
    title: title,
    category: category,
    subtitle: subtitle,
    image: image,
    address: address,
    detailAddress: detailAddress,
  };

  useEffect(() => {
    console.log(classInfo2);
  }, [price]);

  const goNext = () => {
    if (type === "" || price === "" || address === "" || detailAddress === "") {
      alert("클래스 종류, 가격, 주소를 입력해주세요");
    } else if (type === "regular") {
      navigate("/create_class/regular", { state: { classInfo2 } });
    } else if (type === "oneday") {
      navigate("/create_class/oneday", { state: { classInfo2 } });
    } else {
      return;
    }
  };

  // 모달 열기
  const openModal = () => setIsModalOpen(true);

  // 모달 닫기
  const closeModal = () => setIsModalOpen(false);

  // 주소 선택 시 처리
  const handleAddressSelect = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setAddress(fullAddress);
    // 도로명 주소를 state에 저장
    console.log(fullAddress);
    closeModal(); // 모달 닫기
  };
  return (
    <div id="mobile-view">
      <div id="default-padding">
        <header className="app-header header_3components">
          <img
            src="/arrow.png"
            id="header-arrowIcon"
            onClick={() => navigate("/create_class")}
          />
          <div id="chatting-title">
            <h1>클래스 개최하기</h1>
          </div>
          <span></span>
        </header>
        <form id="createClass-main">
          <span className="createclass-txt">클래스 종류</span>
          <div className="createInput-box  inputBox-white">
            <label className="createclass-input_lable" htmlFor="regular">
              정규
            </label>
            <input
              className="createclass-input"
              name="classtype"
              type="radio"
              value="regular"
              id="regular"
              onChange={(e) => {
                setType(e.target.value);
              }}
            />
          </div>
          <div className="createInput-box inputBox-white">
            <label className="createclass-input_lable" htmlFor="oneday">
              원데이
            </label>
            <input
              className="createclass-input"
              type="radio"
              value="oneday"
              name="classtype"
              id="oneday"
              onChange={(e) => {
                setType(e.target.value);
              }}
            />
          </div>
          <span className="createclass-txt">클래스 가격</span>
          <div className="createInput-box ">
            <input
              className="createclass-input"
              placeholder="가격"
              type="number"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <span className="createclass-txt">강의실 주소</span>
          <div className="createInput-box ">
            <input
              className="createclass-input"
              placeholder="주소 입력"
              readOnly
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              type=" text"
            />
            <button id="addressBtn" type="button" onClick={openModal}>
              검색
            </button>
          </div>{" "}
          <div className="createInput-box  inputBox-white">
            <input
              className="createclass-input"
              placeholder="기본 주소"
              readOnly
              required
              value={address}
              type=" text"
            />
          </div>
          <div className="createInput-box  inputBox-white">
            <input
              className="createclass-input"
              placeholder="상세 주소"
              onChange={(e) => setDetailAddress(e.target.value)}
              value={detailAddress}
              type=" text"
            />
          </div>
        </form>
        <button className="nextBtn" onClick={goNext}>
          다음
        </button>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="주소 검색 모달"
          style={{
            content: {
              top: "50%",
              left: "50%",
              height: "80%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
            },
          }}
        >
          <button onClick={closeModal} style={{ float: "right" }}>
            닫기
          </button>
          <Postcode
            style={{ width: "100%", height: "100%" }}
            jsOptions={{ animation: true }}
            onComplete={handleAddressSelect}
            onError={(error) => {
              console.error("Error:", error);
            }}
          />
        </Modal>
      </div>
    </div>
  );
}

export default CreateClass2;
