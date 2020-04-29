import React, { Component } from "react";
import "./Admin.css";
import { getUser, removeUserSession } from "./../../Utils/Common";
import { Link } from "react-router-dom";
import axios from "axios";

class Admin extends Component {
  state = {
    places: [],
    point: {
      PointInteretID: 161,
      NomScientifique: "nomScientifique",
      Nom: "nom",
      FamilleID: 99,
      ParcoursID: 2,
      Longitude: 50.665938,
      Latitude: 4.612229,
      CategorieID: 1,
      Accessibilite: 1,
      Debut: "2020-01-01",
      Fin: "2020-12-31",
    },
  };

  componentDidMount() {
    this.getPlaces();
  }

  getPlaces = (_) => {
    fetch("/api/pointsInteret")
      .then((res) => res.json())
      .then((res) => this.setState({ places: res.data }))
      .catch((err) => console.log(err));
  };

  addPoint = (_) => {
    axios
      .post("/api/pointsInteret", {
        NomScientifique: this.state.point.NomScientifique,
        Nom: this.state.point.Nom,
        FamilleID: this.state.point.FamilleID,
        ParcoursID: this.state.point.ParcoursID,
        Longitude: this.state.point.Longitude,
        Latitude: this.state.point.Latitude,
        CategorieID: this.state.point.CategorieID,
        Accessibilite: this.state.point.Accessibilite,
        Debut: this.state.point.Debut,
        Fin: this.state.point.Fin,
      })
      .then(this.getPlaces)
      .catch((error) => {
        console.log(error);
      });
  };

  deletePoint = (PointInteretID) => {
    console.log(PointInteretID.PointInteretID);
    fetch(`/api/pointsInteret/${PointInteretID.PointInteretID}`, {
      method: "delete",
    })
      .then(this.getPlaces)
      .catch((err) => console.error(err));
  };

  updatePoint = (_) => {
    axios
      .put(`/api/pointsInteret/${this.state.point.PointInteretID}`, {
        NomScientifique: this.state.point.NomScientifique,
        Nom: this.state.point.Nom,
        FamilleID: this.state.point.FamilleID,
        ParcoursID: this.state.point.ParcoursID,
        Longitude: this.state.point.Longitude,
        Latitude: this.state.point.Latitude,
        CategorieID: this.state.point.CategorieID,
        Accessibilite: this.state.point.Accessibilite,
        Debut: this.state.point.Debut,
        Fin: this.state.point.Fin,
      })
      .then(this.getPlaces)
      .catch((error) => {
        console.log(error);
      });
  };

  renderPlaces = ({
    PointInteretID,
    NomScientifique,
    Nom,
    FamilleNom,
    ParcoursNom,
    Longitude,
    Latitude,
    CategorieNom,
    Accessibilite,
    Debut,
    Fin,
  }) => (
    <tr key={PointInteretID}>
      <td>{PointInteretID}</td>
      <td>{NomScientifique}</td>
      <td>{Nom}</td>
      <td>{FamilleNom}</td>
      <td>{ParcoursNom}</td>
      <td>{Longitude}</td>
      <td>{Latitude}</td>
      <td>{CategorieNom}</td>
      <td>{Accessibilite}</td>
      <td>{Debut}</td>
      <td>{Fin}</td>

      <td>
        <button
          className="deleteButton"
          onClick={() => this.deletePoint({ PointInteretID })}
        >
          Supprimer point
        </button>
      </td>
    </tr>
  );

  //this.deletePoint({idPoint})

