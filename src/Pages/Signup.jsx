import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

const Signup = ({ setUserToken }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const navigate = useNavigate();

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("username", username);
    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      const response = await axios.post(
        `https://site--backend-vinted--cl5kfjmsrksj.code.run/user/signup`,
        formData
      );

      // const response = await axios.post(
      //   `http://localhost:4000/user/signup`,
      //   formData
      // );

      if (response.data.token) {
        setUserToken(response.data.token);
        navigate("/");
      } else {
        alert("Une erreur est survenue, veuillez réssayer.");
      }
    } catch (error) {
      if (error.response.status === 409) {
        setErrorMessage("Cet email a déjà un compte chez nous !");
      }
      console.log(error.message);
    }
  };

  return (
    <div className="form-contain">
      <div className="signup-container">
        <h2>S'inscrire</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            placeholder="Nom d'utilisateur"
            type="text"
          />
          <input
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setErrorMessage("");
            }}
            placeholder="Email"
            type="email"
          />
          <span className="signup-login-error-message">{errorMessage}</span>
          <input
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            placeholder="Mot de passe"
            type="password"
          />
          <div className="checkbox-container">
            <div>
              <input type="checkbox" />
              <span>S'inscrire à notre newsletter</span>
            </div>
            <p>
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </p>
          </div>

          <div className="avatar">
            <label htmlFor="avatarUpload" className="custom-file-upload">
              Choisir un avatar
            </label>
            <input
              id="avatarUpload"
              onChange={handleAvatarChange}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
            />

            {avatar && (
              <img
                src={URL.createObjectURL(avatar)}
                alt="Preview"
                className="avatar-preview"
              />
            )}
          </div>

          <button type="submit" id="submitBtn">
            S'inscrire
          </button>
        </form>
        <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
      </div>
    </div>
  );
};

export default Signup;
