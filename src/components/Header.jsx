import logo from "../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation } from "react-router-dom";
import PriceRange from "./PriceRange";
import ResetUsers from "./ResetUsers";
import { Link } from "react-router-dom";
import "../assets/styles/header.css";
import React from "react";
import Sidebar from "./Sidebar";

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

  return (
    <div className="header-container">
      <div
        onClick={() => {
          navigate("/");
        }}
      >
        <img className="header-logo" src={logo} alt="vinted" />
        <Sidebar token={token} setUserToken={setUserToken} />

        <div className="header-links">
          <ul>
            {token ? (
              <div className="auth-buttons">
                <Link to="/dashboard" className="dashboard-button">
                  Tableau de bord
                </Link>

                <button
                  onClick={() => {
                    setUserToken(null);
                  }}
                  className="header-button button-logout "
                >
                  Se déconnecter
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                {/* <button
                  onClick={() => {
                    setUserToken(null);
                    navigate("/signup");
                  }}
                  className="header-button button-login-signup button-signup"
                >
                  S'inscrire
                </button> */}

                <Link to="/signup">
                  <button className="header-button button-login-signup button-signup">
                    S'inscrire
                  </button>
                </Link>

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
          </ul>
        </div>
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
          <div className="random">
            <div
              className="btn-random"
              style={{
                marginTop: 25,
                fontSize: "12px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ marginRight: 10, color: "white" }}>
                Trier par prix :{" "}
              </span>
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
              <span style={{ marginRight: 10, color: "white" }}>
                Prix entre :{" "}
              </span>
              <PriceRange setFetchRangeValues={setFetchRangeValues} />
            </div>
          </div>
        ) : null}
      </div>
      <button
        onClick={() => {
          if (!token) {
            navigate("/login");
          } else {
            navigate("/publish");
          }
        }}
        className="header-button button-sold"
      >
        Vends tes articles
      </button>
      //
    </div>
  );
};

export default Header;
