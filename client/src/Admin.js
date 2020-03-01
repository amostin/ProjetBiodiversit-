import React, { Component } from "react";
import "./Admin.css";

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      places: [],
      point: {
        nom: "nom",
        nomLatin: "nomLatin",
        localisation: "localisation",
        categorie: "nature",
        startVisibilite: "2020-01-01",
        stopVisibilite: "2020-12-31",
        accessibilite: 1
      }
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

  addPoint = _ => {
    const { point } = this.state;
    fetch(
      `/api/add?nom=${point.nom}&nomLatin=${point.nomLatin}&localisation=${point.localisation}&categorie=${point.categorie}&stopVisibilite=${point.stopVisibilite}&accessibilite=${point.accessibilite}`
    )
      .then(this.componentDidMount)
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div>
        <h1>Page admin</h1>
        <table align="center">
          <tr>
            <th>id</th>
            <th>nom</th>
            <th>nomLatin</th>
            <th>localisation</th>
            <th>catégorie</th>
            <th>début</th>
            <th>fin</th>
            <th>accessible</th>
          </tr>
          {this.state.places.map(place => (
            <tr key={place.idPlaces}>
              <td>{place.idPlaces}</td>
              <td>{place.nom}</td>
              <td>{place.nomLatin}</td>
              <td>{place.localisation}</td>
              <td>{place.categorie}</td>
              <td>{place.startVisibilite}</td>
              <td>{place.stopVisibilite}</td>
              <td>{place.accessibilite}</td>
            </tr>
          ))}
        </table>
        <br />
        <div id="addEntry">
          <label for="nom">Nom</label>
          <br />
          <input name="nom" id="nom" type="text" />
          <br />
          <label for="nomLatin">Nom latin</label>
          <br />
          <input name="nomLatin" id="nomLatin" type="text" />
          <br />
          <label for="localisation">Localisation</label>
          <br />
          <input name="localisation" id="localisation" type="text" />
          <br />
          <label for="categorie">Catégorie</label>
          <br />
          <select name="categorie" id="nom" type="text">
            <option value="nature">Nature</option>
            <option value="animaux">Animaux</option>
          </select>
          <br />
          <label for="startVisibilite">Début</label>
          <br />
          <input
            name="startVisibilite"
            id="startVisibilite"
            type="text"
            placeholder="2019-01-01"
          />
          <br />
          <label for="stopVisibilite">Fin</label>
          <br />
          <input
            name="stopVisibilite"
            id="stopVisibilite"
            type="text"
            placeholder="2019-12-31"
          />
          <br />
          <label for="accessibilite">Accessible</label>
          <br />
          <select name="accessibilite" id="accessibilite">
            <option value="0">Non</option>
            <option value="1">Oui</option>
          </select>
          <br />
          <button>Ajouter point</button>
        </div>
      </div>
    );
  }
}

export default Admin;
