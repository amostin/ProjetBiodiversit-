import React, { Component } from "react";

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
            <p>Famille : {point.FamilleNom}</p>
            <p>
              Le point se situe à : [{point.Longitude},{point.Latitude}]
            </p>
            <p>
              Il est de catégorie {point.CategorieNom} sur le{" "}
              {point.ParcoursNom}
            </p>
            <p>
              Il est visitable entre le {point.Debut} au {point.Fin}
            </p>
          </div>
        ))}
      </div>
    );
  }
}

export default PointDetail;
