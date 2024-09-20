import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "../App.css";
import "../profile/profile.css";
import "./createClass.css";
function CreateRegularClass() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refresh_token");
  const classInfo2 = location.state?.classInfo2;
  const [startDate, setStartDate] = useState("");
  const [finDate, setFindate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [finTime, setFinTime] = useState("");
  const [number, setNumber] = useState(0);
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const title = classInfo2?.title || "";
  const category = classInfo2?.category || "";
  const image = classInfo2?.image || "";
  const subtitle = classInfo2?.subtitle || "";
  const type = classInfo2?.type || "";
  const price = classInfo2?.price || "";
  const address = classInfo2?.address || "";
  const detailAddress = classInfo2?.detailAddress || "";
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 열림 상태
  const toggleDropdown = () => {
    setIsOpen(!isOpen); // 드롭다운 열고 닫기
  };

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
      navigate("/login"); // 로그인 페이지로 리다이렉트
      return null; // 실패 시 null 반환
    }
  };
  // 한국 시간대로  내일 날짜를 가져오기
  const getTomorrowDateKST = () => {
    const now = new Date();

    // 하루(24시간 * 60분 * 60초 * 1000밀리초)
    const oneDay = 24 * 60 * 60 * 1000;

    // 한국 시간대 (UTC+9)와 하루 더한 시간
    const kstOffset = 9 * 60 * 60 * 1000;
    const kstTomorrow = new Date(now.getTime() + kstOffset + oneDay);

    // YYYY-MM-DD 형식으로 변환
    const year = kstTomorrow.getUTCFullYear();
    const month = String(kstTomorrow.getUTCMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = String(kstTomorrow.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`; // 공백 없이 YYYY-MM-DD 형식으로 반환
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setDaysOfWeek(
      (prevDays) =>
        prevDays.includes(value)
          ? prevDays.filter((day) => day !== value) // 이미 선택된 경우 제거
          : [...prevDays, value] // 선택되지 않은 경우 추가
    );
  };

  const options = [
    { value: "MONDAY", label: "월" },
    { value: "TUESDAY", label: "화" },
    { value: "WEDNESDAY", label: "수" },
    { value: "THURSDAY", label: "목" },
    { value: "FRIDAY", label: "금" },
    { value: "SATURDAY", label: "토" },
    { value: "SUNDAY", label: "일" },
  ];

  const requestDTO = {
    name: title,
    description: subtitle,
    price: price,
    member_limit: number,
    startDate: startDate,
    endDate: finDate,
    startTime: startTime,
    endTime: finTime,
    address: address,
    detailAddress: detailAddress,
    daysOfWeek: daysOfWeek,
    category: category,
  };

  useEffect(() => {
    console.log(requestDTO);
    if (finDate < startDate) {
      setFindate(startDate);
    } else if (finDate === startDate) {
      if (finTime < startTime) {
        setFinTime(startTime);
      }
    }
  }, [startDate, finDate, startTime, finTime, daysOfWeek]);
  useEffect(() => {
    console.log(classInfo2);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      finDate === "" ||
      finTime === "" ||
      startDate === "" ||
      startTime === "" ||
      number === 0 ||
      daysOfWeek.length === 0
    ) {
      alert("날짜와 요일, 시간, 인원 수를 입력해주세요");

      return;
    }
    const formData = new FormData();
    const baseUrl = "https://sangsang2.kr:8080/api/lecture/create/regular";
    console.log(requestDTO);

    formData.append(
      "lecture",
      new Blob([JSON.stringify(requestDTO)], { type: "application/json" })
    );
    if (image) {
      formData.append("images", image, image.name);
    }

    try {
      const response = await fetch(baseUrl, {
        method: "POST",
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
          } else if (data.error === "접근 권한 없음") {
            alert("클래스 생성 권한이 없습니다.");
          } else if (data.error === "위도 정보 찾을 수 없음") {
            alert("강의실의 위도 정보 찾을 수 없습니다.");
          } else if (data.error === "경도 정보 찾을 수 없음") {
            alert("강의실의 경도 정보 찾을 수 없습니다.");
          } else {
            alert("클래스 생성에 실패했습니다."); // 다른 404 에러 처리
          }
        } else if (response.status === 500) {
          if (data.error === "JSON 파싱 중 오류 발생") {
            alert("JSON 파싱 중 오류 발생.");
          } else {
            alert("서버에 오류가 발생했습니다."); // 다른 404 에러 처리
          }
        } else if (
          data.error === "토큰이 유효하지 않습니다." ||
          data.error === "토큰 사용자를 찾을 수 없습니다."
        ) {
          const newToken = await onRefreshToken(); // 새로운 토큰 요청

          if (newToken) {
            // 새로운 토큰이 있으면 재시도
            return CreateRegularClass(); // 다시 호출
          }
        } else {
          alert("클래스 생성에 실패했습니다.");
        }
        console.log(data.error);
        return;
      }

      console.log("Success:", data);
      navigate("/profile");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div id="mobile-view">
      <div id="default-padding">
        <header className="app-header header_3components">
          <img
            src="/arrow.png"
            id="header-arrowIcon"
            onClick={() => navigate("/create_class2")}
          />
          <div id="chatting-title">
            <h1>클래스 개최하기</h1>
          </div>
          <span></span>
        </header>
        <h1 className="createclass-title">날짜와 시간을 설정해주세요</h1>

        <form id="createClass-main" onSubmit={onSubmit}>
          <div className="regular-Box">
            <div className="regular-Box_column">
              <span className="createclass-txt">시작일 설정하기</span>
              <div className="createInput-box">
                <input
                  type="date"
                  id="createclass-date-input"
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                  min={getTomorrowDateKST()}
                  value={startDate}
                />
              </div>
            </div>
            <div className="regular-Box_column">
              <span className="createclass-txt">마감일 설정하기</span>
              <div className="createInput-box">
                <input
                  type="date"
                  id="createclass-date-input"
                  onChange={(e) => {
                    setFindate(e.target.value);
                  }}
                  value={finDate}
                />
              </div>
            </div>
          </div>
          <span className="createclass-txt">반복 요일 설정하기</span>
          <div className="createInput-box">
            <div className="dropdown-header" onClick={toggleDropdown}>
              <span className="dropdown-header-txt">요일 선택</span>
              <span style={{ cursor: "pointer" }}>
                {isOpen ? "▲" : "▼"}
              </span>{" "}
              {/* 화살표 아이콘 */}
            </div>
            {isOpen && (
              <ul className="dropdown-list">
                {options.map((option) => (
                  <li key={option.value}>
                    <label>
                      {option.label}
                      <input
                        type="checkbox"
                        value={option.value}
                        checked={daysOfWeek.includes(option.value)}
                        onChange={handleCheckboxChange}
                      />
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="regular-Box">
            <div className="regular-Box_column">
              <span className="createclass-txt">시작하는 시간</span>
              <div className="createInput-box  inputBox-white">
                <input
                  type="time"
                  className="createclass-time-input2"
                  onChange={(e) => {
                    setStartTime(e.target.value);
                  }}
                  value={startTime}
                />
              </div>
            </div>
            <div className="regular-Box_column">
              <span className="createclass-txt">끝나는 시간</span>
              <div className="createInput-box  inputBox-white">
                <input
                  type="time"
                  className="createclass-time-input2"
                  onChange={(e) => {
                    setFinTime(e.target.value);
                  }}
                  value={finTime}
                />
              </div>
            </div>
          </div>

          <h1 className="createclass-title">몇 명이 참여 가능한가요?</h1>
          <span className="createclass-txt">참여 가능 인원 수</span>
          <div className="createInput-box">
            <input
              type="number"
              className="createclass-input"
              placeholder="참가 인원"
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <button className="nextBtn">클래스 개최하기</button>
        </form>
      </div>
    </div>
  );
}

export default CreateRegularClass;
