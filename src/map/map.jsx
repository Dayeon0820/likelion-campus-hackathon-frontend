// import {React, useState, useEffect} from "react";
// import { Link, useNavigate, NavLink } from "react-router-dom";
// import Navbar from "../main/navbar"
// import "./map.css"

// const ClassMap = () => {
//     const [currentPosition, setCurrentPosition] = useState(null); // 현재 위치
//     const [map, setMap] = useState(null);

//     const new_script = src => {
//         return new Promise((resolve, reject) => {
//             const script = document.createElement("script");
//             script.src = src;
//             script.addEventListener("load", () => {
//                 resolve();
//             });
//             script.addEventListener("error", e => {
//                 reject(e);
//             });
//             document.head.appendChild(script);
//         });
//     };

//     const fetchCurrentPosition = () => { //Geolocation API 현재 위치 가져옴
//         return new Promise((resolve, reject) => {
//             if (navigator.geolocation) {
//                 navigator.geolocation.getCurrentPosition(
//                     (position) => {
//                         const { latitude, longitude } = position.coords;
//                         resolve({
//                             lat: latitude,
//                             lng: longitude
//                         });
//                     },
//                     (error) => {
//                         console.error("Error fetching current position: ", error);
//                         reject(error);
//                     },
//                     {
//                         enableHighAccuracy: true, // 정확도
//                         timeout: 4000, // 최대 대기 시간
//                         maximumAge: 0 // 캐시된 위치 정보 설정
//                     }
//                 );
//             } else {
//                 console.error("Geolocation is not supported by this browser.");
//                 reject(new Error("Geolocation not supported"));
//             }
//         });
//     };

//     useEffect(() => {
//         // 카카오맵 스크립트와 현재 위치를 동시에 가져옴
//         const loadMapAndPosition = async () => {
//             const scriptPromise = new_script('https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=31ab0c2dde1e7c5f97a4aba8000bfd13');
//             const positionPromise = fetchCurrentPosition();

//             try {
//                 // 스크립트와 현재 위치를 동시에 로드
//                 await scriptPromise;
//                 console.log("script loaded!!!");
//                 const kakao = window['kakao'];

//                 const position = await positionPromise;
//                 setCurrentPosition(position);

//                 kakao.maps.load(() => {
//                     const mapContainer = document.getElementById('map');
//                     const options = {
//                         center: new kakao.maps.LatLng(position.lat, position.lng), // 현재 위치로 좌표 설정
//                         level: 3
//                     };
//                     const map = new kakao.maps.Map(mapContainer, options); // 맵 생성
//                     setMap(map);

//                     // 마커 설정
//                     const markerPosition = new kakao.maps.LatLng(position.lat, position.lng);
//                     const marker = new kakao.maps.Marker({
//                         position: markerPosition
//                     });
//                     marker.setMap(map);
//                 });
//             } catch (error) {
//                 console.error("Error loading map or position: ", error);
//             }
//         };

//         loadMapAndPosition();
//     }, []);

//     return (
//         <div id="mobile-view">
//             <div id="map" className="map">
//                 {!currentPosition && <p>Loading map...</p>}
//             </div>
//             <Navbar />
//         </div>
//     );
// };

// export default ClassMap;

// import React, { useState, useEffect } from "react";
// import Navbar from "../main/navbar";
// import "./map.css";

// const ClassMap = () => {
//     const [currentPosition, setCurrentPosition] = useState(null);
//     const [map, setMap] = useState(null);

//     const loadScript = src => {
//         return new Promise((resolve, reject) => {
//             const script = document.createElement("script");
//             script.src = src;
//             script.async = true; // 비동기 로딩
//             script.onload = () => resolve();
//             script.onerror = () => reject(new Error(`Script load error: ${src}`));
//             document.head.appendChild(script);
//         });
//     };

//     const getCurrentPosition = () => {
//         return new Promise((resolve, reject) => {
//             if (navigator.geolocation) {
//                 navigator.geolocation.getCurrentPosition(
//                     position => {
//                         const { latitude, longitude } = position.coords;
//                         resolve({ lat: latitude, lng: longitude });
//                     },
//                     error => reject(error),
//                     { enableHighAccuracy: true, timeout: 4000, maximumAge: 0 }
//                 );
//             } else {
//                 reject(new Error("Geolocation not supported"));
//             }
//         });
//     };

