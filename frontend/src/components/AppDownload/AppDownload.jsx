import "./AppDownload.css";
import { assets } from "../../assets/assets";

export default function AppDownload() {
  return (
    <div>
      <div className="app-download" id="app-download">
        <p>
          For better experience download <br /> Tomato App{" "}
        </p>
        <div className="app-download-platforms">
          <img src={assets.play_store} alt="play-store-icon" />
          <img src={assets.app_store} alt="app-store-icon" />
        </div>
      </div>
    </div>
  );
}
