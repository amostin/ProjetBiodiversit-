var express = require('express');

var app = express();

app.get('/accueil', function(req, res) {
    res.render('accueil.ejs');
});

app.get('/connexion', function(req, res) {
    res.render('connexion.ejs');
});

app.get('/admin', function(req, res) {
    res.render('admin.ejs');
});

app.get('/nomCategorie', function(req, res) {
    res.render('nomCategorie.ejs');
});

app.get('/nomPointInteret', function(req, res) {
    res.render('nomPointInteret.ejs');
});

app.get('/itineraire', function(req, res) {
    res.render('itineraire.ejs');
});

app.get('/imprimer', function(req, res) {
    res.render('imprimer.ejs');
});

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

app.listen(8080);
