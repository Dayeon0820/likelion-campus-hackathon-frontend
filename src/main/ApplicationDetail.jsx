import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import "./css/applicationDetail.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // 기본 CSS
import moment from "moment";
import axios from "axios";

const ApplicationDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const location = useLocation();
  const classData = location.state?.classData; // classData 가져오기

  // classData.date를 초기 선택 날짜로 설정
  const initialDate = classData ? new Date(classData.date) : new Date();

  const [count, setCount] = useState(1);
  const [date, setDate] = useState(initialDate);
  const [classTime, setClassTime] = useState(null);

  useEffect(() => {
    console.log("Class Data:", classData);
    console.log("Class Date:", classData?.date);
  }, [classData]);

  useEffect(() => {
    if (classData) {
      // 선택된 날짜와 classData의 날짜가 같은 경우 수강 시간 설정
      const selectedDate = moment(date).format("YYYY-MM-DD");
      const classDate = classData.date;

      if (selectedDate === classDate) {
        const startTime = moment(classData.startTime, "HH:mm:ss").format(
          "HH:mm"
        );
        const endTime = moment(classData.endTime, "HH:mm:ss").format("HH:mm");
        setClassTime(`${startTime} - ${endTime}`);
      } else {
        setClassTime(null);
      }
    }
  }, [date, classData]);

  const handleDateChange = (date) => {
    setDate(date);

    // 선택된 날짜와 classData의 날짜가 같은 경우 수강 시간 설정
    const selectedDate = moment(date).format("YYYY-MM-DD");
    const classDate = classData?.date;

    if (selectedDate === classDate) {
      const startTime = moment(classData.startTime, "HH:mm:ss").format("HH:mm");
      const endTime = moment(classData.endTime, "HH:mm:ss").format("HH:mm");
      setClassTime(`${startTime} - ${endTime}`);
    } else {
      setClassTime(null);
    }
  };

  const handleApplicationClick = async () => {
    const baseUrl = `http://sangsang2.kr:8080/api/lecture/join?lecture=${id}`;

    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          if (data.error === "사용자 찾을 수 없음") {
            alert("사용자를 찾을 수 없습니다.");
          } else if (data.error === "강의 찾을 수 없음") {
            alert("강의를 찾을 수 없습니다.");
          } else {
            alert("강의 신청에 실패했습니다."); // 다른 404 에러 처리
          }
        } else if (response.status === 400) {
          if (data.error === "이미 참가한 강의") {
            alert("이미 참가한 강의입니다.");
          } else if (data.error === "강의 정원 가득참") {
            alert("강의 정원이 가득 찼습니다.");
          } else {
            alert("강의 신청에 실패했습니다."); // 다른 400 에러 처리
          }
        }
        alert("강의 신청에 실패했습니다.");
        return;
      }
      //요청 성공
      console.log(data);
      navigate('/home/class_application/completed');
    } catch (error) {
      console.error("Error occurred during delete:", error);
      alert("Error occurred " + error.message);
    }
  };

  // const handleApplicationClick = () => {
  //     navigate('/home/class_application/completed');
  // };

  const handleCancelClick = () => {
    navigate("/home/class_list");
  };

  const increaseCount = () => {
    if (count < classData?.member_limit) {
      setCount(count + 1);
    }
  };

  const decreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div id="mobile-view">
      <header className="app-header defaultHeader">
        <Link to={`/home/class_application/${id}`}>
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </Link>
        <h3>클래스 신청하기</h3>
      </header>
      <main id="default-padding" className="detailApplicationMain">
        <section id="calendarBox">
          <Calendar
            formatDay={(locale, date) => moment(date).format("DD")}
            showNeighboringMonth={false} // 현재 월 이외의 날짜는 숨기기
            tileClassName={({ date }) =>
              date.getDay() === 6 ? "saturday" : null
            } // 토요일에 클래스 추가
            onChange={handleDateChange}
            value={date} // 캘린더에서 선택된 날짜를 `date`로 설정
          />
        </section>
        {date && (
          <section id="selectTimeBox">
            <h5>수강 시간</h5>
            <p style={{ fontSize: classTime ? "16px" : "12px" }}>
              {classTime ? classTime : "해당 날짜에 등록된 클래스가 없습니다."}
            </p>
          </section>
        )}
        <div id="personnelApplication">
          <h5 className="personnelTitle">신청 인원 수</h5>
          <div className="controlBtnBox">
            <button onClick={decreaseCount}>-</button>
            <p>{count}</p>
            <button
              onClick={increaseCount}
              disabled={count >= classData?.member_limit}
            >
              +
            </button>
          </div>
        </div>
      </main>
      <div className="detailApplicationBtnBox">
        <button className="payingBtn" onClick={handleApplicationClick}>
          신청하기
        </button>
        <button className="cancelBtn" onClick={handleCancelClick}>
          취소하기
        </button>
      </div>
    </div>
  );
};

