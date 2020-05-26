import React, { Component } from "react";
import { Link } from "react-router-dom";

class PointDetail extends Component {
  state = {
    points: []
  };

  componentDidMount() {
    const PointInteretID = this.props.match.params.PointInteretID;
    fetch(`/api/pointsInteret/${PointInteretID}`)
      .then(res => res.json())
      .then(res => this.setState({ points: res.data }))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="center">
        {this.state.points.map(point => (
          <div key={point.PointInteretID}>
            <h1>{point.NomScientifique}</h1>
            <h2>{point.Nom}</h2>
            <p>Famille : <b>{point.FamilleNom}</b></p>
            <p><br/>
              Le point se situe aux coordonnées suivantes : <br/><br/>Latitude de <b>{point.Latitude}</b> et Longitude de <b>{point.Longitude}</b>
            </p>
            <p><br/>
              Il est de catégorie : <b>{point.CategorieNom}</b> et se trouve sur le <b>
              {point.ParcoursNom}</b>
            </p>
            <p><br/>
              Il est accessible entre le <b>{point.Debut}</b> au <b>{point.Fin}</b>
            </p>
            <Link to="/">
            <button type="button" id='returnButton'>
              Retour accueil
            </button>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default PointDetail;
