import { React, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./css/review.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const ReviewInquiry = () => {
  const { id } = useParams();
  const [review, setReview] = useState([]);
  const [averageScore, setAverageScore] = useState({});
  const [sortOption, setSortOption] = useState("latest");
  const ratingLabels = [5, 4, 3, 2, 1]; 

  // 리뷰 데이터 및 평균 스코어 가져오기
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`https://sangsang2.kr:8080/api/review/?lectureId=${id}`);
        const reviewData = await response.json();
        setReview(reviewData);
      } catch (error) {
        console.error('리뷰 정보를 가져오지 못했습니다:', error);
        alert('리뷰 정보를 가져오지 못했습니다.');
      }
    };

    const fetchAverageScore = async () => {
      try {
        const response = await fetch(`https://sangsang2.kr:8080/api/review/score/average?lectureId=${id}`);
        const averageData = await response.json();
        setAverageScore(averageData);
      } catch (error) {
        console.error('평균 스코어 정보를 가져오지 못했습니다:', error);
        alert('평균 스코어 정보를 가져오지 못했습니다.');
      }
    };

    fetchReviews();
    fetchAverageScore();
  }, [id]);
  const ratingScores = [
    averageScore.scoreFive,
    averageScore.scoreFour,
    averageScore.scoreThree,
    averageScore.scoreTwo,
    averageScore.scoreOne
  ]; // 별점에 대한 비율 배열




  // 리뷰 정렬
  const sortedReviews = () => {
    let sorted = [...review];
    if (sortOption === "rating") {
      sorted.sort((a, b) => b.score - a.score);
    } else {
      sorted.sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime));
    }
    return sorted;
  };

  return (
    <div id="mobile-view">
      <header className="app-header reviewHeader defaultHeader">
        <Link to={`/home/class_application/${id}`}>
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
                    className={index < averageScore.averageScore ? "star filled" : "star"}
                  />
                ))}
              </div>
              <span>{averageScore.totalReviewCount || 0}개 리뷰</span>
            </div>
          </div>

          <div className="averageRatingBox">
    {ratingLabels.map((label, index) => (
      <div key={label} className="ratingBarWrapper">
        <div className="ratingLabel">{label}</div>
        <div className="ratingBar">
          <div
            className="ratingBarFill"
            style={{ width: `${ratingScores[index]}%` }}
          ></div>
        </div>
        <div className="ratingPercentage">{ratingScores[index]}%</div>
      </div>
    ))}
  </div>
        </section>

        <div className="reviewBtnBox">
          <select
            name="sort"
            id="reviewSelect"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)} // setSortOption으로 변경
          >
            <option value="latest">최신순</option>
            <option value="rating">별점순</option>
          </select>
        </div>

        <section id="reviewList">
          {sortedReviews().map(review => (
            <div key={review.id} className="reviewItem">
              <div className="reviewProfile">
                <img src={`${review.memberImageUrl || `https://via.placeholder.com/100`}`} className="reviewItemImg" />
                <div>
                  <h5>{review.memberNickname}</h5>
                  <p>{review.createdTime}</p>
                </div>
              </div>
              <div className="rating">
                {Array.from({ length: review.score }, (_, index) => (
                  <FontAwesomeIcon key={index} icon={faStar} className="individualStar" />
                ))}
              </div>
              <p className="reviewComment">{review.reviewComment}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default ReviewInquiry;


