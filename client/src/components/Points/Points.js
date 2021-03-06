import React, { Component } from "react";
import "./Points.css";
import { Link } from "react-router-dom";

class Points extends Component {
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
            <li key={place.idPoint}>
              <Link to={`/pointInteret/${place.idPoint}`}>{place.nom}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Points;
