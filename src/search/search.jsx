import {React, useState, useEffect } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import "./css/search_main.css";
import Navbar from "../main/navbar";

const SearchPage = () => {
    const [recentSearches, setRecentSearches] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    
    // 로컬 스토리지에서 최근 검색어 가져오기
    useEffect(() => {
        const storedSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
        setRecentSearches(storedSearches);
    }, []);
    const handleSearch = (event) => {
        event.preventDefault();
        if (searchInput.trim() === "") return;

        const updatedSearches = [searchInput, ...recentSearches.filter((item) => item !== searchInput)].slice(0, 6); // 최대 5개 유지
        setRecentSearches(updatedSearches);
        localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));

        // 검색 후 입력 초기화
        setSearchInput("");
    };

    // 최근 검색어 개별삭제
    const removeSearch = (searchToRemove) => {
        const updatedSearches = recentSearches.filter((item) => item !== searchToRemove);
        setRecentSearches(updatedSearches);
        localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    };

    // 최근 검색어 전체삭제
    const clearRecentSearches = () => {
        localStorage.removeItem("recentSearches");
        setRecentSearches([]);
    };

    return(
        <div id="mobile-view">
            <header className="app-header reviewHeader defaultHeader">
                <Link to="/home/class_application">
                    <span className="material-symbols-outlined">arrow_back_ios</span>
                </Link>
                <h3>검색</h3>
            </header>
            <main id="default-padding" className="searchMain">
                <form onSubmit={handleSearch} className="search-form">
                    <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="search-input"
                    />
                    <button type="submit" className="search-button">
                        <span className="material-symbols-outlined">search</span>
                    </button>
                </form>
                <section className="recent-searches">
                    <div className="recentHeader">
                        <h4>최근 검색</h4>
                        <span onClick={clearRecentSearches} class="material-symbols-outlined">delete</span>
                    </div>
                    <div className="recent-tags">
                        {recentSearches.map((search, index) => (
                            <div key={index} className="search-tag">
                                <p>{search}</p>
                                <button
                                    className="remove-search-button"
                                    onClick={() => removeSearch(search)}
                                > ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
                <section className="popularContent">
                    <h4>인기 검색어</h4>
                </section>
            </main>
            <Navbar/>
        </div>
    )
}

export default SearchPage