import React from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import style from "styled-components";
import "./../../App.css";

const Wrapper = style.div`
width: ${props => props.width};
height: ${props => props.height};
`;

export default class Map extends React.Component {
  componentDidMount() {
    this.map = L.map("map", {
      center: [50.668081, 4.6118324],
      zoom: 14,
      zoomControl: false
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      detectRetin: true,
      minZoom: 14,
      maxZoom: 18,
      maxNativeZoom: 17
    }).addTo(this.map);
  }

  render() {
    return <Wrapper width="1280px" height="720px" id="map" />;
  }
}
