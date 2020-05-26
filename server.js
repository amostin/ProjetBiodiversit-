require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const utils = require("./utils");
const app = express();

// Informations pour la connexion à la DB
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Jslmdpmlrdc3419$",
  database: "probio",
});

//Connexion à la DB et vérification
connection.connect((err) => {
  if (err) {
    return err;
  }
  console.log("DB : Connecté");
});

// Obtenir tous les point d'intérêts
app.get("/api/pointsInteret", (req, res) => {
  const SELECT_ALL_POINTS_QUERY = `SELECT pi.PointInteretID, pi.NomScientifique, pi.Nom, pi.Longitude, pi.Latitude, pi.Accessibilite, DATE_FORMAT(pi.Debut, '%d/%m/%Y') AS Debut, DATE_FORMAT(pi.Fin, '%d/%m/%Y') AS Fin, f.FamilleNom, p.ParcoursNom, c.CategorieNom
  FROM pointsinteret pi, familles f, parcours p, categories c
  WHERE pi.FamilleID = f.FamilleID and pi.ParcoursID = p.ParcoursID and pi.CategorieID = c.CategorieID
  ORDER BY pi.PointInteretID`;
  connection.query(SELECT_ALL_POINTS_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({ data: results });
    }
  });
});

// Obtenir un point d'intérêt précis avec le paramètre id donné
app.get("/api/pointsInteret/:id", (req, res) => {
  const PointInteretID = req.params.id;
  const GET_POINTS_BY_ID_QUERY = `SELECT pi.PointInteretID, pi.NomScientifique, pi.Nom, pi.Longitude, pi.Latitude, pi.Accessibilite, DATE_FORMAT(pi.Debut, '%d/%m/%Y') AS Debut, DATE_FORMAT(pi.Fin, '%d/%m/%Y') AS Fin, f.FamilleNom, p.ParcoursNom, c.CategorieNom
  FROM pointsinteret pi, familles f, parcours p, categories c
  WHERE pi.PointInteretID = ${PointInteretID} and pi.FamilleID = f.FamilleID and pi.ParcoursID = p.ParcoursID and pi.CategorieID = c.CategorieID`;
  connection.query(GET_POINTS_BY_ID_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

// Supprime le point d'intérêt dont l'id est donné
app.delete("/api/pointsInteret/:id", (req, res) => {
  const PointInteretID = req.params.id;
  const DELETE_INTEREST_POINT_QUERY = `DELETE FROM pointsinteret WHERE PointInteretID=${PointInteretID}`;
  connection.query(DELETE_INTEREST_POINT_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("Successfully deleted place");
    }
  });
});

// Obtenir les points d'intérêt d'un parcours donné
app.get("/api/pointsInteret/parcours/:id", (req, res) => {
  const ParcoursID = req.params.id;
  const SELECT_POINTS_BY_PARCOURS_ID_QUERY = `SELECT pi.PointInteretID, pi.NomScientifique, pi.Nom, pi.Longitude, pi.Latitude, pi.Accessibilite, DATE_FORMAT(pi.Debut, '%d/%m/%Y') AS Debut, DATE_FORMAT(pi.Fin, '%d/%m/%Y') AS Fin, f.FamilleNom, p.ParcoursNom, c.CategorieNom
  FROM pointsinteret pi, familles f, parcours p, categories c
  WHERE pi.ParcoursID = ${ParcoursID} and pi.FamilleID = f.FamilleID and pi.ParcoursID = p.ParcoursID and pi.CategorieID = c.CategorieID
  ORDER BY pi.PointInteretID`;
  connection.query(SELECT_POINTS_BY_PARCOURS_ID_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

// Obtenir tous les parcours
app.get("/api/parcours", (req, res) => {
  const SELECT_ALL_PARCOURS_QUERY = "SELECT * from parcours";
  connection.query(SELECT_ALL_PARCOURS_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

// Obtenir le parcours avec l'id donné
app.get("/api/parcours/:id", (req, res) => {
  const ParcoursID = req.params.id;
  const SELECT_PARCOURS_BY_ID_QUERY = `SELECT * from parcours WHERE ParcoursID=${ParcoursID}`;
  connection.query(SELECT_PARCOURS_BY_ID_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

// Obtenir toutes les catégories
app.get("/api/categories", (req, res) => {
  const SELECT_ALL_CATEGORIES_QUERY = "SELECT * from categories";
  connection.query(SELECT_ALL_CATEGORIES_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

// Obtenir la catégorie avec l'id donné
app.get("/api/categories/:id", (req, res) => {
  const CategorieID = req.params.id;
  const SELECT_CATEGORY_BY_ID_QUERY = `SELECT * from categories WHERE CategorieID=${CategorieID}`;
  connection.query(SELECT_CATEGORY_BY_ID_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

// Obtenir toutes les familles
app.get("/api/familles", (req, res) => {
  const SELECT_ALL_FAMILLES_QUERY = "SELECT * from familles";
  connection.query(SELECT_ALL_FAMILLES_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

// Obtenir la famille avec l'id donné
app.get("/api/familles/:id", (req, res) => {
  const FamilleID = req.params.id;
  const SELECT_FAMILLE_BY_ID_QUERY = `SELECT * from familles WHERE FamilleID=${FamilleID}`;
  connection.query(SELECT_FAMILLE_BY_ID_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

//Authentification testé sur postman

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Crée un point d'intérêt avec les valeurs données
app.post("/api/pointsInteret", (req, res) => {
  const pointData = {
    NomScientifique: req.body.NomScientifique,
    Nom: req.body.Nom,
    FamilleID: req.body.FamilleID,
    ParcoursID: req.body.ParcoursID,
    Longitude: req.body.Longitude,
    Latitude: req.body.Latitude,
    CategorieID: req.body.CategorieID,
    Accessibilite: req.body.Accessibilite,
    Debut: req.body.Debut,
    Fin: req.body.Fin,
  };

  const INSERT_PLACES_QUERY = `INSERT INTO pointsinteret (
    NomScientifique,
    Nom,
    FamilleID,
    ParcoursID,
    Longitude,
    Latitude,
    CategorieID,
    Accessibilite,
    Debut,
    Fin
    ) VALUES('${pointData.NomScientifique}', '${pointData.Nom}', '${pointData.FamilleID}', '${pointData.ParcoursID}', '${pointData.Longitude}', '${pointData.Latitude}', '${pointData.CategorieID}', '${pointData.Accessibilite}', '${pointData.Debut}', '${pointData.Fin}')`;
  connection.query(INSERT_PLACES_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("Successfully added place");
    }
  });
});

// Modifie le point d'intérêt identifié par l'id donné avec les valeurs données
app.put("/api/pointsInteret/:id", (req, res) => {
  const PointInteretID = req.params.id;
  const pointData = {
    NomScientifique: req.body.NomScientifique,
    Nom: req.body.Nom,
    FamilleID: req.body.FamilleID,
    ParcoursID: req.body.ParcoursID,
    Longitude: req.body.Longitude,
    Latitude: req.body.Latitude,
    CategorieID: req.body.CategorieID,
    Accessibilite: req.body.Accessibilite,
    Debut: req.body.Debut,
    Fin: req.body.Fin,
  };

  const UPDATE_INTEREST_POINT_QUERY = `UPDATE pointsinteret SET NomScientifique = '${pointData.NomScientifique}', Nom = '${pointData.Nom}', FamilleID = '${pointData.FamilleID}', ParcoursID = '${pointData.ParcoursID}', Longitude = '${pointData.Longitude}', Latitude = '${pointData.Latitude}', CategorieID = '${pointData.CategorieID}', Debut = '${pointData.Debut}', Fin = '${pointData.Fin}', Accessibilite = '${pointData.Accessibilite}' where PointInteretID = '${PointInteretID}'`;
  connection.query(UPDATE_INTEREST_POINT_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("Successfully updated place");
    }
  });
});

// Enregister un utilisateur
app.post("/api/users/register", (req, res) => {
  const userData = {
    Nom: req.body.Nom,
    Pseudo: req.body.Pseudo,
    MdP: req.body.MdP,
  };
  if (!userData.Nom || !userData.Pseudo || !userData.MdP) {
    return res.status(400).json({
      error: true,
      message: "Le pseudo et le mot de passe sont obligatoires.",
    });
  }
  const FIND_USER = `SELECT * FROM users WHERE Pseudo ='${userData.Pseudo}'`;
  connection.query(FIND_USER, (err, rows) => {
    if (err) {
      return res.send(err);
    } else if (rows != 0) {
      return res.status(401).json({ error: "L'utilisateur n'existe pas" });
    } else {
      bcrypt.hash(req.body.MdP, 10, (err, hash) => {
        userData.MdP = hash;
        const CREATE_USER = `INSERT INTO users(Nom, Pseudo, MdP)
        VALUES('${userData.Nom}', '${userData.Pseudo}', '${userData.MdP}')`;
        connection.query(CREATE_USER, (err, results) => {
          if (err) {
            return res.status(400).json({ error: "Autre erreur" });
          } else {
            return res.send("Utilisateur ajouté");
          }
        });
      });
    }
  });
});

// valider les informations d'identification de l'utilisateur
app.post("/api/users/signin", function (req, res) {
  const userDetails = {
    Pseudo: req.body.Pseudo,
    MdP: req.body.MdP,
  };

  // retourner l'état 400 si le nom d'utilisateur / mot de passe n'existe pas
  if (!userDetails.Pseudo || !userDetails.MdP) {
    return res.status(400).json({
      error: true,
      message: "Le pseudo et le mot de passe sont obligatoires.",
    });
  }
  const FIND_USER = `SELECT * FROM users WHERE Pseudo ='${userDetails.Pseudo}'`;
  connection.query(FIND_USER, (err, rows) => {
    if (err) {
      return res.send(err);
    } else if (rows == 0) {
      return res.status(400).json({ error: "L'utilisateur n'existe pas" });
    } else if (!bcrypt.compareSync(userDetails.MdP, rows[0].MdP)) {
      return res.status(401).json({
        error: true,
        message: "Le pseudo et/ou le mot de passe sont incorrects.",
      });
    } else if (bcrypt.compareSync(userDetails.MdP, rows[0].MdP)) {
      const userData = {
        UserID: rows[0].UserID,
        Nom: rows[0].Nom,
        Pseudo: rows[0].Pseudo,
        Admin: rows[0].Admin,
      };
      // générer token
      const token = utils.generateToken(userData);
      // obtenir les détails de l'utilisateur de base
      const userObj = utils.getCleanUser(userData);
      // retourner le token avec les détails de l'utilisateur
      return res.json({ user: userObj, token });
    }
  });
});

// vérifier le jeton et le renvoyer s'il est valide
app.get("/api/verifyToken", function (req, res) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token est nécessaire.",
    });
  }
  // check token that was passed by decoding token using secret
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err)
      return res.status(401).json({
        error: true,
        message: "Token non valide.",
      });
    const USER_BY_ID = `SELECT * FROM users WHERE UserID=${user.UserID}`;
    connection.query(USER_BY_ID, (err, rows) => {
      // return 401 status if the userId does not match.
      if (err)
        return res.status(401).json({
          error: true,
          message: "Erreur dans la requête",
        });
      if (user.UserID !== rows[0].UserID) {
        return res.status(401).json({
          error: true,
          message: "Utilisateur non valide.",
        });
      }
      const userData = {
        UserID: rows[0].UserID,
        Nom: rows[0].Nom,
        Pseudo: rows[0].Pseudo,
        Admin: rows[0].Admin,
      };
      // get basic user details
      var userObj = utils.getCleanUser(userData);
      return res.json({ user: userObj, token });
    });
  });
});

//middleware that checks if JWT token exists and verifies it if it does exist.
//In all future routes, this helps to know if the request is authenticated or not.
app.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers["authorization"];
  if (!token) return next(); //if no token, continue

  token = token.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Utilisateur non valide.",
      });
    } else {
      req.user = user; //set the user to req so other routes can use it
      next();
    }
  });
});

// request handlers
app.get("/", (req, res) => {
  if (!req.user)
    return res.status(401).json({
      success: false,
      message: "Utilisateur non valide pour y accéder.",
    });
  res.send("Bienvenue - " + req.user.Nom);
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server start on port ${port}`));
