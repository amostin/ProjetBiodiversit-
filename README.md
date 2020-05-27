# ProjetBiodiversit-

## Le Projet

Projet lancé en 2020 dans le cadre du cours de Développement Web de l'Ephec Louvain-la-Neuve. Le but est de fournir des informations aux promeneurs dans Louvain-la-Neuve via le scan de QR codes, disponibles à différents endroits emblématiques de Louvain-la-Neuve.

## Equipe

- [Cyril Wastchenko](https://github.com/Cyril-Etyk)
- [Clément Miesse](https://github.com/cmiesse)
- [Ambroise Mostin](https://github.com/amostin)

## Installation
**Setup frontend & backend**
- `git clone https://github.com/Cyril-Etyk/ProjetBiodiversit-.git` pour cloner le projet
- se placer dans le dossier ProjetBiodiversit- (le dossier principal) via une ligne de commande
- `npm install` pour installer la partie Node/Express
- `npm run client-install` pour installer la partie React

**Création de la base de données**
- Installer MySQL-server avec : `sudo apt-get install mysql-server`
- Démarrer le service mysql : `sudo systemctl start mysql`
- Se connecter en tant que Root afin de configurer la suite : `/usr/bin/mysql -u root -p`
- Créer un utilisateur 'mysql', définir un mot de passe, définir les accès de l'utilisateur et réinitialiser la configuration :
`CREATE USER 'mysql'@'localhost' IDENTIFIED BY 'Jslmdpmlrdc3419$';
GRANT SELECT, INSERT, DELETE, UPDATE ON probio.* TO 'mysql'@'localhost';
FLUSH PRIVILEGES;`
- Créer la base de données et la définir comme BDD par défaut : `CREATE DATABASE probio` et `USE probio;`
- Créer les tables et insérer les valeurs dans les tables comme défini : [ICI](https://github.com/Cyril-Etyk/ProjetBiodiversit-/blob/master/Documents/MYSQL%20data/MysqlData.txt)

**Lancer le projet**
- se placer dans le dossier ProjetBiodiversit- (le dossier principal) via une ligne de commande
- `npm run client-build` afin de créer un build du projet
- `npm run build` pour lancer le backend ainsi que le frontend
