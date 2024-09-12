

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
                        timeout: 4000, // 최대 대기 시간
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
                        level: 3
                    };
                    const map = new kakao.maps.Map(mapContainer, options); // 맵 생성
                    setMap(map);

                    // 마커 설정
                    const markerPosition = new kakao.maps.LatLng(position.lat, position.lng);
                    const marker = new kakao.maps.Marker({
                        position: markerPosition
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