export default ApplicationDetail;





// import {React, useState, useEffect } from 'react';
// import { Link, useNavigate, NavLink, useParams } from "react-router-dom";
// import "./css/applicationDetail.css";
// import Calendar from "react-calendar"
// import 'react-calendar/dist/Calendar.css';  // 기본 CSS
// import moment from "moment";

// const ApplicationDetail = () =>{
//     const { id: lectureId } = useParams();  // id를 lectureId로 사용
//     const navigate = useNavigate();
//     const [count, setCount] = useState(1);
//     const [date, setDate] = useState(new Date());
//     const [classTime, setClassTime] = useState(null)

//     // 예시 데이터: 날짜별 수강 시간
//     const classTimes = {
//         "2024-09-15": "10:00 AM - 11:00 AM",
//         "2024-09-16": "1:00 PM - 2:00 PM",
//         "2024-09-17": "3:00 PM - 4:00 PM",
//     };
//     const handleDateChange = (date) => {
//         setDate(date);

//         // 선택된 날짜의 수강 시간을 가져옴
//         const selectedDate = moment(date).format("YYYY-MM-DD");
//         setClassTime(classTimes[selectedDate] || null);  // 해당 날짜에 데이터가 없으면 null 설정
//     };

//     const handleApplicationClick = async () => {
//         try {
//           const response = await fetch('http://sangsang2.kr:8080/api/lecture/join', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${localStorage.getItem('token')}`, // 토큰 가져오기
//             },
//             body: JSON.stringify({
//               lecture: lectureId, // lectureId를 전달
//               participants: count, // 신청 인원 수 전달
//               selectedDate: moment(date).format('YYYY-MM-DD'), // 선택된 날짜 전달
//             }),
//           });
    
//           if (response.ok) {
//             navigate('/home/class_application/completed');
//           } else {
//             console.error('신청 실패:', response.status);
//           }
//         } catch (error) {
//           console.error('Error:', error);
//         }
//       };

//     const handleCancelClick = () => {
//         navigate('/home/class_list')
//     }
//     const increaseCount = () => {
//         setCount(count +1)
//     };
//     const decreaseCount = () => {
//         if (count > 1){
//             setCount(count - 1)
//         }
//     };

//     return(
//         <div id="mobile-view">
//             <header className="app-header defaultHeader">
//                 <Link to="/home/class_application">
//                     <span className="material-symbols-outlined">arrow_back_ios</span>
//                 </Link>
//                 <h3>클래스 신청하기</h3>
//             </header>
//             <main id="default-padding" className='detailApplicationMain'>
//                 <section id="calendarBox">
//                     {/* <h5>날짜 선택</h5> */}
//                     <Calendar
//                     formatDay={(locale, date) => moment(date).format("DD")}
//                     showNeighboringMonth={false}  // 해당 월이 아닌 날짜는 숨기기
//                     tileClassName={({ date }) => date.getDay() === 6 ? 'saturday' : null}  // 토요일이면 'saturday' 클래스 추가
//                     onChange={handleDateChange}
//                     value={date}
//                     >   
//                     </Calendar>
//                 </section>
//                 {date && ( //선택한 날짜에 해당하는 수강 시간이 있는 경우만 표시 
//                     <section id="selectTimeBox">
//                         <h5>수강 시간</h5>
//                         <p style={{ fontSize: classTime ? "16px" : "12px", }}>
//                         {classTime ? classTime : "해당 날짜에 등록된 클래스가 없습니다."}
//                         </p>
//                     </section>
//                 )}
//                 <div id="personnelApplication">
//                     <h5 className="personnelTitle">신청 인원 수</h5>
//                     <div className="controlBtnBox">
//                         <button onClick={decreaseCount}>-</button>
//                         <p>{count}</p>
//                         <button onClick={increaseCount}>+</button>
//                     </div>
//                 </div>
//             </main>
//             <div className="detailApplicationBtnBox">
//                 <button 
//                 className="payingBtn"
//                 onClick={handleApplicationClick}
//                 >신청하기
//                 </button>
//                 <button 
//                 className="cancelBtn"
//                 onClick={handleCancelClick}
//                 >취소하기</button>
//             </div>
//         </div>
//     )
// }

// export default ApplicationDetail;