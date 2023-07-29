import "../Header/header.css";
import logo from "../../assets/images/Vinted_logo.png";

import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="" />
      </div>

      <div className="search-container">
        <input
          type="search"
          name=""
          id=""
          placeholder="Recherche des articles"
          className="search-bar"
        />

        <div className="margin-top">
          <span className="style-right">trier par prix :</span>
          <span className="checkbox1">
            <input type="checkbox" name="price" id="" />
            <div className="wrapper">
              <div className="knob">
                <span>⇡</span>
              </div>
            </div>
          </span>
          <span className="style-right">Prix entre :</span>
          <div className="transform">
            <div className="height">
              <div className="position1">
                <div className="style">10$</div>
              </div>
              <div className="position2">
                <div className="style">100$</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="btn-block">
        <Link to="/signup">
          <button>S'inscrire</button>
        </Link>

        <Link to="/signin">
          <button>Se connecter</button>
        </Link>
      </div>
      <div>
        <button>Vends tes articles</button>
      </div>
    </header>
  );
}
