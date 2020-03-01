import React from "react";
import "./App.css";
import Places from "./components/places/places";
import Nav from "./Nav";
import Admin from "./Admin";
import Login from "./Login";
import Itineraire from "./Itineraire";
import Categorie from "./Categorie";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/admin" exact component={Admin}></Route>
          <Route path="/pointInteret" component={Places} />
          <Route path="/pointInteret/:id" component={Places} />
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
