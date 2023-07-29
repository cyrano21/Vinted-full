import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import "../Offer/offer.css";

export default function Offer() {
  const [offerInfos, setOfferInfos] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );

        // console.log(data);

        setOfferInfos(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <main>
      <div className="container offer-page">
        <div className="offer-picture">
          <img src={offerInfos.product_pictures[0].secure_url} alt="" />
        </div>

        <div className="offer-infos">
          <div>
            <p className="price"> {offerInfos.product_price} €</p>

            <ul>
              {offerInfos.product_details.map((elem) => {
                // console.log(elem);

                const keyName = Object.keys(elem)[0];
                return (
                  <div className="ul">
                    <li>
                      <span className="key">{keyName}</span>
                      <span className="value">{elem[keyName]}</span>
                    </li>
                  </div>
                );
              })}
            </ul>
          </div>
          <hr />

          <div className="content">
            <p className="name">{offerInfos.product_name}</p>
            <p className="description">{offerInfos.product_description}</p>

            <div className="avatar-username">
              <img src={offerInfos.owner.account.avatar.secure_url} alt="" />
              <p>{offerInfos.owner.account.username}</p>
            </div>
          </div>

          <button>Acheter</button>
        </div>
      </div>
    </main>
  );
}
