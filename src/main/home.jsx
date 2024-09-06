import {React, useState, useEffect} from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import Navbar from "./navbar"
import "./css/navbar.css";


function Home() {
  const [navItem, setNavItem] = useState([
    {text: 'Search', className: 'search'},
    {text: 'Map', className: 'map'},
    {text: 'Home', className: 'home'},
    {text: 'Chat', className: 'chat'},
    {text: 'Profile', className: 'myPage'},
])

  return (
  <div id="mobile-view">
    <Navbar/>
  </div>
  );
}

export default Home;
