import React, { Component } from "react";

class PointDetail extends Component {
  state = {
    points: []
  };

  componentDidMount() {
    const parametre = this.props.match.params.idPoint;
    fetch(`/api/get?idPoint=${parametre}`)
      .then(res => res.json())
      .then(res => this.setState({ points: res.data }))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="center">
        {this.state.points.map(point => (
          <div key={point.idPoint}>
            <h1>{point.nom}</h1>
            <h2>{point.nomLatin}</h2>
            <p>
              Le point se situe à : {point.adresse} ({point.longitude},
              {point.latitude})
            </p>
            <p>Il est de catégorie {point.categorie}</p>
            <p>
              Il est visitable entre le {point.debut} au {point.fin}
            </p>
          </div>
        ))}
      </div>
    );
  }
}

export default PointDetail;
