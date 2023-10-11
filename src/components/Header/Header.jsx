import "../Header/header.css";
import logo from "../../assets/images/Vinted_logo.png";
import { Link } from "react-router-dom";
import OffersPage from "../OffersPage/OffersPage";
import { useLocation } from "react-router-dom";

export default function Header({ userToken, setUserToken }) {
  const location = useLocation();

  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </div>

      <div className="search-container">
        <input
          type="search"
          placeholder="Recherche des articles"
          className="search-bar"
        />

        {(location.path = "/" && <OffersPage />)}
      </div>

      <div className="btn-block">
        {userToken ? (
          <button
            onClick={() => {
              setUserToken("");
            }}
            className="deconnect"
          >
            Se déconnecter
          </button>
        ) : (
          <>
            <Link to="/signup">
              <button>S'inscrire</button>
            </Link>

            <Link to="/signin">
              <button>Se connecter</button>
            </Link>
          </>
        )}
      </div>
      <div>
        <Link to="/publish">
          <button className="sell">Vends tes articles</button>
        </Link>
      </div>
    </header>
  );
}
