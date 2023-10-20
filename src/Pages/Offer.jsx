import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import { Audio as Loader } from "react-loader-spinner";

import "../assets/styles/offer.css";

const Offer = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const price = data?.product_price;

  const protectionFees = (price / 10).toFixed(2);
  const shippingFees = (protectionFees * 2).toFixed(2);
  const total = Number(price) + Number(protectionFees) + Number(shippingFees);

  useEffect(() => {
    try {
      const fetchData = async () => {
        // const response = await axios.get(
        //   `https://site--backend-vinted--cl5kfjmsrksj.code.run/offer/${params.id}`
        // );

        const response = await axios.get(
          `http://localhost:4000/offer/${params.id}`
        );

        console.log("response===>", response);

        setData(response.data);
        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [params.id]);

  return isLoading ? (
    <Loader
      className="home-loader"
      type="Puff"
      color="#2CB1BA"
      height={80}
      width={80}
    />
  ) : (
    <div className="offer-body">
      <div className="offer-container">
        <div className="offer-pictures">
          {console.log("data.product_images====>", data.product_images)}

          {data.product_images.length === 0 ? (
            <img
              className="offer-picture"
              src={data.product_images.secure_url}
              alt={data.product_name}
            />
          ) : (
            <img
              className="offer-picture"
              src={data.product_images[0].secure_url}
              alt={data.product_name}
            />
          )}
        </div>
        <div className="offer-infos" style={{}}>
          <div>
            <span className="offer-price">{data.product_price} €</span>

            <ul className="offer-list">
              {data.product_details.map((elem, index) => {
                const keys = Object.keys(elem);
                return (
                  <li key={index} className="">
                    <span>{keys[0]}</span>
                    <span>{elem[keys[0]]}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="divider" />

          <div className="offer-content">
            <p className="name">{data.product_name}</p>
            <p className="description">{data.product_description}</p>

            <div
              onClick={() => alert("Go to user profile !")}
              className="offer-avatar-username"
            >
              {data.owner && data.owner.account.avatar && (
                <img
                  alt={data.product_name}
                  src={data.owner.account.avatar.secure_url}
                />
              )}
              <span>{data.owner && data.owner.account.username}</span>
            </div>
          </div>

          <button
            onClick={() => {
              navigate("/payment", {
                state: {
                  productName: data.product_name,
                  totalPrice: total,
                  protectionFees: protectionFees,
                  shippingFees: shippingFees,
                  price: data.product_price,
                },
              });
            }}
          >
            Acheter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Offer;
