import {React, useState} from 'react';
import { Link, useNavigate, NavLink } from "react-router-dom";
import "./css/navbar.css"

const Navbar = () => {
    const [navItem, setNavItem] = useState([
        {text: 'Search', className: 'search'},
        {text: 'Map', className: 'map'},
        {text: 'Home', className: 'home'},
        {text: 'Chat', className: 'chats'},
        {text: 'Profile', className: 'profile'},
    ])
  
    return( 
      <div id="navBar">
      {navItem.map((item,i) => {
        return(
          <NavLink
            key={i}
            to={`/${item.className}`}
            className={`${item.className}Link navLink`}
            activeClassName="activeNav"
          >
            <span className={`${item.className}Icon navbarIcon`}></span>
            <p className={`${item.className}Txt`}>{item.text}</p>
          </NavLink>
        )
      })}
    </div>
    )
  }

export default Navbar;