import React from "react";
import "./App.css";
import Places from "./components/places/places";
import Nav from "./Nav";
import Admin from "./Admin";
import Login from "./Login";
import Itineraire from "./Itineraire";
import Categorie from "./Categorie";
import PointDetail from "./PointDetail";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/admin" component={Admin}></Route>
          <Route path="/pointInteret" exact component={Places} />
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
  </div>
);
export default App;
