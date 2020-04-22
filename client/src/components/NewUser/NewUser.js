import React, { Component } from "react";
import "./../../App.css";
import axios from "axios";

class NewUser extends Component {
  constructor() {
    super();
    this.state = {
      Nom: "",
      Pseudo: "",
      MdP: "",
      error: null,
      setError: null
    };
  }

  register = () => {
    axios
      .post("/users/register", {
        Nom: this.state.Nom,
        Pseudo: this.state.Pseudo,
        MdP: this.state.MdP
      })
      .then(this.props.history.push("/admin"))
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
      <div className="center">
        <h1>Ajouter un utilisateur</h1>
        <form id="newUserForm">
          <div>
            <label htmlFor="Nom">Nom</label>
            <br />
            <input
              type="text"
              id="Nom"
              value={this.state.Nom}
              onChange={e =>
                this.setState({
                  Nom: e.target.value
                })
              }
              autoComplete="name"
            />
          </div>
          <div>
            <label htmlFor="Pseudo">Pseudo</label>
            <br />
            <input
              type="text"
              id="Pseudo"
              value={this.state.Pseudo}
              onChange={e =>
                this.setState({
                  Pseudo: e.target.value
                })
              }
              autoComplete="new-password"
            />
          </div>
          <div style={{ marginTop: 10 }}>
            <label htmlFor="MdP">Mot de passe</label>
            <br />
            <input
              type="password"
              id="MdP"
              value={this.state.MdP}
              onChange={e =>
                this.setState({
                  MdP: e.target.value
                })
              }
              autoComplete="new-password"
            />
          </div>
          {this.state.error && (
            <>
              <small style={{ color: "red" }}>{this.state.error}</small>
              <br />
            </>
          )}
          <input
            type="button"
            value="Ajouter l'utilisateur"
            onClick={this.register}
            id="loginButton"
          />
        </form>
      </div>
    );
  }
}

export default NewUser;
