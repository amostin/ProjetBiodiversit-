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
        <div>
          {this.state.points.map(point => (
            <h1 key={point.idPlaces}>
              {point.nom}
              <br />
              {point.nomLatin}
              <br />
              {point.localisation}
              <br />
              {point.categorie}
              <br />
            </h1>
          ))}
        </div>
      </div>
    );
  }
}

export default PointDetail;
