import { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../../components/Hero";

import { Link } from "react-router-dom";
import Offer from "../Offer/Offer";
import "../Home/home.css";

export default function Home() {
  const [offersList, setOffersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );

        // console.log(response.data);

        setOffersList(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("error>>", error.message);
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {};
  }, []);

  return isLoading ? (
    <div>En cours de chargement...</div>
  ) : (
    <div>
      <Hero />
      <div className="offer-bloc">
        {offersList && offersList.offers ? (
          offersList.offers.map((offer) => (
            <Link to={`/offer/${offer._id}`} key={offer._id}>
              <div className="offer-container">
                <div key={offer._id} className="owner">
                  <div className="avatar">
                    {offer.owner.account.avatar ? (
                      <img
                        src={offer.owner.account.avatar.secure_url}
                        alt="/"
                      />
                    ) : null}
                  </div>
                  <div className="username">{offer.owner.account.username}</div>
                </div>

                <div className="offer-image">
                  <img src={offer.product_image.secure_url} alt="" />
                  <div className="price-size-brand">
                    <p className="price">{offer.product_price} €</p>
                    {offer.product_details.map((details, index) => (
                      <div key={`detail-${index}`}>
                        <span className="size">{details.TAILLE}</span>
                        <span>{details.MARQUE}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div>No offers found</div>
        )}
      </div>
    </div>
  );
}
