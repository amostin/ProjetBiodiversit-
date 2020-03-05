import React from "react";
import "./App.css";
import Points from "./components/Points/Points";
import Admin from "./components/Admin/Admin";
import Login from "./components/Login/Login";
import Itineraire from "./components/Itineraire/Itineraire";
import Categorie from "./components/Categorie/Categorie";
import PointDetail from "./components/PointDetails/PointDetail";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Map from "./components/Map/Map";
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
          <Route path="/pointInteret/:idPoint" component={PointDetail} />
          <Route path="/itineraire" component={Itineraire} />
          <Route path="/categorie" component={Categorie} />
        </Switch>
      </div>
    </Router>
  );
}

const Home = () => (
  <div>
    <div className="right">
      <Link to="/login">
        <img id="login" src={login} alt="" title="Connexion" />
      </Link>
    </div>

    <div className="center">
      <Categorie />
      <br />
      <Map />
    </div>
  </div>
);
export default App;
