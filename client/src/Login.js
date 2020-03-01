import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      <h1>Page de connexion</h1>
      <div id="connectBox">
          <label for='pseudo'>Pseudo</label>
          <input name="pseudo" id="pseudo" type="text" /><br/>
          <label for='mdp'>Mot de passe</label>
          <input name="mdp" id="mdp" type="password" /><br />
          <Link to="/admin"><input type="submit" value="Connexion"/></Link>
          
      </div>
    </div>
  );
}

export default Login;
