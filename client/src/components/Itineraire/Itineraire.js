import React from "react";
import "./../../App.css";
import carte from "./../../map.JPG";

function Itineraire() {
  return (
    <div>
      <h1>Itinéraire</h1>
      <img id="carte" src={carte} alt="carte exemple" />
    </div>
  );
}

export default Itineraire;
