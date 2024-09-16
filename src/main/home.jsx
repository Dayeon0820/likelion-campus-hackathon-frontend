import { React } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Navbar from "./navbar";
import "./css/navbar.css";
import "./css/home_main.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { categoryMap, classTypeMap } from "../utils/mappings";

function Home() {
  // const categoryMap = {
  //   "전체": "ALL",
  //   "요리": "COOK",
  //   "미술": "ART",
  //   "공예": "CRAFT",
  //   "원예": "GARDENING",
  //   "뷰티": "BEAUTY",
  //   "음악": "MUSIC",
  //   "운동": "EXERCISE"
  // };

  // const classTypeMap = {
  //   "전체": "allClass",
  //   "정규": "Regular",
  //   "원데이": "OneDay"
  // };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2300
  };

  return (
    <div id="mobile-view">
      <div id="default-padding">
        <header className="homeHeader">
          <h3>MOMENT CLASS</h3>
        </header>
        <div className="mainContent">
          <section className="classTypeContainer">
            <h4 className="classTxt">클래스 유형</h4>
            <div className="classTypeBox">
              {Object.keys(classTypeMap).map((type) => (
                <Link
                  key={type}
                  className={`typeContent ${classTypeMap[type]}`}
                  to="/home/class_list"
                  state={{ selectedClassType: classTypeMap[type], selectedCategory: 'ALL', categoryMap, classTypeMap }}
                >
                  <p>{type}</p>
                </Link>
              ))}
            </div>
          </section>
          <section className="bestClassContainer">
            <h4 className="classTxt">인기 클래스</h4>
            <Slider {...settings} className="banner">
              <div>
                <img src="https://via.placeholder.com/338x150" alt="배너 1" />
              </div>
              <div>
                <img src="https://via.placeholder.com/338x150" alt="배너 2" />
              </div>
              <div>
                <img src="https://via.placeholder.com/338x150" alt="배너 3" />
              </div>
            </Slider>
          </section>
          <section className="categoryContainer">
            <h4 className="classTxt">카테고리</h4>
            <ul className="categoryBox">
              {Object.keys(categoryMap).map((key, i) => (
                <Link
                  key={i}
                  to="/home/class_list"
                  state={{ selectedCategory: categoryMap[key], categoryMap, classTypeMap }}
                >
                  <li className={`${categoryMap[key]} categoryHomeList`}>
                    {key}
                  </li>
                </Link>
              ))}
            </ul>
          </section>
        </div>
      </div>
      <Navbar />
    </div>
  );
}

export default Home;







// import { React } from "react";
// import { Link } from "react-router-dom";
// import Slider from "react-slick";
// import Navbar from "./navbar";
// import "./css/navbar.css";
// import "./css/home_main.css";
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// function Home() {
//   const category = [
//     {text: '전체' , className: 'ALL'},
//     {text: '요리' , className: 'COOK'},
//     {text: '미술' , className: 'ART'},
//     {text: '공예' , className: 'CRAFT'},
//     {text: '원예' , className: 'GARDENING'},
//     {text: '뷰티' , className: 'BEAUTY'},
//     {text: '음악' , className: 'MUSIC'},
//     {text: '운동' , className: 'EXERCISE'},
//   ];

//   const classTypes = [
//     { type: "전체", className: "allType", state: "allClass" },
//     { type: "정규", className: "regularType", state: "Regular" },
//     { type: "원데이", className: "onedayType", state: "OneDay" }
//   ];

//   const settings = { // 배너 세팅
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2300
//   };

//   return (
//     <div id="mobile-view">
//       <div id="default-padding">
//         <header className="homeHeader">
//           <h3>MOMENT CLASS</h3>
//         </header>
//         <div className="mainContent">
//           <section className="classTypeContainer">
//             <h4 className="classTxt">클래스 유형</h4>
//             <div className="classTypeBox">
//               {classTypes.map((item, index) => (
//                 <Link
//                   key={index}
//                   className={`typeContent ${item.className}`}
//                   to="/home/class_list"
//                   state={{ selectedClassType: item.state, selectedCategory: 'ALL' }}
//                 >
//                   <p>{item.type}</p>
//                 </Link>
//               ))}
//             </div>
//           </section>
//           <section className="bestClassContainer">
//             <h4 className="classTxt">인기 클래스</h4>
//             <Slider {...settings} className="banner">
//               <div>
//                 <img src="https://via.placeholder.com/338x150" alt="배너 1" />
//               </div>
//               <div>
//                 <img src="https://via.placeholder.com/338x150" alt="배너 2" />
//               </div>
//               <div>
//                 <img src="https://via.placeholder.com/338x150" alt="배너 3" />
//               </div>
//             </Slider>
//           </section>
//           <section className="categoryContainer">
//             <h4 className="classTxt">카테고리</h4>
//             <ul className="categoryBox">
//               {category.map((item, i) => (
//                 <Link
//                   key={i}
//                   to="/home/class_list"
//                   state={{ selectedCategory: item.className }}
//                 >
//                   <li className={`${item.className} categoryHomeList`}>
//                     {item.text}
//                   </li>
//                 </Link>
//               ))}
//             </ul>
//           </section>
//         </div>
//       </div>
//       <Navbar />
//     </div>
//   );
// }

// export default Home;