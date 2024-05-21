import "./Navbar.css";
import { assets } from "../../assets/assets.js";

export default function Navbar() {
  return (
    <div>
      <div className="navbar">
        <img className="logo" src={assets.logo} alt="admin-panel-logo" />
        <img
          className="profile"
          src={assets.profile_image}
          alt="admin-panel-profile-logo"
        />
      </div>
    </div>
  );
}