//     useEffect(() => {
//         const initializeMap = async () => {
//             try {
//                 await loadScript('https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=31ab0c2dde1e7c5f97a4aba8000bfd13');
//                 const position = await getCurrentPosition();
//                 setCurrentPosition(position);

//                 const kakao = window['kakao'];
//                 kakao.maps.load(() => {
//                     const mapContainer = document.getElementById('map');
//                     const mapOptions = {
//                         center: new kakao.maps.LatLng(position.lat, position.lng),
//                         level: 3
//                     };
//                     const mapInstance = new kakao.maps.Map(mapContainer, mapOptions);
//                     setMap(mapInstance);

//                     const marker = new kakao.maps.Marker({
//                         position: new kakao.maps.LatLng(position.lat, position.lng)
//                     });
//                     marker.setMap(mapInstance);
//                 });
//             } catch (error) {
//                 console.error("Error initializing map: ", error);
//             }
//         };

//         initializeMap();
//     }, []);

//     return (
//         <div id="mobile-view">
//             <div id="map" className="map">
//                 {!currentPosition && <p>Loading map...</p>}
//             </div>
//             <Navbar />
//         </div>
//     );
// };

// export default ClassMap;

// import React, { useState, useEffect } from "react";
// import Navbar from "../main/navbar";
// import "./map.css";

// const getCachedPosition = () => {
//     const cachedPosition = localStorage.getItem('position');
//     return cachedPosition ? JSON.parse(cachedPosition) : null;
// };

// const cachePosition = (position) => {
//     localStorage.setItem('position', JSON.stringify(position));
// };

// const ClassMap = () => {
//     const [currentPosition, setCurrentPosition] = useState(getCachedPosition());
//     const [map, setMap] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const loadScript = src => {
//         return new Promise((resolve, reject) => {
//             const script = document.createElement("script");
//             script.src = src;
//             script.async = true; // 비동기 로딩
//             script.onload = () => resolve();
//             script.onerror = () => reject(new Error(`Script load error: ${src}`));
//             document.head.appendChild(script);
//         });
//     };

//     const getCurrentPosition = () => {
//         return new Promise((resolve, reject) => {
//             if (navigator.geolocation) {
//                 navigator.geolocation.getCurrentPosition(
//                     position => {
//                         const { latitude, longitude } = position.coords;
//                         const pos = { lat: latitude, lng: longitude };
//                         cachePosition(pos); // 위치 정보를 캐시
//                         resolve(pos);
//                     },
//                     error => reject(error),
//                     { enableHighAccuracy: true, timeout: 4000, maximumAge: 0 }
//                 );
//             } else {
//                 reject(new Error("Geolocation not supported"));
//             }
//         });
//     };

//     useEffect(() => {
//         const initializeMap = async () => {
//             try {
//                 await loadScript('https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=31ab0c2dde1e7c5f97a4aba8000bfd13');
//                 const kakao = window['kakao'];

//                 const position = await getCurrentPosition();
//                 setCurrentPosition(position);

//                 kakao.maps.load(() => {
//                     const mapContainer = document.getElementById('map');
//                     const mapOptions = {
//                         center: new kakao.maps.LatLng(position.lat, position.lng),
//                         level: 3
//                     };
//                     const mapInstance = new kakao.maps.Map(mapContainer, mapOptions);
//                     setMap(mapInstance);

//                     const marker = new kakao.maps.Marker({
//                         position: new kakao.maps.LatLng(position.lat, position.lng)
//                     });
//                     marker.setMap(mapInstance);
//                 });

//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error initializing map: ", error);
//                 setLoading(false);
//             }
//         };

//         initializeMap();
//     }, []);

//     return (
//         <div id="mobile-view">
//             <div id="map" className="map">
//                 {loading && <p>Loading map...</p>}
//             </div>
//             <Navbar />
//         </div>
//     );
// };

// export default ClassMap;

import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../main/navbar";
import "./map.css";

