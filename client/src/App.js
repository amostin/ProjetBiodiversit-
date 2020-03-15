import React, { useState, useEffect } from 'react';
import "./App.css";
import Categorie from "./components/Categorie/Categorie";
import Admin from "./components/Admin/Admin";
import Login from "./components/Login/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import login from "./login.png";
import PointDetail from "./components/PointDetails/PointDetail";
import Itineraire from "./components/Itineraire/Itineraire";
import PrivateRoute from './Utils/PrivateRoute';
import axios from 'axios';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';

function App(){

  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios.get(`http://localhost:5000/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

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
                    <br />
                    <Link to="/itineraire">
                      <button id="newItinerary">Calculer un itinéraire</button>
                    </Link>
                  </div>
                </div>
              )}
            />
            <Route path="/login" component={Login} />
            <PrivateRoute  path="/admin" component={Admin} />
            <Route path="/pointInteret/:idPoint" component={PointDetail} />
            <Route path="/itineraire" component={Itineraire} />
          </Switch>
        </div>
      </Router>
    );
  }

export default App;