  render() {
    const { places, point } = this.state;
    const user = getUser();
    const handleLogout = () => {
      removeUserSession();
      this.props.history.push("/login");
    };

    return (
      <div className="center">
        <h1>Page admin</h1>
        <p>Bienvenue {user.Nom}!</p>{" "}
        <button type="button" id="disconnectButton" onClick={handleLogout}>
          Se déconnecter
        </button>
        <Link to="/newUser">
          <button id="newUser">Ajouter un utilisateur</button>
        </Link>
        <br />
        <div className="container">
          <div id="FormAddEntry" className="item">
            <h3>Ajouter un point d'intérêt</h3>
            <label htmlFor="addNomScientifique">NomScientifique</label>
            <input
              id="addNomScientifique"
              type="text"
              value={point.NomScientifique}
              onChange={(e) =>
                this.setState({
                  point: { ...point, NomScientifique: e.target.value },
                })
              }
            />
            <br />
            <label htmlFor="addNom">Nom latin</label>
            <input
              id="addNom"
              type="text"
              value={point.Nom}
              onChange={(e) =>
                this.setState({ point: { ...point, Nom: e.target.value } })
              }
            />
            <br />
            <label htmlFor="addFamille">Famille</label>
            <select
              id="addFamille"
              type="text"
              value={point.FamilleID}
              onChange={(e) =>
                this.setState({
                  point: { ...point, FamilleID: e.target.value },
                })
              }
            >
              <option value="1">Salix</option>
              <option value="2">Acer</option>
              <option value="3">Quercus</option>
              <option value="99">Autre</option>
            </select>
            <br />
            <label htmlFor="addParcours">Parcours</label>
            <select
              id="addParcours"
              type="text"
              value={point.ParcoursID}
              onChange={(e) =>
                this.setState({
                  point: { ...point, ParcoursID: e.target.value },
                })
              }
            >
              <option value="1">Parcours des Sciences</option>
              <option value="2">Parcours du cyclotron</option>
              <option value="3">Parcours du lac</option>
              <option value="4">Parcours du jardin botanique</option>
              <option value="5">Parcours du parc de Moulinsart</option>
            </select>
            <br />
            <label htmlFor="addLongitude">Longitude</label>
            <input
              id="addLongitude"
              type="number"
              step="0.1"
              value={point.Longitude}
              onChange={(e) =>
                this.setState({
                  point: { ...point, Longitude: e.target.value },
                })
              }
            />
            <br />
            <label htmlFor="addLatitude">Latitude</label>
            <input
              id="addLatitude"
              type="number"
              step="0.1"
              value={point.Latitude}
              onChange={(e) =>
                this.setState({
                  point: { ...point, Latitude: e.target.value },
                })
              }
            />
            <br />
            <label htmlFor="addCategorie" className="Right">
              Catégorie
            </label>
            <select
              id="addCategorie"
              type="text"
              value={point.CategorieID}
              onChange={(e) =>
                this.setState({
                  point: { ...point, CategorieID: e.target.value },
                })
              }
            >
              <option value="1">Arbres remarquables</option>
            </select>
            <br />
            <label htmlFor="addDebut">Début</label>
            <input
              id="addDebut"
              type="text"
              value={point.Debut}
              onChange={(e) =>
                this.setState({
                  point: { ...point, Debut: e.target.value },
                })
              }
            />
            <br />
            <label htmlFor="addFin">Fin</label>
            <input
              id="addFin"
              type="text"
              value={point.Fin}
              onChange={(e) =>
                this.setState({
                  point: { ...point, Fin: e.target.value },
                })
              }
            />
            <br />
            <label htmlFor="addAccessibilite">Accessible</label>
            <select
              id="addAccessibilite"
              value={point.Accessibilite}
              onChange={(e) =>
                this.setState({
                  point: { ...point, Accessibilite: e.target.value },
                })
              }
            >
              <option value="0">Non</option>
              <option value="1">Oui</option>
            </select>
            <br />
            <button id="ajouterPoint" onClick={this.addPoint}>
              Ajouter
            </button>
          </div>

          <div id="FormModifyEntry" className="item">
            <h3>Modifier point d'intérêt</h3>
            <label htmlFor="updateID">Identifiant</label>
            <input
              id="updateID"
              type="number"
              value={point.PointInteretID}
              onChange={(e) =>
                this.setState({
                  point: { ...point, PointInteretID: e.target.value },
                })
              }
            />
            <br />
            <label htmlFor="updateNomScientifique">NomScientifique</label>
            <input
              id="updateNomScientifique"
              type="text"
              value={point.NomScientifique}
              onChange={(e) =>
                this.setState({
                  point: { ...point, NomScientifique: e.target.value },
                })
              }
            />
            <br />
            <label htmlFor="updateNom">Nom</label>
            <input
              id="updateNom"
              type="text"
              value={point.Nom}
              onChange={(e) =>
                this.setState({ point: { ...point, Nom: e.target.value } })
              }
            />
            <br />
            <label htmlFor="updateFamille">Famille</label>
            <select
              id="updateFamille"
              type="text"
              value={point.FamilleID}
              onChange={(e) =>
                this.setState({
                  point: { ...point, FamilleID: e.target.value },
                })
              }
            >
              <option value="1">Salix</option>
              <option value="2">Acer</option>
              <option value="3">Quercus</option>
              <option value="99">Autre</option>
            </select>
            <br />
            <label htmlFor="updateParcours">Parcours</label>
            <select
              id="updateParcours"
              type="text"
              value={point.ParcoursID}
              onChange={(e) =>
                this.setState({
                  point: { ...point, ParcoursID: e.target.value },
                })
              }
            >
              <option value="1">Parcours des Sciences</option>
              <option value="2">Parcours du cyclotron</option>
              <option value="3">Parcours du lac</option>
              <option value="4">Parcours du jardin botanique</option>
              <option value="5">Parcours du parc de Moulinsart</option>
            </select>
            <br />
            <label htmlFor="updateLongitude">Longitude</label>
            <input
              id="updateLongitude"
              type="number"
              step="0.1"
              value={point.Longitude}
              onChange={(e) =>
                this.setState({
                  point: { ...point, Longitude: e.target.value },
                })
              }
            />
            <br />
            <label htmlFor="updateLatitude">Latitude</label>
            <input
              id="updateLatitude"
              type="number"
              step="0.1"
              value={point.Latitude}
              onChange={(e) =>
                this.setState({
                  point: { ...point, Latitude: e.target.value },
                })
              }
            />
            <br />
            <label htmlFor="updateCategorie" className="Right">
              Catégorie
            </label>
            <select
              id="updateCategorie"
              type="text"
              value={point.CategorieID}
              onChange={(e) =>
                this.setState({
                  point: { ...point, CategorieID: e.target.value },
                })
              }
            >
              <option value="1">Arbres remarquables</option>
            </select>
            <br />
            <label htmlFor="updateDebut">Début</label>
            <input
              id="updateDebut"
              type="text"
              value={point.Debut}
              onChange={(e) =>
                this.setState({
                  point: { ...point, Debut: e.target.value },
                })
              }
            />
            <br />
            <label htmlFor="updateFin">Fin</label>
            <input
              id="updateFin"
              type="text"
              value={point.Fin}
              onChange={(e) =>
                this.setState({
                  point: { ...point, Fin: e.target.value },
                })
              }
            />
            <br />
            <label htmlFor="updateAccessibilite">Accessible</label>
            <select
              id="updateAccessibilite"
              value={point.Accessibilite}
              onChange={(e) =>
                this.setState({
                  point: { ...point, Accessibilite: e.target.value },
                })
              }
            >
              <option value="0">Non</option>
              <option value="1">Oui</option>
            </select>
            <br />
            <button id="modifyEntry" onClick={this.updatePoint}>
              Modifier
            </button>
          </div>
        </div>
        <br />
        <table align="center">
          <thead>
            <tr>
              <th>ID</th>
              <th>NomScientifique</th>
              <th>Nom</th>
              <th>Famille</th>
              <th>Parcours</th>
              <th>Longitude</th>
              <th>Latitude</th>
              <th>Catégorie</th>
              <th>Accessible</th>
              <th>Début</th>
              <th>Fin</th>
              <th>Supprimer</th>
            </tr>
          </thead>
          <tbody>{places.map(this.renderPlaces)}</tbody>
        </table>
        <br />
      </div>
    );
  }
}

export default Admin;
