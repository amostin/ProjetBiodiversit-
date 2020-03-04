import React, { Component } from "react";
import "./Admin.css";

class Admin extends Component {
  state = {
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

  componentDidMount() {
    this.getPlaces();
  }

  getPlaces = _ => {
    fetch("/api/places")
      .then(res => res.json())
      .then(res => this.setState({ places: res.data }))
      .catch(err => console.log(err));
  };

  addPoint = _ => {
    const { point } = this.state;
    fetch(
      `/api/add?nom=${point.nom}&nomLatin=${point.nomLatin}&localisation=${point.localisation}&categorie=${point.categorie}&startVisibilite=${point.startVisibilite}&stopVisibilite=${point.stopVisibilite}&accessibilite=${point.accessibilite}`
    )
      .then(this.getPlaces)
      .catch(err => console.error(err));
  };

  renderPlaces = ({
    idPlaces,
    nom,
    nomLatin,
    localisation,
    categorie,
    startVisibilite,
    stopVisibilite,
    accessibilite
  }) => (
    <tr key={idPlaces}>
      <td>{idPlaces}</td>
      <td>{nom}</td>
      <td>{nomLatin}</td>
      <td>{localisation}</td>
      <td>{categorie}</td>
      <td>{startVisibilite}</td>
      <td>{stopVisibilite}</td>
      <td>{accessibilite}</td>
    </tr>
  );

  render() {
    const { places, point } = this.state;
    return (
      <div class="center">
        <h1>Page admin</h1>
        <table align="center">
          <thead>
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
          </thead>
          <tbody>{places.map(this.renderPlaces)}</tbody>
        </table>
        <br />
        <div id="addEntry">
          <label htmlFor="nom">Nom</label>
          <br />
          <input
            name="nom"
            id="nom"
            type="text"
            value={point.nom}
            onChange={e =>
              this.setState({ point: { ...point, nom: e.target.value } })
            }
          />
          <br />
          <label htmlFor="nomLatin">Nom latin</label>
          <br />
          <input
            name="nomLatin"
            id="nomLatin"
            type="text"
            value={point.nomLatin}
            onChange={e =>
              this.setState({ point: { ...point, nomLatin: e.target.value } })
            }
          />
          <br />
          <label htmlFor="localisation">Localisation</label>
          <br />
          <input
            name="localisation"
            id="localisation"
            type="text"
            value={point.localisation}
            onChange={e =>
              this.setState({
                point: { ...point, localisation: e.target.value }
              })
            }
          />
          <br />
          <label htmlFor="categorie">Catégorie</label>
          <br />
          <select
            name="categorie"
            id="nom"
            type="text"
            value={point.categorie}
            onChange={e =>
              this.setState({ point: { ...point, categorie: e.target.value } })
            }
          >
            <option value="nature">Nature</option>
            <option value="animaux">Animaux</option>
            <option value="batiment">Batiment</option>
          </select>
          <br />
          <label htmlFor="startVisibilite">Début</label>
          <br />
          <input
            name="startVisibilite"
            id="startVisibilite"
            type="text"
            value={point.startVisibilite}
            onChange={e =>
              this.setState({
                point: { ...point, startVisibilite: e.target.value }
              })
            }
          />
          <br />
          <label htmlFor="stopVisibilite">Fin</label>
          <br />
          <input
            name="stopVisibilite"
            id="stopVisibilite"
            type="text"
            value={point.stopVisibilite}
            onChange={e =>
              this.setState({
                point: { ...point, stopVisibilite: e.target.value }
              })
            }
          />
          <br />
          <label htmlFor="accessibilite">Accessible</label>
          <br />
          <select
            name="accessibilite"
            id="accessibilite"
            value={point.accessibilite}
            onChange={e =>
              this.setState({
                point: { ...point, accessibilite: e.target.value }
              })
            }
          >
            <option value="0">Non</option>
            <option value="1">Oui</option>
          </select>
          <br />
          <button onClick={this.addPoint}>Ajouter point</button>
        </div>
      </div>
    );
  }
}

export default Admin;
