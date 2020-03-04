import React from "react";
import "./App.css";
import Points from "./components/Points/Points";
import Admin from "./components/Admin/Admin";
import Login from "./components/Login/Login";
import Itineraire from "./components/Itineraire/Itineraire";
import Categorie from "./components/Categorie/Categorie";
import PointDetail from "./components/PointDetails/PointDetail";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import carte from "./map.JPG";
import login from "./login.png";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/admin" component={Admin}></Route>
          <Route path="/pointInteret" exact component={Points} />
          <Route path="/pointInteret/:idPlaces" component={PointDetail} />
          <Route path="/itineraire" component={Itineraire} />
          <Route path="/categorie" component={Categorie} />
        </Switch>
      </div>
    </Router>
  );
}

const Home = () => (
  <div>
    <div class="right">
      <Link to="/login">
        <img id="login" src={login} alt="" title="Connexion" />
      </Link>
    </div>

    <div class="center">
      <Categorie />
      <br />
      <img id="carte" src={carte} alt="carte exemple" />
      <br />
    </div>
  </div>
);
export default App;
