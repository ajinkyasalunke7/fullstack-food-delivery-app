import { assets } from "../../assets/assets";
import "./Footer.css";

export default function Footer() {
  return (
    <div>
      <div className="footer" id="footer">
        <div className="footer-content">
          <div className="footer-content-left">
            <img src={assets.logo} alt="app-logo" />
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Explicabo incidunt harum aperiam eaque quos labore corporis
              dolorum modi impedit placeat.
            </p>
            <div className="footer-social-icons">
              <img src={assets.facebook_icon} alt="facebook-icon" />
              <img src={assets.twitter_icon} alt="twitter-icon" />
              <img src={assets.linkedin_icon} alt="linkedin-icon" />
            </div>
          </div>
          <div className="footer-content-center">
            <h2>Company</h2>
            <ul>
              <li>Home</li>
              <li>About Us</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="footer-content-right">
            <h2>Get in touch</h2>
            <ul>
              <li>+91 69451343</li>
              <li>contact@figgy.com</li>
              <li></li>
            </ul>
          </div>
        </div>
        <hr />
        <p className="footer-copyright">
          Copyright 2024 © Tomato.com - All Right Reserved
        </p>
      </div>
    </div>
  );
}
