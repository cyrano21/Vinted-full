import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DeleteOffer = () => {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteOffer = async () => {
      try {
        const response = await axios.delete(
          `https://site--backend-vinted--cl5kfjmsrksj.code.run/offer/delete/${params.id}`
        );
        // Traitez la réponse comme vous le souhaitez (redirection, message, etc.)
        console.log(response.data);
        // Exemple de redirection vers la page d'accueil
        navigate("/");
      } catch (error) {
        console.error("Error deleting offer:", error);
        // Gérez les erreurs ici
      }
    };

    // Appelez la fonction de suppression dès que le composant est monté
    deleteOffer();
  }, [params.id, navigate]);

  return (
    <div>
      <h2>Suppression de l'offre en cours...</h2>
      {/* Ajoutez un indicateur de chargement ou un message ici si nécessaire */}
    </div>
  );
};

export default DeleteOffer;
