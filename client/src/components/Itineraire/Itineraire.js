import React, { Component } from "react";
import "./../../App.css";
import { Link } from "react-router-dom";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "./Itineraire.css";

L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/";

class Itineraire extends Component {
  state = {
    isMapInit: false,
    places: []
  };
  componentDidMount() {
    this.getPlaces();
  }
  getPlaces = _ => {
    fetch(`/api/pointsInteret`)
      .then(res => res.json())
      .then(res => this.setState({ places: res.data }))
      .catch(err => console.log(err));
  };

  render() {
    const center = ["50.665938", "4.612229"];
    var zoom = 14;
    const { places } = this.state;

    const home = () => {
       this.props.history.push("/");
     };

    return (
      /* Partie navigation, retour vers l'écran principal */
      <div>
        <div id="buttonGroup">
          <button type="button" id='returnButton' onClick={home}>
            Retour accueil
          </button>
        </div>

      {/* Affichage de la carte, des marqueurs et des popups */}
      <Map id="map" zoom={zoom} center={center} minZoom={zoom} maxZoom="18">
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {places.map(place => (
          <Marker
            key={place.PointInteretID}
            position={[place.Latitude, place.Longitude]}
          >
          <Popup>
            <Link to={`/pointInteret/${place.PointInteretID}`}>
              {place.NomScientifique}
            </Link>
          </Popup>
          </Marker>
        ))}
        <br />
      </Map>

      {/* Affichage de la liste des points d'intérêt */}
      <ul className="listeParcours">
        {places.map(place => (
          <li key={place.PointInteretID}>
            <Link to={`/pointInteret/${place.PointInteretID}`}>
              {place.NomScientifique}
            </Link>
          </li>
        ))}
      </ul>
      </div>
    );
  }
}

export default Itineraire;
