import React from "react";
import "./App.css";
import Categorie from "./components/Categorie/Categorie";
import Map from "./components/Map/Map";
import Login from "./components/Login/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import login from "./login.png";
import PointDetail from "./components/PointDetails/PointDetail";
import Itineraire from "./components/Itineraire/Itineraire";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/login" component={Login}></Route>
            <Route
              path="/pointInteret/:idPoint"
              component={PointDetail}
            ></Route>
            <Route path="/itineraire" component={Itineraire}></Route>
          </Switch>
          <div className="right">
            <Link to="login">
              <img id="login" src={login} alt="" title="Connexion" />
            </Link>
          </div>

          <div className="center">
            <Categorie />
            <br />
            <Map />
          </div>
        </div>
      </Router>
    );
  }
}
