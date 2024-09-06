import {React, useState} from 'react';
import { Link, useNavigate, NavLink } from "react-router-dom";
import "./css/navbar.css"

const Navbar = () => {
    const [navItem, setNavItem] = useState([
        {text: '검색', className: 'search'},
        {text: '지도', className: 'map'},
        {text: '홈', className: 'home'},
        {text: '채팅', className: 'chat'},
        {text: '내 정보', className: 'myPage'},
    ])
  
    return( 
      <div id="navBar">
      {navItem.map((item,i) => {
        return(
          <NavLink
            key={i}
            to={`/${item.className}`}
            className={`${item.className}Link menuLink`}
            activeClassName="activeNav"
          >
            <span className={`${item.className}Icon`}></span>
            <p className={`${item.className}Txt`}>{item.text}</p>
          </NavLink>
        )
      })}
    </div>
    )
  }

export default Navbar;