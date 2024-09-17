import { React, useState, useEffect } from "react";
import Navbar from "../main/navbar";
import "./map.css";

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

    const fetchCurrentPosition = () => { // Geolocation API 현재 위치 가져옴
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
                        level: 6 // 줌 레벨 변경
                    };
                    const map = new kakao.maps.Map(mapContainer, options); // 맵 생성
                    setMap(map);

                    // 줌 컨트롤 추가
                    const zoomControl = new kakao.maps.ZoomControl();
                    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);


                    // 등록된 클래스 위치 리스트 (서울, 경기 지역 임의 좌표)
                    const classLocations = [
                        { lat: 37.5665, lng: 126.9780, name: '서울' },        // 서울시청
                        { lat: 37.4835, lng: 126.9014, name: '서울 강서' },     // 서울 강서구
                        { lat: 37.4563, lng: 126.7052, name: '인천' },         // 인천
                        { lat: 37.5469, lng: 127.0959, name: '서울 강동' },     // 서울 강동구
                        { lat: 37.3219, lng: 126.8309, name: '안산 중앙' },     // 안산 중앙
                        { lat: 37.3235, lng: 126.8219, name: '안산 고잔' },     // 안산 고잔
                        { lat: 37.3299, lng: 126.8257, name: '안산 상록수' },   // 안산 상록수
                        { lat: 37.33118253419755, lng: 126.81438472991468, name: '안산 화랑유원지' },
                        { lat: 37.4565, lng: 126.7070, name: '서울 마포' },     // 서울 마포구
                        { lat: 37.5817, lng: 127.0057, name: '서울 종로' },     // 서울 종로구
                        { lat: 37.5610, lng: 126.9836, name: '서울 중구' },     // 서울 중구
                        { lat: 37.4953, lng: 127.0384, name: '서울 강남' },     // 서울 강남구
                        { lat: 37.4900, lng: 126.9170, name: '서울 영등포' },   // 서울 영등포구
                    ];

                    // 각 클래스 위치에 마커 표시
                    classLocations.forEach(location => {
                        const markerPosition = new kakao.maps.LatLng(location.lat, location.lng);
                        const marker = new kakao.maps.Marker({
                            position: markerPosition
                        });
                        console.log(location)

                        // 마커를 지도에 추가
                        marker.setMap(map);

                        // 마커에 마우스 오버 시 클래스명을 표시하는 인포윈도우
                        const infowindow = new kakao.maps.InfoWindow({
                            content: `<div style="padding:5px;font-size:12px;">${location.name} <br/><a href="https://map.kakao.com/link/to/${location.name},${location.lat},${location.lng}" style="color:blue" target="_blank">길찾기</a> </div>`
                        });

                        // 마커에 이벤트 등록
                        let isOpen = false; // 인포윈도우가 열린 상태를 추적할 변수

                        // 마우스 오버 시 인포윈도우 열기
                        // kakao.maps.event.addListener(marker, 'mouseover', () => {
                        //     if (!isOpen) {
                        //         infowindow.open(map, marker);
                        //         isOpen = true;
                        //     }
                        // });

                        // 마커 클릭 시 인포윈도우 열기 및 닫기
                        kakao.maps.event.addListener(marker, 'click', () => {
                            if (isOpen) {
                                infowindow.close();
                                isOpen = false;
                            } else {
                                infowindow.open(map, marker);
                                isOpen = true;
                            }
                        });
                        // 지도의 클릭 이벤트를 추가하여 인포윈도우 닫기
                        kakao.maps.event.addListener(map, 'click', () => {
                            if (isOpen) {
                                infowindow.close();
                                isOpen = false;
                            }
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
                console.error("현재 위치를 불러오지 못했습니다 ", error);
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