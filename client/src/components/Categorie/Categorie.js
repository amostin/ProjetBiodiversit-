import React, { Component } from "react";
import "./../../App.css";
import { Link } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import style from "styled-components";
import "./../../App.css";

const Wrapper = style.div`
width: ${props => props.width};
height: ${props => props.height};
`;

class Categorie extends Component {
  state = {
    places: [],
    categorie: "nature"
  };
  componentDidMount() {
    this.map = L.map("map", {
      center: [50.668081, 4.6118324],
      zoom: 14,
      zoomControl: false
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      detectRetin: true,
      minZoom: 14,
      maxZoom: 18,
      maxNativeZoom: 17
    }).addTo(this.map);
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
        <Wrapper width="1280px" height="700px" id="map" />
      </div>
    );
  }
}

export default Categorie;
