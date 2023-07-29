import { Link } from "react-router-dom";
import banner from "../assets/images/hero-banner.jpg";
// import whiteCut from "../assets/images/banner-cut.svg";
import "../components/hero.css";

const Hero = () => {
  const containerStyle = {
    backgroundImage: `url(${banner})`,
    width: "100%",
    height: "455px",
    position: "relative",
  };

  return (
    <div className="hero-hero">
      <div style={containerStyle}>
        <div style={{ color: "black" }}>
          <div className="home-ready">
            <h1>Prêts à faire du tri dans vos plaquards ?</h1>
            <Link to="/publish">
              <button>Commencer à vendre</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
