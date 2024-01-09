import logo from "../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation } from "react-router-dom";
import PriceRange from "./PriceRange";
import ResetUsers from "./ResetUsers";
import { Link } from "react-router-dom";
import "../assets/styles/header.css";
import React from "react";

const Header = ({
  token,
  setUserToken,
  setFetchRangeValues,
  sortPrice,
  setSortPrice,
  setSearch,
}) => {
  const navigate = useNavigate();

  const location = useLocation();

  const handleLoginClick = () => {
    navigate("/login");
  };

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
              setUserToken(null);
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
            onClick={handleLoginClick}
            className="header-button button-login-signup"
          >
            Se connecter
          </button>
        </div>
      )}
      <button
        onClick={() => {
          token ? navigate("/publish") : navigate("/login");
        }}
        className="header-button button-sold"
      >
        Vends tes articles
      </button>
    </div>
  );
};

export default Header;
