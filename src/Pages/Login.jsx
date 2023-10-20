import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Audio as Loader } from "react-loader-spinner";

import "../assets/styles/login.css";

const Login = ({ setUserToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const fromPublish = location.state?.fromPublish ? true : null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `https://site--backend-vinted--cl5kfjmsrksj.code.run/user/login`,
        {
          email,
          password,
        }
      );

      console.log("response===>", response);

      if (response.data.token) {
        setUserToken(response.data.token); // Assurez-vous que setUser est une fonction
        setIsLoading(false);
        navigate(fromPublish ? "/publish" : "/");
      } else {
        alert("Une erreur est survenue, veuillez réessayer.");
      }
    } catch (error) {
      setIsLoading(false);
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        setErrorMessage("Mauvais email et/ou mot de passe");
      }
      console.log(error.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Se connecter</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          onChange={(event) => {
            setEmail(event.target.value);
            setErrorMessage("");
          }}
          placeholder="Adresse email"
          type="email"
        />
        <input
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="Mot de passe"
          type="password"
        />
        <span className="signup-login-error-message">{errorMessage}</span>
        {isLoading ? (
          <Loader color="#2CB1BA" height={40} width={40} />
        ) : (
          <button disabled={isLoading ? true : false} type="submit">
            Se connecter
          </button>
        )}
      </form>
      <Link to="/signup">Pas encore de compte ? Inscris-toi !</Link>
    </div>
  );
};

export default Login;
