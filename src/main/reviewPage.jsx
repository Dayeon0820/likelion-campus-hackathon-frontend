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
        const response = await fetch(`http://sangsang2.kr:8080/api/review/?lectureId=${id}`);
        const reviewData = await response.json();
        setReview(reviewData);
      } catch (error) {
        console.error('리뷰 정보를 가져오지 못했습니다:', error);
        alert('리뷰 정보를 가져오지 못했습니다.');
      }
    };

    const fetchAverageScore = async () => {
      try {
        const response = await fetch(`http://sangsang2.kr:8080/api/review/score/average?lectureId=${id}`);
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
            onChange={(e) => setSortOption(e.target.value)}
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


// import {React, useState, useEffect } from "react";
// import { Link, useNavigate, NavLink, useParams } from "react-router-dom";
// import "./css/review.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStar } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";

// const ReviewInquiry = () => {
//     const { id } = useParams();
//     const token = localStorage.getItem('token');
//     console.log(id,'강의 id')
//     const [review, setReview] = useState([]);
//     const [averageScore, setAverageScore] = useState([]);
//     const [sortOption, setSortOption] = useState("latest"); // 정렬 옵션 상태
    

//     //리뷰 데이터 가져오기
//     useEffect(() => {
//         const fetchReviews = async () => {
//             console.log(id,'리뷰 데이터 가져오는 console.log')
//             try{
//                 const response = await fetch(`http://sangsang2.kr:8080/api/review/?lectureId=${id}`);
//                 const reviewData = await response.json();
//                 console.log(reviewData,'reviewData');
//                 setReview(reviewData);
//             } catch (error) {
//                 console.error('리뷰 정보 가져오지 못했음',error)
//                 alert('리뷰 정보 가져오지 못했음')
//             }
//             console.log(review)
//         };

//         const fetchAverageScore = async () => {
//             try{
//                 const response = await fetch(`http://sangsang2.kr:8080/api/review/score/average?lectureId=${id}`);
//                 if(!response.ok) {
//                     throw new Error("API 호출 실패");
//                 }
//                 const averageData = await response.json()
//                 setAverageScore(averageData);
//                 console.log(averageData,'평균')
//             } catch(error){
//                 console.error('평균 스코어 정보 가져오지 못했음',error)
//                 alert('평균 스코어 정보 가져오지 못했음')
//             }
//             console.log(averageScore,'averageScore');
//         }

//         fetchReviews();
//         fetchAverageScore();

//     }, []);

//     // 리뷰 정렬
//     const sortedReviews = () => {
//         let sorted = [...review]; // 리뷰 복사본 생성
//         if (sortOption === "rating") {
//             // 별점 순으로 정렬
//             sorted.sort((a, b) => b.score - a.score);
//         } else {
//             // 최신순 정렬 (날짜순)
//             sorted.sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime));
//         }
//         return sorted;
//     };

//     // 평점별 리뷰 비율 계산
//     const calculateRatings = () => { //실제로는 api 가져와서 사용하면 됨
//         const ratingCounts = [0, 0, 0, 0, 0]; // 5, 4, 3, 2, 1
//         review.forEach(review => {
//             ratingCounts[review.score - 1]++;
//         });
//         const totalReviews = review.length;
//         return ratingCounts.map(count => (totalReviews > 0 ? (count / totalReviews) * 100 : 0));
//     };

//   const ratingPercentages = calculateRatings();

//     // 평균 별점 계산
//     const averageRating = (
//         review.reduce((acc, review) => acc + review.score, 0) / review.length
//     ).toFixed(1);

//   const calculateStarClasses = (index, rating) => {
//       if (index < Math.floor(rating)) {
//           return "star filled";
//       } else if (index === Math.floor(rating) && rating % 1 !== 0) {
//           return "star half";
//       } else {
//           return "star";
//       }
//   };

//     return(
//         <div id="mobile-view">
//             <header className="app-header reviewHeader defaultHeader">
//                 <Link to={`/home/class_application/${id}`}> 
//                     <span className="material-symbols-outlined">arrow_back_ios</span>
//                 </Link>
//                 <h3>클래스 리뷰</h3>
//             </header>
//             <main id="reviewInner">
//                 <section className="reviewAverage">
//                     <div className="averageTitleBox">
//                         <h3>{averageScore.averageScore}</h3>
//                         <div className="totalStarBox">
//                             <div className="averageStar">
//                                 {[...Array(5)].map((_, index) => (
//                                     <FontAwesomeIcon
//                                         key={index}
//                                         icon={faStar}
//                                         className={calculateStarClasses(index, averageRating)}
//                                     />
//                                 ))}
//                             </div>
//                             <span>{averageScore.totalReviewCount}개 리뷰</span>
//                         </div>
//                     </div>
//                     <div className="averageRatingBox">
//                         {ratingPercentages.map((percentage, index) => (
//                             <div key={index} className="ratingBarWrapper">
//                                 <div className="ratingLabel">{5 - index}</div>
//                                 <div className="ratingBar">
//                                     <div className="ratingBarFill" style={{ width: `${percentage}%` }}></div>
//                                 </div>
//                                 <div className="ratingPercentage">{percentage.toFixed(0)} %</div>
//                             </div>
//                         ))} 
//                     </div>
//         </section>
//         <div className="reviewBtnBox">
//           {" "}
//           {/* 시간 남으면 별점 선택해서 보는 것도 select추가 */}
//           <select
//             name="sort"
//             id="reviewSelect"
//             value={sortOption}
//             onChange={(e) => setSortOption(e.target.value)}
//           >
//             <option value="latest">최신순</option>
//             <option value="rating">별점순</option>
//           </select>
//         </div>
//         <section id="reviewList">
//                     {sortedReviews().map(review => ( 
//                         <div key={review.id} className="reviewItem">
//                             <div className="reviewProfile">
//                                 <img src={`${review.memberImageUrl || `https://via.placeholder.com/100`}`} className="reviewItemImg"/>
//                                 <div>
//                                     <h5>{review.memberNickname}</h5>
//                                     <p>{review.createdTime}</p>
//                                 </div>
//                             </div>
//                             <div className="rating">
//                                 {Array.from({ length: review.score }, (_, index) => (
//                                     <FontAwesomeIcon
//                                         key={index}
//                                         icon={faStar}
//                                         className="individualStar"
//                                     />
//                                 ))}
//                             </div>
//                             <p className="reviewComment">{review.reviewComment}</p>
//                         </div>
//                     ))}
//                 </section>
//       </main>
//     </div>
//   );
// };

// export default ReviewInquiry;
