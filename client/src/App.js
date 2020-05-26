import React, { useState, useEffect } from "react";
import "./App.css";
import Parcours from "./components/Parcours/Parcours";
import Admin from "./components/Admin/Admin";
import NewUser from "./components/NewUser/NewUser";
import Login from "./components/Login/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import login from "./login.png";
import PointDetail from "./components/PointDetails/PointDetail";
import Itineraire from "./components/Itineraire/Itineraire";
import PrivateRoute from "./Utils/PrivateRoute";
import axios from "axios";
import { getToken, removeUserSession, setUserSession } from "./Utils/Common";

function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios
      .get(`/api/verifyToken?token=${token}`)
      .then((response) => {
        setUserSession(response.data.token, response.data.user);
        setAuthLoading(false);
      })
      .catch((error) => {
        removeUserSession();
        setAuthLoading(false);
      });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>;
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
                <div id="adminItineraryGroup">
                  <Link to="/itineraire">
                    <button id="itineraryButton">Calculer un itinéraire</button>
                  </Link>
                  <Link to="login">
                    <button id="adminZoneButton">Zone administrateur</button>
                  </Link>
                </div>

                <div className="center">
                  <Parcours />
                  <br />

                </div>
              </div>
            )}
          />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/admin" component={Admin} />
          <PrivateRoute path="/newUser" component={NewUser} />
          <Route path="/pointInteret/:PointInteretID" component={PointDetail} />
          <Route path="/itineraire" component={Itineraire} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
