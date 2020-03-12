const express = require("express");
const mysql = require("mysql");

const app = express();

const SELECT_ALL_PLACES_QUERY =
  "SELECT idPoint, nom, nomLatin, adresse, longitude, latitude, categorie, DATE_FORMAT(debut, '%d/%m/%Y') AS debut, DATE_FORMAT(fin, '%d/%m/%Y') AS fin, accessibilite FROM Points;";
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

app.get("/api/get", (req, res) => {
  const { idPoint } = req.query;
  const GET_ID_QUERY = `SELECT idPoint, nom, nomLatin, adresse, longitude, latitude, categorie, DATE_FORMAT(debut, '%d/%m/%Y') AS debut, DATE_FORMAT(fin, '%d/%m/%Y') AS fin, accessibilite FROM Points WHERE idPoint = ${idPoint}`;
  connection.query(GET_ID_QUERY, (err, results) => {
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
    adresse,
    longitude,
    latitude,
    categorie,
    debut,
    fin,
    accessibilite
  } = req.query;
  const INSERT_PLACES_QUERY = `INSERT INTO Points (nom, nomLatin, adresse, longitude, latitude, categorie, debut, fin, accessibilite) VALUES('${nom}', '${nomLatin}', '${adresse}', '${longitude}', '${latitude}', '${categorie}', '${debut}', '${fin}', '${accessibilite}')`;
  connection.query(INSERT_PLACES_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("successfully added place");
    }
  });
});

app.get("/api/delete", (req, res) => {
  const { idPoint } = req.query;
  const DELETE_PLACES_QUERY = `DELETE FROM Points WHERE idPoint=${idPoint}`;
  connection.query(DELETE_PLACES_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("successfully deleted place");
    }
  });
});

app.get("/api/categorie", (req, res) => {
  const { categorie } = req.query;
  const SELECT_CATEGORY_QUERY = `SELECT idPoint, nom, longitude, latitude FROM Points WHERE categorie='${categorie}'`;
  connection.query(SELECT_CATEGORY_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  });
});
const port = 5000;

app.listen(port, () => console.log(`Server start on port ${port}`));
