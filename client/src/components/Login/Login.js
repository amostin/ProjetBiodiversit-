import React, { useState } from "react";
import "./../../App.css";
import "./Login.css";

import axios from "axios";
import { setUserSession } from "../../Utils/Common";

function Login(props) {
  const [loading, setLoading] = useState(false);
  const Pseudo = useFormInput("");
  const MdP = useFormInput("");
  const [error, setError] = useState(null);

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios
      .post("/users/signin", {
        Pseudo: Pseudo.value,
        MdP: MdP.value,
      })
      .then((response) => {
        setLoading(false);
        setUserSession(response.data.token, response.data.user);
        props.history.push("/admin");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 401)
          setError("Le pseudo et/ou le mot de passe sont incorrects");
        else setError("Des données sont manquantes ou incorrects");
      });
  };

  return (
    <div className="center">
      <h1>Se connecter</h1>
      <br />
      <form id="connectBox">
        <div>
          <label htmlFor="pseudo">Pseudo</label>
          <br />
          <input
            type="text"
            id="pseudo"
            {...Pseudo}
            autoComplete="username"
            required
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <label htmlFor="mdp">Mot de passe</label>
          <br />
          <input
            type="password"
            id="mdp"
            {...MdP}
            autoComplete="new-password"
            required
          />
        </div>
        {error && (
          <>
            <small style={{ color: "red" }}>{error}</small>
            <br />
          </>
        )}
        <input
          type="button"
          value={loading ? "Chargement..." : "Connexion"}
          onClick={handleLogin}
          id="loginButton"
          disabled={loading}
        />
      </form>
      <br />
    </div>
  );
}

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default Login;
