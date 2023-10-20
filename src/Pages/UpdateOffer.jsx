import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/styles/updateOffer.css";

const UpdateOffer = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    currentImage: "", // Champ pour l'URL de l'image actuelle
    // Ajoutez d'autres champs ici pour les détails de l'offre
  });

  const [image, setImage] = useState(null); // State pour stocker l'image sélectionnée
  const [error, setError] = useState(null); // State pour gérer les erreurs

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construire les données du formulaire à envoyer au serveur
    const formDataToSend = {
      title: formData.title,
      description: formData.description,
      price: formData.price,
      // Ajoutez d'autres champs du formulaire ici
    };

    try {
      // Envoyer les données au serveur à l'aide d'une requête Axios (ou autre)
      const response = await axios.put(
        `https://site--backend-vinted--cl5kfjmsrksj.code.run/offer/update/${params.id}`,
        formDataToSend
      );

      //   const response = await axios.put(
      //     `http://localhost:4000/offer/update/${params.id}`,
      //     formDataToSend
      //   );

      // Traiter la réponse du serveur (redirection, message, etc.)
      console.log("Réponse du serveur :", response.data);

      // Exemple de redirection vers la page de l'offre mise à jour
      navigate(`/offer/${params.id}`);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'offre :", error);
      setError("Une erreur s'est produite lors de la mise à jour de l'offre.");
    }
  };

  useEffect(() => {
    const fetchOfferData = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-vinted--cl5kfjmsrksj.code.run/offer/${params.id}`
        );
        const offerData = response.data; // Les données de l'offre depuis le backend

        // Mettez à jour le state du formulaire avec les données de l'offre
        setFormData({
          title: offerData.product_name,
          description: offerData.product_description,
          price: offerData.product_price,
          currentImage: offerData.product_images[0].secure_url, // Récupérez l'URL de l'image actuelle
          // Mettez à jour d'autres champs ici
        });
      } catch (error) {
        console.error("Error fetching offer data:", error);
        setError("Une erreur s'est produite lors du chargement de l'offre.");
      }
    };

    fetchOfferData(); // Appelez la fonction pour charger les données de l'offre
  }, [params.id]);

  return (
    <div className="update-offer-container">
      {error && <p className="error-message">{error}</p>}
      <img
        className="update-picture"
        src={formData.currentImage}
        alt={formData.title} // Utilisez le champ approprié pour l'alt
      />
      <h2>Modifier l'offre</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Titre :</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description :</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Prix :</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        {/* Champ pour sélectionner une nouvelle image */}
        <div>
          <label htmlFor="image">Image :</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        {/* Affichage de l'image actuelle */}
        <div>
          <img
            src={formData.currentImage}
            alt={formData.title} // Utilisez le champ approprié pour l'alt
            className="current-image"
          />
        </div>
        <div>
          <button type="submit">Mettre à jour</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateOffer;
