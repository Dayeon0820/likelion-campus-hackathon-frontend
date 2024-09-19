import { React, useState, useEffect } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import "./css/review.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

// 리뷰 데이터 (예시)
// const initialReviews = [
//     {
//       id: 1,
//       memberNickname: "Annabelle",
//       createdTime: "2023-09-15",
//       score: 1,
//       reviewComment: "수업은 일상적이었고 선생님도 놀라웠습니다.",
//     },
//     {
//       id: 2,
//       memberNickname: "Mia",
//       createdTime: "2024-09-10",
//       score: 3,
//       reviewComment: "수업이 정말 즐거웠고 많은 것을 배웠습니다.",
//     },
//     {
//       id: 3,
//       memberNickname: "Ava",
//       createdTime: "2024-08-13",
//       score: 5,
//       reviewComment: "이 수업은 저에게 완벽했습니다. 저는 그 속도가 마음에 듭니다.",
//     },
//     {
//       id: 4,
//       memberNickname: "Liam",
//       createdTime: "2024-06-13",
//       score: 4,
//       reviewComment: "훌륭한 수업이었고, 새로운 취미를 시작하는 데 정말 도움이 되었습니다.",
//     },
//     {
//       id: 5,
//       memberNickname: "Lucas",
//       createdTime: "2024-02-13",
//       score: 5,
//       reviewComment: "I loved this class! It was so fun and the teacher was great.",
//     },
//   ];

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
  const calculateRatings = () => {
    //실제로는 api 가져와서 사용하면 됨
    const ratingCounts = [0, 0, 0, 0, 0]; // 5, 4, 3, 2, 1
    reviews.forEach((review) => {
      ratingCounts[review.score - 1]++;
    });
    const totalReviews = reviews.length;
    return ratingCounts.map((count) =>
      totalReviews > 0 ? (count / totalReviews) * 100 : 0
    );
  };

  const ratingPercentages = calculateRatings();

  // 평균 별점 계산
  const averageRating = (
    reviews.reduce((acc, review) => acc + review.score, 0) / reviews.length
  ).toFixed(1);

  const calculateStarClasses = (index, rating) => {
    if (index < Math.floor(rating)) {
      return "star filled";
    } else if (index === Math.floor(rating) && rating % 1 !== 0) {
      return "star half";
    } else {
      return "star";
    }
  };

  return (
    <div id="mobile-view">
      <header className="app-header reviewHeader defaultHeader">
        <Link to="/home">
          {" "}
          {/* /home/class_application/i 로 고치기 */}
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </Link>
        <h3>클래스 리뷰</h3>
      </header>
      <main id="reviewInner">
        <section className="reviewAverage">
          <div className="averageTitleBox">
            <h3>4.5</h3>
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
              <span>1.5K 리뷰</span>
            </div>
          </div>
          <div className="averageRatingBox">
            {ratingPercentages.map((percentage, index) => (
              <div key={index} className="ratingBarWrapper">
                <div className="ratingLabel">{5 - index}</div>
                <div className="ratingBar">
                  <div
                    className="ratingBarFill"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="ratingPercentage">
                  {percentage.toFixed(0)} %
                </div>
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
        <section id="reviewList">
          {sortedReviews().map(
            (
              review //실제로는 api 값 가져와서
            ) => (
              <div key={review.id} className="reviewItem">
                <div className="reviewProfile">
                  <img
                    src="https://via.placeholder.com/100"
                    className="reviewItemImg"
                  />
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
            )
          )}
        </section>
      </main>
    </div>
  );
};
