import {React, useState, useEffect } from "react-dom";
import { Link, useNavigate, NavLink } from "react-router-dom";
import "./css/search_main.css";

const SearchPage = () => {


    return(
        <div id="mobile-view">
            <header className="app-header reviewHeader defaultHeader">
                <Link to="/home/class_application">
                    <span class="material-symbols-outlined">arrow_back_ios</span>
                </Link>
                <h3>검색</h3>
            </header>
        </div>
    )
}

export default SearchPage