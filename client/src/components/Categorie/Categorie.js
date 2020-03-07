import React, { Component } from "react";
import "./../../App.css";
import { Link } from "react-router-dom";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "./../../App.css";
import "./Categorie.css";

L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/";

class Categorie extends Component {
  state = {
    places: [],
    categorie: "nature"
  };
  componentDidMount() {
    this.getPlacesByCategory();
  }
  /*
  changeMarkers = _ => {
    {this.state.places.map(point => (
      L.marker([${point.longitude', '{point.latitude}']).addTo(map)
    .bindPopup('{point.nom}');
    )}
  }
*/
  getPlacesByCategory = _ => {
    const { categorie } = this.state;
    fetch(`/api/categorie?categorie=${categorie}`)
      .then(res => res.json())
      .then(res => this.setState({ places: res.data }))
      .catch(err => console.log(err));
  };

  render() {
    const center = ["50.668081", "4.6118324"];
    var zoom = 14;
    const { places, categorie } = this.state;
    return (
      <div>
        <label htmlFor="categorie">Catégorie </label>
        <select
          name="categorie"
          id="nom"
          value={categorie}
          onChange={e =>
            this.setState(
              {
                categorie: e.target.value
              },
              this.getPlacesByCategory
            )
          }
        >
          <option value="nature">Nature</option>
          <option value="animaux">Animaux</option>
          <option value="batiment">Batiment</option>
        </select>
        <ul>
          {places.map(place => (
            <li key={place.idPoint}>
              <Link to={`/pointInteret/${place.idPoint}`}>{place.nom}</Link>
            </li>
          ))}
        </ul>
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
    );
  }
}

export default Categorie;
