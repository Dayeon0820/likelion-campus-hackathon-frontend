import { React, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./splash.css";

const Splash = () => {

    return(
        <div id="mobile-view" className="splashBg">
            {/* <div className="splashLogo"></div> */}
            {/* <div className="splashLogoSmall"></div> */}
            <div className="splashBox">
                <div className="splashBoxLogo"></div>
                <h1>MOMENT<br/>CLASS</h1>
            </div>
        </div>
    )
}

export default Splash;