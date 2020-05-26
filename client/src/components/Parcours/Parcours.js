import React, { Component } from "react";
import "./../../App.css";
import { Link } from "react-router-dom";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "./Parcours.css";


class Parcours extends Component {
  state = {
    places: [],
    ParcoursID: "5",
    userLoc: ["50.665938", "4.612229"],
    ephec:["50.665938", "4.612229"],
  };
  componentDidMount() {
    this.getPlacesByParcours();

  }
  getPlacesByParcours = (_) => {
    const { ParcoursID } = this.state;
    fetch(`/api/pointsInteret/parcours/${ParcoursID}`)
      .then((res) => res.json())
      .then((res) => this.setState({ places: res.data }))
      .catch((err) => console.log(err));
      this.setState({ userLoc: this.state.ephec });
  };

  getUserLocalisation = (_) => {
    navigator.geolocation.getCurrentPosition(
      (position, options = { enableHighAccuracy: true }) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        if (this.state.userLoc===this.state.ephec) {
          this.setState({ userLoc: [latitude, longitude] });
        }
        else {
          this.setState({ userLoc: this.state.ephec });
        }
      }
    );
  };

  render() {
    var zoom = 14;
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
            onChange={(e) =>
              this.setState(
                {
                  ParcoursID: e.target.value,
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
        <div>
          <input
            type="button"
            className="geoloc"
            onClick={this.getUserLocalisation}
            value={"Ma position"}
            id="positionButton"
          />
        </div>
        <Map id="map" zoom={zoom} center={this.state.userLoc} maxZoom="18" minZoom="8">
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {places.map((place) => (
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

          <Marker position={this.state.userLoc} >
            <Popup>Ma position</Popup>
          </Marker>
        </Map>
        <ul className="listeParcours">
          {places.map((place) => (
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
