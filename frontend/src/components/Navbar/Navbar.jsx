import "./Navbar.css";
import { assets } from "../../assets/assets";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

export default function Navbar({ setShowLogin }) {
  const { getTotalCartAmount } = useContext(StoreContext);

  const [menu, setMenu] = useState("home");
  useEffect(() => {
    console.log("Navbar menu:", menu);
  }, [menu, setMenu]);

  return (
    <div className="navbar">
      <Link to={`/`}>
        <img src={assets.logo} alt="website-logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to={`/`}
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href={`/#explore-menu`}
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href={`/#app-download`}
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile App
        </a>
        <a
          href={`/#footer`}
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="search-icon" draggable="false" />
        <div className="navbar-search-icon">
          <Link to={`/cart`}>
            <img
              src={assets.basket_icon}
              className={`basket-icon ${
                getTotalCartAmount() === 0 ? "" : "bounce"
              }`}
              alt="basket-icon"
              draggable="false"
            />
          </Link>

          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        <button onClick={() => setShowLogin(true)}>Sign Up</button>
      </div>
    </div>
  );
}
