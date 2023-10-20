import logo from "../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation } from "react-router-dom";
import PriceRange from "./PriceRange";
import ResetUsers from "./ResetUsers";
import { Link } from "react-router-dom";
import "../assets/styles/header.css";
import React from "react";
// import process from "process"; // Importer process.env
// // ...

// import { loadEnv } from "@next/env";

// // Chargez les variables d'environnement
// loadEnv(process.env.REACT_APP_ENV_PATH);

const Header = ({
  token,
  setUser,
  setFetchRangeValues,
  sortPrice,
  setSortPrice,
  setSearch,
}) => {
  const navigate = useNavigate();

  const location = useLocation();

  // const isAdmin = token === import.meta.env.VITE_REACT_APP_ADMIN_TOKEN;

  // // // Ce n'est qu'un exemple, ajustez en fonction de votre situation.

  // console.log("Admin Token:", admin_token);

  // console.log("User's Token:", token);
  // console.log("isAdmin:", isAdmin);

  return (
    <div className="header-container">
      <div
        onClick={() => {
          navigate("/");
        }}
      >
        <img className="header-logo" src={logo} alt="vinted" />
      </div>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Recherche des articles"
          onChange={(event) => setSearch(event.target.value)}
        />
        <FontAwesomeIcon icon="search" className="search-input-icon" />
        {location.pathname === "/" ? (
          <div>
            <div
              style={{
                marginTop: 25,
                fontSize: "12px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ marginRight: 10 }}>Trier par prix : </span>
              <span className="checkbox">
                <input
                  type="checkbox"
                  checked={sortPrice}
                  onChange={() => {}}
                  name="price"
                />
                <div
                  className="wrapper"
                  onClick={() => {
                    setSortPrice(!sortPrice);
                  }}
                >
                  <div className="knob">
                    <span>{sortPrice ? "⇣" : "⇡"}</span>
                  </div>
                </div>
              </span>
              <span style={{ marginRight: 10 }}>Prix entre : </span>
              <PriceRange setFetchRangeValues={setFetchRangeValues} />
            </div>
          </div>
        ) : null}
      </div>

      {token ? (
        <div>
          {/* Ajoutez un lien vers le tableau de bord */}
          <Link to="/dashboard" className="dashboard-button">
            Tableau de bord
          </Link>
          <button
            onClick={() => {
              setUser(null);
            }}
            className="button-logout"
          >
            Se déconnecter
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={() => {
              navigate("/signup");
            }}
            className="header-button button-login-signup button-signup"
          >
            S'inscrire
          </button>
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="header-button button-login-signup"
          >
            Se connecter
          </button>
        </div>
      )}
      <button
        onClick={() => {
          navigate("/publish");
        }}
        className="header-button button-sold"
      >
        Vends tes articles
      </button>
      {/* Si l'utilisateur est un admin, affichez le bouton de réinitialisation: */}
      {/* {isAdmin && <ResetUsers />} */}
    </div>
  );
};

export default Header;
