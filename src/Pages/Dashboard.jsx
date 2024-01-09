// export default Dashboard;
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/styles/dashboard.css";
import { Link } from "react-router-dom";

const Dashboard = ({ token }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--backend-vinted--cl5kfjmsrksj.code.run/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("response======>", response);

        // Mettez à jour l'état avec les données de l'utilisateur
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData(); // Appelez la fonction fetchData
  }, [token]);

  return (
    <div className="dashboard-container">
      {userData ? (
        <div className="dashboard-content">
          <h1 className="dashboard-heading">
            Bienvenue, {userData.user.account.username} !
          </h1>
          <div className="avatar">
            <img src={userData.user.account.avatar} alt="avatar" />
          </div>
          <div className="user-info">
            <h2>Vos publications</h2>
            <ul>
              {userData.offers.map((offer) => (
                <li key={offer._id}>
                  <h3>{offer.product_name}</h3>
                  <p>{offer.product_description}</p>
                  <img
                    src={offer.product_images[0].secure_url}
                    alt={offer.product_name}
                  />
                  <p>Prix: {offer.product_price} €</p>
                  <Link to={`/update/offer/${offer._id}`} className="offer-btn">
                    Modifier
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p className="loading-message">Chargement...</p>
      )}
    </div>
  );
};

export default Dashboard;
