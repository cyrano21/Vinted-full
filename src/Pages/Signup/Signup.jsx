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

  const handleSbumit = async (event) => {
    event.preventDefault();

    if (!email || !password || !username) {
      setErrorMessage("Veuillez remplir tous les champs !");
    } else {
      try {
        const { data } = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/user/signup",
          { email, username, password, newsletter }
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
      <div className="container">
        <h1>S'inscrire</h1>

        <form onSubmit={handleSbumit}>
          <div className="input">
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
          </div>

          <div className="checkbox">
            <input
              type="checkbox"
              name="newsletter"
              id="newsletter"
              checked={newsletter}
              onChange={(event) => {
                setNewsletter(!newsletter);
              }}
            />
            <label htmlFor="newsletter"></label>

            <p>S'incrire à notre newsletter</p>
          </div>
          <p>
            texopjvopjj jnfpoqjopjpgo ,nfkjpojgj oljfopfujgrgr rorfgjroguguuj
            ogoàtgiuruiràtrtj. rèoerfjkldqqfhdj, dfzijhoih
          </p>

          <button>S'inscrire</button>

          <p>
            tu as deja un compte , <Link to="/signin">Connecte-toi!</Link>
          </p>

          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </div>
    </main>
  );
}
