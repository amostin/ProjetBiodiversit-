
require('dotenv').config();
const express = require("express");
const mysql = require("mysql");
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const utils = require('./utils');

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

app.get("/api/update", (req, res) => {
  const {
    idPoint,
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
  const UPDATE_PLACES_QUERY = `UPDATE Points SET nom = '${nom}',  nomLatin = '${nomLatin}', adresse = '${adresse}', longitude = '${longitude}', latitude = '${latitude}', categorie = '${categorie}', debut = '${debut}', fin = '${fin}', accessibilite = '${accessibilite}' where idPoint = '${idPoint}'`;
  connection.query(UPDATE_PLACES_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("successfully updated place");
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


//authentification testé sur postman

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// static user details
const userData = {
  userId: "789789",
  password: "123456",
  name: "Clue Mediator",
  username: "cluemediator",
  isAdmin: true
};

// validate the user credentials
app.post('/users/signin', function (req, res) {
  const user = req.body.username;
  const pwd = req.body.password;

  // return 400 status if username/password is not exist
  if (!user || !pwd) {
    return res.status(400).json({
      error: true,
      message: "Username or Password required."
    });
  }

  // return 401 status if the credential is not match.
  if (user !== userData.username || pwd !== userData.password) {
    return res.status(401).json({
      error: true,
      message: "Username or Password is Wrong."
    });
  }

  // generate token
  const token = utils.generateToken(userData);
  // get basic user details
  const userObj = utils.getCleanUser(userData);
  // return the token along with user details
  return res.json({ user: userObj, token });
});


// verify the token and return it if it's valid
app.get('/verifyToken', function (req, res) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required."
    });
  }
  // check token that was passed by decoding token using secret
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) return res.status(401).json({
      error: true,
      message: "Invalid token."
    });

    // return 401 status if the userId does not match.
    if (user.userId !== userData.userId) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    }
    // get basic user details
    var userObj = utils.getCleanUser(userData);
    return res.json({ user: userObj, token });
  });
});


//middleware that checks if JWT token exists and verifies it if it does exist.
//In all future routes, this helps to know if the request is authenticated or not.
app.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['authorization'];
  if (!token) return next(); //if no token, continue

  token = token.replace('Bearer ', '');
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    } else {
      req.user = user; //set the user to req so other routes can use it
      next();
    }
  });
});

// request handlers
app.get('/', (req, res) => {
  if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' });
  res.send('Welcome to the Node.js Tutorial! - ' + req.user.name);
});
