import React from "react";
import "./App.css";
import Categorie from "./components/Categorie/Categorie";
import Admin from "./components/Admin/Admin";
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
            <Route
              path="/"
              exact
              render={() => (
                <div>
                  <div className="right">
                    <Link to="login">
                      <img id="login" src={login} alt="" title="Connexion" />
                    </Link>
                  </div>

                  <div className="center">
                    <Categorie />
                  </div>
                </div>
              )}
            />
            <Route path="/login" component={Login} />
            <Route path="/admin" component={Admin} />
            <Route path="/pointInteret/:idPoint" component={PointDetail} />
            <Route path="/itineraire" component={Itineraire} />
          </Switch>
        </div>
      </Router>
    );
  }
}
