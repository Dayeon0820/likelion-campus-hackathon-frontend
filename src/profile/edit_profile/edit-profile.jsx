import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../App.css";
import "../profile_c.css";
import "../profile.css";

function EditProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [check, setCheck] = useState(false);
  const [permission, setPermission] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가

  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refresh_token");
  const originalName = location.state?.nickname || "";
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
      navigate("/"); // 로그인 페이지로 리다이렉트
      return null; // 실패 시 null 반환
    }
  };
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

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Opening modal...");
    setIsModalOpen(true);
  };

  useEffect(() => {
    console.log(permission);
  }, [permission]);

  const handleModalConfirm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const baseUrl = "https://sangsang2.kr:8080/api/member-info/edit";
    const info = {
      permission: permission,
      nickname: originalName,
    };
    console.log(info);

    formData.append(
      "info",
      new Blob([JSON.stringify(info)], { type: "application/json" })
    );

    try {
      const response = await fetch(baseUrl, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        if (response.status === 404) {
          if (data.error === "사용자 찾을 수 없음") {
            alert("사용자를 찾을 수 없습니다.");
          } else if (data.error === "사용자 정보 찾을 수 없음") {
            alert("사용자 정보를 찾을 수 없습니다.");
          } else if (data.error === "업데이트 사용자 정보 불러오기 실패") {
            alert("업데이트된 사용자 정보를 불러올 수 없습니다.");
          } else {
            alert("회원 정보 수정에 실패했습니다."); // 다른 404 에러 처리
          }
        } else if (response.status === 401 && refreshToken) {
          const newToken = await onRefreshToken(); // 새로운 토큰 요청

          if (newToken) {
            // 새로운 토큰이 있으면 재시도
            return EditProfile(); // 다시 호출
          }
        } else {
          alert("회원 정보 수정에 실패했습니다.");
        }
        return;
      }
      console.log("Success:", data);
      navigate("/profile");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsModalOpen(false); // 작업 완료 후 모달 닫기
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

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
            권한 <br />
            변경하기
            <span className="material-symbols-outlined">autorenew</span>
          </h2>
        </div>
        <h2 id="profile-questionTxt">역할 선택하기</h2>
        <div id="profile-quesionBox" onClick={handleModalCancel}>
          <h4>클래스 개최자이신가요? . . .</h4>
          <input type="checkbox" id="profileCheckBox" onClick={onCheck} />
        </div>
        <button className="profileBtn" onClick={onSubmit}>
          변경하기
        </button>

        {/* 모달이 열렸을 때만 표시 */}
        {isModalOpen && (
          <div id="permissionModalBox" className="permission-modal-Box">
            <div className="permission-modal-txt">
              <p>
                개최자로
                <br />
                변경하시겠습니까?
              </p>
            </div>
            <div>
              <button onClick={handleModalConfirm}>예</button>
              <button onClick={handleModalCancel}>아니오</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditProfile;
