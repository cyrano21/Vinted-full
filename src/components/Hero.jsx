import { Link } from "react-router-dom";
import banner from "../assets/images/hero-image.jpg";
// import whiteCut from "../assets/images/banner-cut.svg";
import "../components/hero.css";

const Hero = () => {
  const containerStyle = {
    backgroundImage: `url(${banner})`,
    backgroundPosition: "50%",
    backgroundSize: "cover",
    height: "455px",
    position: "relative",
    width: "100%",
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
