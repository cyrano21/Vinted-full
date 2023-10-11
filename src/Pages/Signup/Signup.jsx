import { useState } from "react";
import "./signup.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Cookies from "js-cookie";

export default function Signup({ setUserToken }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password || !username) {
      setErrorMessage("Veuillez remplir tous les champs !");
    } else {
      try {
        const { data } = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/user/signup",
          {
            email,
            username,
            password,
            newsletter,
          }
        );

        Cookies.set("token", data.token);
        setUserToken(data.token);
        navigate("/");
      } catch (error) {
        console.log("catch>>>", error);
        setErrorMessage("Désolé, une erreur est survenue !");
      }
    }
  };

  return (
    <main>
      <div className="signup-container">
        <h2>S'inscrire</h2>

        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(event) => {
              setErrorMessage("");
              setUsername(event.target.value);
            }}
          />

          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(event) => {
              setErrorMessage("");
              setEmail(event.target.value);
            }}
          />

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(event) => {
              setErrorMessage("");
              setPassword(event.target.value);
            }}
          />

          <div className="checkbox-container">
            <div>
              <input
                type="checkbox"
                name="newsletter"
                id="newsletter"
                checked={newsletter}
                onChange={(event) => {
                  setNewsletter(!newsletter);
                }}
              />

              <span>S'incrire à notre newsletter</span>
            </div>

            <p>
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </p>
          </div>

          <button type="submit">S'inscrire</button>

          <Link to="/signin"> tu as deja un compte ,Connecte-toi!</Link>

          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </div>
    </main>
  );
}
