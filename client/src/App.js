import React from "react";
import "./App.css";
import Points from "./components/Points/Points";
import Nav from "./components/Nav/Nav";
import Admin from "./components/Admin/Admin";
import Login from "./components/Login/Login";
import Itineraire from "./components/Itineraire/Itineraire";
import Categorie from "./components/Categorie/Categorie";
import PointDetail from "./components/PointDetails/PointDetail";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import carte from "./map.JPG";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
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
    <h1>Page d'accueil</h1>
    <img id="carte" src={carte} alt="carte exemple" />
  </div>
);
export default App;
