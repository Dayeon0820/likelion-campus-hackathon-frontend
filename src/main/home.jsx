import {React, useState, useEffect} from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import Navbar from "./navbar"
import "./css/navbar.css";


function Home() {

  return (
  <div id="mobile-view">
    <Navbar/>
  </div>
  );
}

export default Home;