const ClassMap = () => {
  const [map, setMap] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [isPositionLoaded, setIsPositionLoaded] = useState(false);

  // 스크립트 파일 읽어오기
  const new_script = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.addEventListener("load", () => {
        resolve();
      });
      script.addEventListener("error", (e) => {
        reject(e);
      });
      document.head.appendChild(script);
    });
  };

  // 현재 위치를 비동기적으로 요청
  const fetchCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true, // 정확도 높이기
          timeout: 5000, // 최대 대기 시간 (ms)
          maximumAge: 0, // 캐시된 위치 정보를 사용하지 않도록 설정
        }
      );
    });
  };

  // 지도를 초기화하는 함수
  const initializeMap = useCallback(async () => {
    const kakao = window["kakao"];
    try {
      const position = await fetchCurrentPosition();
      setCurrentPosition(position);
      setIsPositionLoaded(true);
      const lat = position.lat; // 현재 위도
      const lng = position.lng; // 현재 경도

      const mapContainer = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(lat, lng), // 좌표설정
        level: 3,
      };
      const createdMap = new kakao.maps.Map(mapContainer, options); // 맵 생성
      setMap(createdMap);

      // 마커 설정
      const positions = [
        {
          content: "<div>현재 위치</div>",
          latlng: new kakao.maps.LatLng(lat, lng),
        },
        {
          content: "<div>카카오</div>",
          latlng: new kakao.maps.LatLng(33.450705, 126.570677),
        },
        {
          content: "<div>생태연못</div>",
          latlng: new kakao.maps.LatLng(33.450936, 126.569477),
        },
        {
          content: "<div>텃밭</div>",
          latlng: new kakao.maps.LatLng(33.450879, 126.56994),
        },
        {
          content: "<div>근린공원</div>",
          latlng: new kakao.maps.LatLng(33.451393, 126.570738),
        },
      ];

      for (let i = 0; i < positions.length; i++) {
        const marker = new kakao.maps.Marker({
          map: createdMap, // 마커를 표시할 지도
          position: positions[i].latlng, // 마커를 표시할 위치
        });

        const infowindow = new kakao.maps.InfoWindow({
          content: positions[i].content, // 인포윈도우에 표시할 내용
        });

        // 마커에 click 이벤트를 등록합니다
        kakao.maps.event.addListener(
          marker,
          "click",
          makeOverListener(createdMap, marker, infowindow)
        );
      }

      function makeOverListener(map, marker, infowindow) {
        return function () {
          infowindow.open(map, marker);
        };
      }
    } catch (error) {
      console.error("Error fetching position:", error);
    }
  }, []);

  useEffect(() => {
    // 카카오맵 스크립트 읽어오기
    const my_script = new_script(
      "https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=cfbc506cfb95deee38b8a0c161e4aa81"
    );

    // 스크립트 읽기 완료 후 카카오맵 설정
    my_script.then(() => {
      console.log("script loaded!!!");
      const kakao = window["kakao"];
      kakao.maps.load(initializeMap);
    });
  }, [initializeMap]);

  // 현재 위치로 이동하는 함수
  const moveToCurrentLocation = () => {
    if (map && currentPosition) {
      const moveLatLon = new window.kakao.maps.LatLng(
        currentPosition.lat,
        currentPosition.lng
      );
      map.setCenter(moveLatLon);
      map.setLevel(3); // 배율을 초기 설정인 3으로 변경
    } else {
      console.error("Current position not available");
    }
  };

  // 제주 시청으로 이동하는 함수
  const moveToJejuCityHall = () => {
    if (map) {
      const jejuCityHallLatLon = new window.kakao.maps.LatLng(
        33.499621,
        126.521954
      ); // 제주 시청의 위도, 경도
      map.setCenter(jejuCityHallLatLon);
      map.setLevel(10); // 배율을 초기 설정인 3으로 변경
    }
  };

  return (
    <div id="mobile-view">
      <div id="map" className="map">
        {!currentPosition && <p>Loading map...</p>}
        {/* <div className="btnBox">
                    <button onClick={moveToCurrentLocation} className="location-button">현재 위치로 이동</button>
                    <button onClick={moveToJejuCityHall} className="location-button">제주</button>
                </div> */}
      </div>
      <Navbar></Navbar>
    </div>
  );
};

export default ClassMap;
