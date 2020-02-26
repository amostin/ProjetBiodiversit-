var express = require("express");
var cors = require("cors");
var mysql = require("mysql");

var app = express();

//Connection DB

const SELECT_ALL_PLACES_QUERY = "SELECT * FROM places;";
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
console.log(connection);

app.use(cors());

//Routage

app.get("/", (req, res) => {
  res.send("Go to /connexion to connect");
});

app.get("/accueil", function(req, res) {
  res.render("accueil.ejs");
});

app.get("/connexion", function(req, res) {
  res.render("connexion.ejs");
});

app.get("/admin", function(req, res) {
  res.render("admin.ejs");
});

app.get("/nomCategorie", function(req, res) {
  res.render("nomCategorie.ejs");
});

app.get("/nomPointInteret", (req, res) => {
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

app.get("/itineraire", function(req, res) {
  res.render("itineraire.ejs");
});

app.get("/imprimer", function(req, res) {
  res.render("imprimer.ejs");
});

app.use(function(req, res, next) {
  res.setHeader("Content-Type", "text/plain");
  res.status(404).send("Page introuvable !");
});

app.listen(8080);
