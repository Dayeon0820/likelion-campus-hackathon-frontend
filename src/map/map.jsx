import {React, useState, useEffect} from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import Navbar from "../main/navbar"
import "./map.css"

const ClassMap = () => {
    const [currentPosition, setCurrentPosition] = useState(null); // 현재 위치
    const [map, setMap] = useState(null); 

    const new_script = src => {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = src;
            script.addEventListener("load", () => {
                resolve();
            });
            script.addEventListener("error", e => {
                reject(e);
            });
            document.head.appendChild(script);
        });
    };

    const fetchCurrentPosition = () => { //Geolocation API 현재 위치 가져옴
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        resolve({
                            lat: latitude,
                            lng: longitude
                        });
                    },
                    (error) => {
                        console.error("Error fetching current position: ", error);
                        reject(error);
                    },
                    {
                        enableHighAccuracy: true, // 정확도
                        timeout: 5000, // 최대 대기 시간
                        maximumAge: 0 // 캐시된 위치 정보 설정
                    }
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
                reject(new Error("Geolocation not supported"));
            }
        });
    };

    useEffect(() => {
        // 카카오맵 스크립트와 현재 위치를 동시에 가져옴
        const loadMapAndPosition = async () => {
            const scriptPromise = new_script('https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=31ab0c2dde1e7c5f97a4aba8000bfd13');
            const positionPromise = fetchCurrentPosition();

            try {
                // 스크립트와 현재 위치를 동시에 로드
                await scriptPromise;
                console.log("script loaded!!!");
                const kakao = window['kakao'];

                const position = await positionPromise;
                setCurrentPosition(position);

                kakao.maps.load(() => {
                    const mapContainer = document.getElementById('map');
                    const options = {
                        center: new kakao.maps.LatLng(position.lat, position.lng), // 현재 위치로 좌표 설정
                        level: 5 // 줌 레벨 변경
                    };
                    const map = new kakao.maps.Map(mapContainer, options); // 맵 생성
                    setMap(map);

                    // 등록된 클래스 위치 리스트 (서울, 경기 지역 임의 좌표)
                    const classLocations = [
                        { lat: 37.5665, lng: 126.9780, name: '서울' }, // 서울시청
                        { lat: 37.4835, lng: 126.9014, name: '서울 강서' }, // 서울 강서구
                        { lat: 37.4563, lng: 126.7052, name: '인천' }, // 인천
                        { lat: 37.5469, lng: 127.0959, name: '서울 강동' }, // 서울 강동구
                        { lat: 37.2752, lng: 127.0095, name: '경기 성남' }, // 경기 성남
                        { lat: 37.3942, lng: 126.9568, name: '경기 안양' }, // 경기 안양
                    ];

                    // 각 클래스 위치에 마커 표시
                    classLocations.forEach(location => {
                        const markerPosition = new kakao.maps.LatLng(location.lat, location.lng);
                        const marker = new kakao.maps.Marker({
                            position: markerPosition
                        });

                        // 마커를 지도에 추가
                        marker.setMap(map);

                        // 마커에 마우스 오버 시 클래스명을 표시하는 인포윈도우
                        const infowindow = new kakao.maps.InfoWindow({
                            content: `<div style="padding:5px;font-size:12px;">${location.name}</div>`
                        });

                        // 마커에 이벤트 등록
                        kakao.maps.event.addListener(marker, 'mouseover', () => {
                            infowindow.open(map, marker);
                        });
                        kakao.maps.event.addListener(marker, 'mouseout', () => {
                            infowindow.close();
                        });
                    });

                    // 현재 위치에 마커 설정
                    const markerPosition = new kakao.maps.LatLng(position.lat, position.lng);
                    const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; // 커스텀 이미지 URL
                    const imageSize = new kakao.maps.Size(24, 35); // 마커 이미지 크기
                    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
                    
                    const marker = new kakao.maps.Marker({
                        position: markerPosition,
                        image: markerImage, // 커스텀 마커 이미지 설정
                    });
                    marker.setMap(map); 
                });
            } catch (error) {
                console.error("Error loading map or position: ", error);
            }
        };

        loadMapAndPosition();
    }, []);

    return (
        <div id="mobile-view">
            <header className="app-header mapHeader">
                <h3>Map</h3>
            </header>
            <div id="map" className="map">
                {!currentPosition && <p>Loading map...</p>}
            </div>
            <Navbar />
        </div>
    );
};

export default ClassMap;





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
//             <header className=".app-header mapHeader"></header>
//             <div id="map" className="map">
//                 {loading && <p>Loading map...</p>}
//             </div>
//             <Navbar />
//         </div>
//     );
// };

// export default ClassMap;