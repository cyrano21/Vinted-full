import React, { useState } from "react";
import axios from "axios";

function ResetUsers() {
  const [responseMessage, setResponseMessage] = useState("");
  const [token, setToken] = useState(""); // Vous pouvez le définir statiquement ou le récupérer de l'endroit où vous le stockez

  const resetUsersHandler = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(
        "https://site--backend-vinted--cl5kfjmsrksj.code.run/reset-users",
        {
          headers: headers,
        }
      );

      setResponseMessage(response.data);
    } catch (error) {
      setResponseMessage(
        error.response?.data?.error || "Une erreur est survenue."
      );
    }
  };

  return (
    <div>
      <button onClick={resetUsersHandler}>
        Réinitialiser les utilisateurs
      </button>
      <p>{responseMessage}</p>
    </div>
  );
}

export default ResetUsers;
