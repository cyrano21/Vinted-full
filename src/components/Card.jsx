import { useNavigate } from "react-router-dom";

const Card = ({ data }) => {
  const navigate = useNavigate();

  // Vérifiez si product_images est un tableau et s'il contient au moins un élément
  if (data.product_images && data.product_images.length > 0) {
    console.log(data.product_images[0]); // Cela affichera la première URL d'image pour une offre
  }

  return (
    <div className="card-container">
      <div
        onClick={() => alert("Go to user profile !")}
        className="card-avatar-username"
      >
        {data.owner && data.owner.account && data.owner.account.avatar && (
          <img
            alt={data.product_name}
            src={data.owner.account.avatar.secure_url}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/pathToYourDefaultImage.jpg";
            }}
          />
        )}

        <span>
          {data.owner && data.owner.account && data.owner.account.username}
        </span>
      </div>

      <div onClick={() => navigate(`offer/${data._id}`)}>
        {data.product_images && data.product_images[0] && (
          <img
            alt={data.title}
            src={data.product_images[0].secure_url}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://res.cloudinary.com/dwens2ze5/image/upload/v1684411406/cld-sample-2.jpg";
            }}
          />
        )}

        <div className="card-price-size-brand">
          <span>{data.product_price} €</span>
          <span>
            {data.product_details &&
              data.product_details[1] &&
              data.product_details[1]["TAILLE"]}
          </span>
          <span>
            {data.product_details &&
              data.product_details[0] &&
              data.product_details[0]["MARQUE"]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
