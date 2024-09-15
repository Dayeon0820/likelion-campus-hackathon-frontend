import {React, useState, useEffect } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import "./css/review.css";

// 리뷰 데이터 (예시)
const initialReviews = [
    {
      id: 1,
      memberNickname: "Annabelle",
      createdTime: "2024-09-13",
      score: 3,
      reviewComment: "수업은 일상적이었고 선생님도 놀라웠습니다.",
    },
    {
      id: 2,
      memberNickname: "Mia",
      createdTime: "2024-09-13",
      score: 5,
      reviewComment: "수업이 정말 즐거웠고 많은 것을 배웠습니다.",
    },
    {
      id: 3,
      memberNickname: "Ava",
      createdTime: "2024-09-13",
      score: 5,
      reviewComment: "이 수업은 저에게 완벽했습니다. 저는 그 속도가 마음에 듭니다.",
    },
    {
      id: 4,
      memberNickname: "Liam",
      createdTime: "2024-09-13",
      score: 4,
      reviewComment: "훌륭한 수업이었고, 새로운 취미를 시작하는 데 정말 도움이 되었습니다.",
    },
    {
      id: 5,
      memberNickname: "Lucas",
      createdTime: "2024-09-13",
      score: 3,
      reviewComment: "I loved this class! It was so fun and the teacher was great.",
    },
  ];

const ReviewInquiry = () => {
    const [reviews, SetReviews] = useState(initialReviews);

    return(
        <div id="mobile-view">
            <header className="app-header reviewHeader defaultHeader">
                <Link to="/home/class_application">
                    <span class="material-symbols-outlined">arrow_back_ios</span>
                </Link>
                <h3>클래스 리뷰</h3>
            </header>
            <main id="reviewInner">
                <section className="reviewAverage">
                    <div className="averageTitleBox">
                        <h3>4.5</h3>
                        <div className="totalStarBox"></div>
                    </div>
                    <div className="averageRatingBox">

                    </div>
                </section>
                <div className="reviewBtnBox">  {/* 시간 남으면 별점 선택해서 보는 것도 select추가 */}
                    <select name="sort" id="reviewSelect">
                        <option value="latest">최신순</option>
                        <option value="rating">별점순</option>
                    </select>
                </div>
                <section id="reviewList">
                    {reviews.map(review => (
                        <div key={review.id} className="reviewItem">
                            <div className="reviewProfile">
                                <img src="https://via.placeholder.com/100" className="reviewItemImg"/>
                                <div>
                                    <h5>{review.memberNickname}</h5>
                                    <p>{review.createdTime}</p>
                                </div>
                            </div>
                            <div className="rating">
                                {"⭐".repeat(review.score)}
                            </div>
                            <p className="reviewComment">{review.reviewComment}</p>
                        </div>
                    ))}
                </section>


            </main>
        </div>
    );
}

export default ReviewInquiry