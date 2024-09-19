import {React, useState, useEffect } from "react";
import { Link, useNavigate, NavLink, useParams } from "react-router-dom";
import "./css/review.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const ReviewInquiry = () => {
    const [reviews, SetReviews] = useState(initialReviews);
    const [sortOption, setSortOption] = useState("latest"); // 정렬 옵션 상태 추가
    

    // 정렬된 리뷰 가져오기
    const sortedReviews = () => {
        let sorted = [...reviews]; // 리뷰 복사본 생성
        if (sortOption === "rating") {
            // 별점 순으로 정렬
            sorted.sort((a, b) => b.score - a.score);
        } else {
            // 최신순 정렬 (날짜순)
            sorted.sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime));
        }
        return sorted;
    };

    // 평점별 리뷰 비율 계산
    const calculateRatings = () => { //실제로는 api 가져와서 사용하면 됨
        const ratingCounts = [0, 0, 0, 0, 0]; // 5, 4, 3, 2, 1
        review.forEach(review => {
            ratingCounts[review.score - 1]++;
        });
        const totalReviews = review.length;
        return ratingCounts.map(count => (totalReviews > 0 ? (count / totalReviews) * 100 : 0));
    };

  // const ratingPercentages = calculateRatings();

    // 평균 별점 계산
    const averageRating = (
        review.reduce((acc, review) => acc + review.score, 0) / review.length
    ).toFixed(1);

  // const calculateStarClasses = (index, rating) => {
  //     if (index < Math.floor(rating)) {
  //         return "star filled";
  //     } else if (index === Math.floor(rating) && rating % 1 !== 0) {
  //         return "star half";
  //     } else {
  //         return "star";
  //     }
  // };

    return(
        <div id="mobile-view">
            <header className="app-header reviewHeader defaultHeader">
                <Link to={`/home/class_application/${id}`}> {/* /home/class_application/i 로 고치기 */}
                    <span className="material-symbols-outlined">arrow_back_ios</span>
                </Link>
                <h3>클래스 리뷰</h3>
            </header>
            <main id="reviewInner">
                <section className="reviewAverage">
                    <div className="averageTitleBox">
                        <h3>{averageScore.averageScore}</h3>
                        <div className="totalStarBox">
                            <div className="averageStar">
                                {[...Array(5)].map((_, index) => (
                                    <FontAwesomeIcon
                                        key={index}
                                        icon={faStar}
                                        className={calculateStarClasses(index, averageRating)}
                                    />
                                ))}
                            </div>
                            <span>{averageScore.totalReviewCount}개 리뷰</span>
                        </div>
                    </div>
                    <div className="averageRatingBox">
                        {ratingPercentages.map((percentage, index) => (
                            <div key={index} className="ratingBarWrapper">
                                <div className="ratingLabel">{5 - index}</div>
                                <div className="ratingBar">
                                    <div className="ratingBarFill" style={{ width: `${percentage}%` }}></div>
                                </div>
                                <div className="ratingPercentage">{percentage.toFixed(0)} %</div>
                            </div>
                        ))} 
          </div>
        </section>
        <div className="reviewBtnBox">
          {" "}
          {/* 시간 남으면 별점 선택해서 보는 것도 select추가 */}
          <select
            name="sort"
            id="reviewSelect"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="latest">최신순</option>
            <option value="rating">별점순</option>
          </select>
        </div>
        {/* <section id="reviewList">
                    {sortedReviews().map(review => ( //실제로는 api 값 가져와서
                        <div key={review.id} className="reviewItem">
                            <div className="reviewProfile">
                                <img src={`${review.memberImageUrl || `https://via.placeholder.com/100`}`} className="reviewItemImg"/>
                                <div>
                                    <h5>{review.memberNickname}</h5>
                                    <p>{review.createdTime}</p>
                                </div>
                            </div>
                            <div className="rating">
                                {Array.from({ length: review.score }, (_, index) => (
                                    <FontAwesomeIcon
                                        key={index}
                                        icon={faStar}
                                        className="individualStar"
                                    />
                                ))}
                            </div>
                            <p className="reviewComment">{review.reviewComment}</p>
                        </div>
                    ))}
                </section> */}
      </main>
    </div>
  );
};

export default ReviewInquiry;
