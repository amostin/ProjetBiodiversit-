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

  deletePoint = idPoint => {
    console.log(idPoint.idPoint);
    fetch(
      `/api/delete?idPoint=${idPoint.idPoint}`
    )
      .then(this.getPlaces)
      .catch(err => console.error(err));
  };

  updatePoint = idPoint => {
    console.log(idPoint.idPoint);
    /*
    fetch(
      `/api/update?nom=${point.nom}&nomLatin=${point.nomLatin}&adresse=${point.adresse}&longitude=${point.longitude}&latitude=${point.latitude}&categorie=${point.categorie}&debut=${point.debut}&fin=${point.fin}&accessibilite=${point.accessibilite}&idPoint=36idPoint=${idPoint.idPoint}`
    )
      .then(this.getPlaces)
      .catch(err => console.error(err));
      */
  };

  showUpdate = idPoint => {

  }


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
      <td><button className="deleteButton" onClick={() => this.deletePoint({idPoint})}>Supprimer point</button></td>
      <td><button className="modifyButton" onClick={() => this.showUpdate({idPoint})}>Modifier point</button></td>
    </tr>
  );

//this.deletePoint({idPoint})

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


        <div id="addUpdateEntry">
        <h3>Ajouter un point d'intérêt</h3>
          <label htmlFor="nom">Nom</label>
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
          <label htmlFor="adresse">Adresse</label>
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
          <label htmlFor="categorie" className="Right">Catégorie</label>
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
          <button id='ajouterPoint' onClick={this.addPoint}>Ajouter</button>




        <div id="FormModifyEntry" hidden>
        <h3>Modifier point d'intérêt</h3>
          <label htmlFor="nom">Nom</label>
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
          <label htmlFor="adresse">Adresse</label>
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
          <label htmlFor="categorie" className="Right">Catégorie</label>
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
          <button id='modifyEntry' onClick={this.updatePoint}>Modifier</button>
        </div>
        </div>
      </div>
    );
  }
}

export default Admin;
