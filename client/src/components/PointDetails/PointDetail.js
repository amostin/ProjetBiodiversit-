import React, { Component } from "react";

class PointDetail extends Component {
  state = {
    points: []
  };

  componentDidMount() {
    const parametre = this.props.match.params.idPlaces;
    fetch(`/api/get?idPlaces=${parametre}`)
      .then(res => res.json())
      .then(res => this.setState({ points: res.data }))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div>
        {this.state.points.map(point => (
          <div key={point.idPlaces}>
            <h1>{point.nom}</h1>
            <h2>{point.nomLatin}</h2>
            <p>Le point se situe à : {point.localisation}</p>
            <p>Il est de catégorie {point.categorie}</p>
            <p>
              Il est visitable entre le {point.startVisibilite} au{" "}
              {point.stopVisibilite}
            </p>
          </div>
        ))}
      </div>
    );
  }
}

export default PointDetail;
