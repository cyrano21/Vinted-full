import "../assets/styles/sidebar.css";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ token, setUserToken }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const sidebarRef = useRef();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setUserToken(null);
    navigate("/login");
  };

  useEffect(() => {
    const handlescroll = (e) => {
      if (window.scrollY > 0) {
        setIsOpen(false);
      }
    };
    window.addEventListener("scroll", handlescroll);
    return () => removeEventListener("scroll", handlescroll);
  }, []);

  return (
    <nav className="navbar">
      <div
        ref={sidebarRef}
        className={`burger-menu ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <div className={`bar1 ${isOpen ? "change" : ""}`}></div>
        <div className={`bar2 ${isOpen ? "change" : ""}`}></div>
        <div className={`bar3 ${isOpen ? "change" : ""}`}></div>
      </div>

      <div className={`nav-menu ${isOpen ? "open" : ""}`}>
        <ul className="open-nav">
          {token ? (
            <div className="auth-buttons">
              <button className="header-button button-login-signup button-signup">
                <Link to="/dashboard" className="dashboard-button">
                  Tableau de bord
                </Link>
              </button>

              <button
                onClick={handleLogout}
                className="header-button button-logout header-button button-login-signup button-signup"
              >
                Se déconnecter
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
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
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
