import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import "../SignIn/signIn.css";

export default function SignIn({ setUserToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage("Veuillez remplir tous les champs !");
    } else {
      try {
        const { data } = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/user/login",
          {
            email: email,
            password: password,
          }
        );

        console.log(data.token);

        Cookies.set("token", data.token);

        setUserToken(data.token);
        if (location.state) {
          navigate(location.state.from);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.log("catch>>", error);
      }
    }
  };

  return (
    <main>
      <div className="signin-container">
        <h2>Se connecter</h2>

        <form className="signin-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(event) => {
              // vider le message d'erreur
              setErrorMessage("");
              // envoyer la valeur entrée dans le champs au state
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
          <button type="submit">Se connecter</button>

          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </div>
    </main>
  );
}
