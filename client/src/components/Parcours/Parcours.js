import React, { Component } from "react";
import "./../../App.css";
import { Link } from "react-router-dom";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "./Parcours.css";

L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/";

class Parcours extends Component {
  state = {
    places: [],
    ParcoursID: "5"
  };
  componentDidMount() {
    this.getPlacesByParcours();
  }
  getPlacesByParcours = _ => {
    const { ParcoursID } = this.state;
    fetch(`/api/parcours/${ParcoursID}`)
      .then(res => res.json())
      .then(res => this.setState({ places: res.data }))
      .catch(err => console.log(err));
  };

  render() {
    const center = ["50.665938", "4.612229"];
    var zoom = 15;
    const { places, ParcoursID } = this.state;
    return (
      <div>
        <label className="labelParcours" htmlFor="parcours">
          Choisissez un parcours :
        </label>

        <div className="rechercheParcours">
          <select
            id="parcours"
            value={ParcoursID}
            onChange={e =>
              this.setState(
                {
                  ParcoursID: e.target.value
                },
                this.getPlacesByParcours
              )
            }
          >
            <option value="1">Parcours des Sciences</option>
            <option value="2">Parcours du cyclotron</option>
            <option value="3">Parcours du lac</option>
            <option value="4">Parcours du jardin botanique</option>
            <option value="5">Parcours du parc de Moulinsart</option>
          </select>
        </div>
        <Map id="map" zoom={zoom} center={center} minZoom={zoom} maxZoom="18">
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {places.map(place => (
            <Marker
              key={place.PointInteretID}
              position={[place.Longitude, place.Latitude]}
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

export default Parcours;
