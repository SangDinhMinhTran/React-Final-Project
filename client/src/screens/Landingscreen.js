import React from "react";
import moment from "moment"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from "react-router-dom";
AOS.init({
    duration:'2000'
});
function Landingscreen() {
  return (
    <div className="">
      <div className="landing justify-content-center text-center">
        <div>
          <img src="https://www.fairmont.com/assets/0/104/105/334/336/337/30e63ac3-e07a-4131-b1ee-1954b451fb5a.jpg" className="img-fluid"/>
          <h2 style={{ color: "white", fontSize: "100px" }} data-aos='zoom-in'>Hotel Frenzy</h2>
          <h1 style={{ color: "white"}} data-aos='zoom-out' >"Travel Simplified"</h1>
          <Link to="/home">
             <button className='btn btn-primary'>Get Started</button>
          </Link>
        </div>


      </div>

    </div>
  );
}

export default Landingscreen;
