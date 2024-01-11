import "../assets/styles/sidebar.css";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ token, setUserToken, burgerActive, onClose }) => {
  const navigate = useNavigate();
  const sidebarRef = useRef();

  const handleLogout = () => {
    setUserToken(null);
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      id="side-bar"
      ref={sidebarRef}
      className={`sidebar ${burgerActive ? "active" : ""}`}
    >
      {/* <div className="sidebar-close" onClick={onClose}></div> */}

      <ul>
        {token && (
          <li onClick={() => navigate("/dashboard")}>Tableau de bord</li>
        )}
        {!token && (
          <>
            <li onClick={() => navigate("/signup")}>S'inscrire</li>
            <li onClick={() => navigate("/login")}>Se connecter</li>
          </>
        )}
        {token && <li onClick={handleLogout}>Se déconnecter</li>}
      </ul>
    </div>
  );
};

export default Sidebar;
