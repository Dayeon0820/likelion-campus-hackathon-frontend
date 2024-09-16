import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "../../App.css";
import "../profile_c.css";
import "../profile.css";

function EditProfile() {
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);
  const [permission, setPermission] = useState("");
  const onCheck = () => {
    setCheck((current) => !current);
  };
  useEffect(() => {
    console.log(check);
    if (check === false) {
      setPermission("USER");
    } else if (check === true) {
      setPermission("CREATOR");
    }
  }, [check]);
  useEffect(() => {
    console.log(permission);
  }, [permission]);
  return (
    <div id="mobile-view">
      <div id="profile-padding">
        <header className="app-header header_1components">
          <img
            src="/arrow.png"
            id="header-arrowIcon"
            onClick={() => navigate("/profile")}
          />
        </header>
        <div id="header-title">
          <h2>
            나의 프로필 <br />
            수정하기
          </h2>
        </div>
        <div className="process-dot-box">
          <span className="process-dot blue-dot"></span>
          <span className="process-dot"></span>
        </div>

        <h2 id="profile-questionTxt">1단계: 역할 결정하기</h2>
        <div id="profile-quesionBox">
          <h4>클래스 개최자이신가요? . . .</h4>
          <input type="checkbox" id="checkBox" onClick={onCheck} />
        </div>
        <button
          className="profileBtn"
          onClick={() => {
            navigate("/edit_profile2", { state: { permission } });
          }}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
