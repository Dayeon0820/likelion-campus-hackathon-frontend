import {React, useState, useEffect } from 'react';
import { Link, useNavigate, NavLink } from "react-router-dom";
import "./css/applicationDetail.css";
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';  // 기본 CSS
import moment from "moment";

const ApplicationDetail = () =>{
    const navigate = useNavigate();
    const [count, setCount] = useState(1);
    const [date, setDate] = useState(new Date());
    const [classTime, setClassTime] = useState(null)

    // 예시 데이터: 날짜별 수강 시간
    const classTimes = {
        "2024-09-15": "10:00 AM - 11:00 AM",
        "2024-09-16": "1:00 PM - 2:00 PM",
        "2024-09-17": "3:00 PM - 4:00 PM",
    };
    const handleDateChange = (date) => {
        setDate(date);

        // 선택된 날짜의 수강 시간을 가져옴
        const selectedDate = moment(date).format("YYYY-MM-DD");
        setClassTime(classTimes[selectedDate] || null);  // 해당 날짜에 데이터가 없으면 null 설정
    };

    const handleApplicationClick = () => {
        navigate('/home/class_application/completed')
    }
    const handleCancelClick = () => {
        navigate('/home/class_list')
    }
    const increaseCount = () => {
        setCount(count +1)
    };
    const decreaseCount = () => {
        if (count > 1){
            setCount(count - 1)
        }
    };

    return(
        <div id="mobile-view">
            <header className="app-header defaultHeader">
                <Link to="/home/class_application">
                    <span className="material-symbols-outlined">arrow_back_ios</span>
                </Link>
                <h3>클래스 신청하기</h3>
            </header>
            <main id="default-padding" className='detailApplicationMain'>
                <section id="calendarBox">
                    {/* <h5>날짜 선택</h5> */}
                    <Calendar
                    formatDay={(locale, date) => moment(date).format("DD")}
                    showNeighboringMonth={false}  // 해당 월이 아닌 날짜는 숨기기
                    tileClassName={({ date }) => date.getDay() === 6 ? 'saturday' : null}  // 토요일이면 'saturday' 클래스 추가
                    onChange={handleDateChange}
                    value={date}
                    >   
                    </Calendar>
                </section>
                {date && ( //선택한 날짜에 해당하는 수강 시간이 있는 경우만 표시 
                    <section id="selectTimeBox">
                        <h5>수강 시간</h5>
                        <p style={{ fontSize: classTime ? "16px" : "12px", }}>
                        {classTime ? classTime : "해당 날짜에 등록된 클래스가 없습니다."}
                        </p>
                    </section>
                )}
                <div id="personnelApplication">
                    <h5 className="personnelTitle">신청 인원 수</h5>
                    <div className="controlBtnBox">
                        <button onClick={decreaseCount}>-</button>
                        <p>{count}</p>
                        <button onClick={increaseCount}>+</button>
                    </div>
                </div>
            </main>
            <div className="detailApplicationBtnBox">
                <button 
                className="payingBtn"
                onClick={handleApplicationClick}
                >신청하기
                </button>
                <button 
                className="cancelBtn"
                onClick={handleCancelClick}
                >취소하기</button>
            </div>
        </div>
    )
}

export default ApplicationDetail;