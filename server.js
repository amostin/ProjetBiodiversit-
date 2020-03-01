const express = require("express");
const mysql = require("mysql");

const app = express();

const SELECT_ALL_PLACES_QUERY =
  "SELECT idPlaces, nom, nomLatin, localisation, categorie, DATE_FORMAT(startVisibilite, '%d/%m/%Y') AS startVisibilite, DATE_FORMAT(stopVisibilite, '%d/%m/%Y') AS stopVisibilite, accessibilite FROM places;";
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Jslmdpmlrdc3419$",
  database: "probio"
});

connection.connect(err => {
  if (err) {
    return err;
  }
  console.log("connecté");
});

app.get("/api/places", (req, res) => {
  connection.query(SELECT_ALL_PLACES_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  });
});

app.get("/api/add", (req, res) => {
  const {
    nom,
    nomLatin,
    localisation,
    categorie,
    startVisibilite,
    stopVisibilite,
    accessibilite
  } = req.query;
  const INSERT_PLACES_QUERY = `INSERT INTO Places (nom, nomLatin, localisation, categorie, startVisibilite, stopVisibilite, accessibilite) VALUES('${nom}', '${nomLatin}', '${localisation}', '${categorie}', '${startVisibilite}', '${stopVisibilite}', '${accessibilite}')`;
  connection.query(INSERT_PLACES_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("successfully added place");
    }
  });
});

const port = 5000;

app.listen(port, () => console.log(`Server start on port ${port}`));
