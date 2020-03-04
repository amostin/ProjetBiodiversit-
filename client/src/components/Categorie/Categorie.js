import React, { Component } from "react";
import "./../../App.css";
import { Link } from "react-router-dom";

class Categorie extends Component {
  state = {
    places: [],
    categorie: "nature"
  };
  componentDidMount() {
    this.getPlacesByCategory();
  }
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
            <li key={place.idPlaces}>
              <Link to={`/pointInteret/${place.idPlaces}`}>{place.nom}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Categorie;
