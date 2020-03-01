import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

function Nav() {
  const navStyle = {
    color: "white"
  };

  return (
    <nav>
      <ul className="nav-links">
        <Link style={navStyle} to="/">
          <li>Accueil</li>
        </Link>
        <Link style={navStyle} to="/pointInteret">
          <li>Points d'intérêt</li>
        </Link>
        <Link style={navStyle} to="/categorie">
          <li>Catégories</li>
        </Link>
        <Link style={navStyle} to="/itineraire">
          <li>Itinéraire</li>
        </Link>
        <Link style={navStyle} to="/login">
          <li>Connexion</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
