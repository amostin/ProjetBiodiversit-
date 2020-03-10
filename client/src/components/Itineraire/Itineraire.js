import React from "react";
import "./../../App.css";
import "./../Categorie/Categorie.css";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/";
function Itineraire() {
  const center = ["50.668081", "4.6118324"];
  var zoom = 14;
  return (
    <div>
      <h1>
        Grâce à cette page, calculez un itinéraire pour visiter les points
        d'intérêts
      </h1>
      <div className="center">
        <Map zoom={zoom} center={center}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={center}>
            <Popup>Premier marqueur</Popup>
          </Marker>
        </Map>
      </div>
    </div>
  );
}

export default Itineraire;
