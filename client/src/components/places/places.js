import React, { Component } from "react";
import "./places.css";
import { Link } from "react-router-dom";

class Places extends Component {
  constructor() {
    super();
    this.state = {
      places: []
    };
  }

  componentDidMount() {
    fetch("/api/places")
      .then(res => res.json())
      .then(res =>
        this.setState({ places: res.data }, () =>
          console.log("Places fetched...", res.data)
        )
      );
  }
  render() {
    return (
      <div>
        <h1>Page des points d'intérêt</h1>
        <ul>
          {this.state.places.map(place => (
            <li key={place.idPlaces}>
              <Link to={`/pointInteret/${place.idPlaces}`}>{place.nom}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Places;
