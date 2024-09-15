import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "../../App.css";
import "../profile_c.css";
import "../profile.css";

function EditProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [check, setCheck] = useState(false);
  const [permission, setPermission] = useState("");

  const token = localStorage.getItem("token");
  const originalIntro = location.state?.introduction || "";
  const originalName = location.state?.nickname || "";
  const image = location.state?.userImg;
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

        <h2 id="profile-questionTxt">권한 변경하기</h2>
        <div id="profile-quesionBox">
          <h4>클래스 개최자이신가요? . . .</h4>
          <input type="checkbox" id="checkBox" onClick={onCheck} />
        </div>
        <button className="profileBtn">변경하기</button>
      </div>
    </div>
  );
}

export default EditProfile;
