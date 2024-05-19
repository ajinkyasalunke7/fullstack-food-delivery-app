import "./Navbar.css";
import { assets } from "../../assets/assets";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("home");
  useEffect(() => {
    console.log("Navbar menu:", menu);
  }, [menu, setMenu]);

  return (
    <div className="navbar">
      <img src={assets.logo} alt="website-logo" className="logo" />
      <ul className="navbar-menu">
        <Link
          to={`/`}
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href={`#explore-menu`}
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href={`#app-download`}
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile App
        </a>
        <a
          href={`#footer`}
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="search-icon" draggable="false" />
        <div className="navbar-search-icon">
          <img
            src={assets.basket_icon}
            className="basket-icon"
            alt="basket-icon"
            draggable="false"
          />
          <div className="dot"></div>
        </div>
        <button onClick={() => setShowLogin(true)}>Sign Up</button>
      </div>
    </div>
  );
}
