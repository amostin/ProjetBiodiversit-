import React, { Component } from "react";
import "./Admin.css";

class Admin extends Component {
  state = {
    places: [],
    point: {
      nom: "nom",
      nomLatin: "nomLatin",
      adresse: "adresse",
      longitude: 50.6,
      latitude: 4.6,
      categorie: "nature",
      debut: "2020-01-01",
      fin: "2020-12-31",
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
      `/api/add?nom=${point.nom}&nomLatin=${point.nomLatin}&adresse=${point.adresse}&longitude=${point.longitude}&latitude=${point.latitude}&categorie=${point.categorie}&debut=${point.debut}&fin=${point.fin}&accessibilite=${point.accessibilite}`
    )
      .then(this.getPlaces)
      .catch(err => console.error(err));
  };

  renderPlaces = ({
    idPoint,
    nom,
    nomLatin,
    adresse,
    longitude,
    latitude,
    categorie,
    debut,
    fin,
    accessibilite
  }) => (
    <tr key={idPoint}>
      <td>{idPoint}</td>
      <td>{nom}</td>
      <td>{nomLatin}</td>
      <td>{adresse}</td>
      <td>{longitude}</td>
      <td>{latitude}</td>
      <td>{categorie}</td>
      <td>{debut}</td>
      <td>{fin}</td>
      <td>{accessibilite}</td>
    </tr>
  );

  render() {
    const { places, point } = this.state;
    return (
      <div className="center">
        <h1>Page admin</h1>
        <table align="center">
          <thead>
            <tr>
              <th>id</th>
              <th>nom</th>
              <th>nomLatin</th>
              <th>adresse</th>
              <th>longitude</th>
              <th>latitude</th>
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
          <label htmlFor="adresse">adresse</label>
          <br />
          <input
            name="adresse"
            id="adresse"
            type="text"
            value={point.adresse}
            onChange={e =>
              this.setState({
                point: { ...point, adresse: e.target.value }
              })
            }
          />
          <br />
          <label htmlFor="longitude">Longitude</label>
          <br />
          <input
            name="longitude"
            id="longitude"
            type="number"
            step="0.1"
            value={point.longitude}
            onChange={e =>
              this.setState({
                point: { ...point, longitude: e.target.value }
              })
            }
          />
          <br />
          <label htmlFor="latitude">Latitude</label>
          <br />
          <input
            name="latitude"
            id="latitude"
            type="number"
            step="0.1"
            value={point.latitude}
            onChange={e =>
              this.setState({
                point: { ...point, latitude: e.target.value }
              })
            }
          />
          <br />
          <label htmlFor="categorie">Catégorie</label>
          <br />
          <select
            name="categorie"
            id="categorie"
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
          <label htmlFor="debut">Début</label>
          <br />
          <input
            name="debut"
            id="debut"
            type="text"
            value={point.debut}
            onChange={e =>
              this.setState({
                point: { ...point, debut: e.target.value }
              })
            }
          />
          <br />
          <label htmlFor="fin">Fin</label>
          <br />
          <input
            name="fin"
            id="fin"
            type="text"
            value={point.fin}
            onChange={e =>
              this.setState({
                point: { ...point, fin: e.target.value }
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
