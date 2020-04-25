import React, { Component } from "react";
import "./../../App.css";
import { Link } from "react-router-dom";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "./Parcours.css";

class Parcours extends Component {
  state = {
    places: [],
    ParcoursID: "5",
    userLoc: ["50.665938", "4.612229"]
  };
  componentDidMount() {
    this.getPlacesByParcours();
  }
  getPlacesByParcours = _ => {
    const { ParcoursID } = this.state;
    fetch(`/api/pointsInteret/parcours/${ParcoursID}`)
      .then(res => res.json())
      .then(res => this.setState({ places: res.data }))
      .catch(err => console.log(err));
  };

  getUserLocalisation = _ => {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function error(err) {
      console.warn(`ERREUR (${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition((position, error, options) => {
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
      console.log(`La précision est de ${position.coords.accuracy} mètres.`);
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      this.setState({userLoc: [latitude, longitude]});
    });

  }

  render() {
    const center = ["50.665938", "4.612229"];
    var zoom = 12;
    const { places, ParcoursID, userLoc } = this.state;
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
        <div>
        <input
          type="button"
          className="geoloc"
          onClick={this.getUserLocalisation}
          value={"Ma position"}
          id="positionButton"
        />
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

          <Marker position={userLoc}>
            <Popup>

            </Popup>
          </Marker>

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
