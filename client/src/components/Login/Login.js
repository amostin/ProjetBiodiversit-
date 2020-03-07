import React from "react";
import "./../../App.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="center">
      <h1>Page de connexion</h1>
      <form id="connectBox">
        <label htmlFor="pseudo">Pseudo</label>
        <input name="pseudo" id="pseudo" type="text" />
        <br />
        <label htmlFor="mdp">Mot de passe</label>
        <input name="mdp" id="mdp" type="password" />
        <br />
        <Link to="/admin">
          <input type="submit" value="Connexion" />
        </Link>
      </form>
    </div>
  );
}

export default Login;