# WIKI-PAS-DIA (Front) -- Par Vincent TISSEYRE

## Installation du projet :

> - Ouvrez un terminal à la racine du dossier front-wikipasdia
> - lancer la commande `npm install`
> - lancer la commande `npm start`
> - Le navigateur se lancera automatiquement sur le port 3000 (attention à bien avoir lancé le serveur back avant)
> - Cliquer sur le bouton "Initialiser la base de données" dans le menu de gauche
> - Pour pouvoir effectuer les opérations de modification / ajout / supression une connexion est nécessaire voici des identifiants 
> - après initialisation de la base de données --> 
> - email : email@test.fr
> - password : password
> - Sinon vous pouvez aussi vous créer un compte

## Routes

### Principale

> - `/` : Page principale

### Article

#### Article CRUD

> - `/articles` : Liste des articles
> - `/articles/create` : Création d'un article
> - `/articles/:id/edit` : Modification d'un article
> - `/articles/:id` : Affichage de la page d'un article

#### Article Recherche

> - `/categorie/:id/articles` : Recherche des articles par catégorie
> - `/tag/:id/articles` : Recherche des articles par tag
> - `/articlesByTitre/:titre` : Recherche des articles en fonction de son titre

### Tag

#### Tag CRUD

> - `/tags` : Liste des tags
> - `/tags/create` : Création d'un tag
> - `/tags/:id/edit` : Modification d'un tag

### Categorie

#### Categorie CRUD

> - `/categories` : Liste des catégories
> - `/categories/create` : Création d'une catégorie
> - `/categories/:id/edit` : Modification d'une catégorie

### Connexion

> - `/login` : Affichage de la page de connexion
> - `/register` : Affichage de la page d'inscription

## Fonctionnalités

- Articles
> - Liste des articles
```
> Accès via le bouton "Articles" du menu de gauche
```

> - Création d'un article
```
> Accès suite à la connexion de l'utilisateur
> Accès via le bouton "Ajouter un article" sur le menu de gauche
> Accès via le menu "Ajouter un article" sur la page de la liste des articles
```

> - Modification d'un article
```
> Accès suite à la connexion de l'utilisateur
> Accès via l'icon de modification d'un article sur la page de la liste des articles
> Accès via le bouton "Modifier" sur la page d'un article
```

> - Suppression d'un article
```
> Accès suite à la connexion de l'utilisateur
> Accès via l'icon de suppression d'un article sur la page de la liste des articles
```

> - Affichage de la page d'un article
```
> Accès via le clic d'un article sur la page de la liste des articles
```

> - Changer la version d'un article
```
> Accès via le bouton "Changer de version" sur la page d'un article
> Le bouton affiche une liste des versions associées à l'article choisi
> Le changement de version se fait automatiquement lors du clic sur la version
> Rappel : Lors de la création et la modification d'un article, une version se créer automatiquement, celle-ci est accessible dans la liste des versions
```

> - Recherche par tag
```
> Accès via le clic d'un tag sur le menu de gauche
> Accès via le clic d'un tag sur la page de liste des tags
> Accès via le clic d'un tag sur la page d'un article
```

> - Recherche par catégorie
```
> Accès via le clic d'une catégorie sur la page de liste des catégories
> Accès via le clic d'une catégorie sur la page principale
```

> - Recherche par titre
```
> Accès via la recherche d'un titre d'article dans la barre de recherche du menu du haut
```

- Tags

> - Liste des tags
```
> Accès via le clic du bouton "Tags" du menu de gauche
```

> - Création d'un tag
```
> Accès suite à la connexion d'un utilisateur
> Accès via le bouton "Ajouter un tag" sur la page de la liste des tags
```

> - Modification d'un tag
```
> Accès suite à la connexion d'un utilisateur
> Accès via l'icon de modification d'un tag sur la page de la liste des tags
```

> - Suppression d'un tag
```
> Accès suite à la connexion d'un utilisateur
> Accès via l'icon de suppression d'un tag sur la page de la liste des tags
```

- Catégories

> - Liste des catégories
```
> Accès via le clic du bouton "Catégories" du menu de gauche
```

> - Création d'une catégorie
```
> Accès suite à la connexion d'un utilisateur
> Accès via le bouton "Ajouter une catégorie" sur la page de la liste des catégories
```

> - Modification d'une catégorie
```
> Accès suite à la connexion d'un utilisateur
> Accès via l'icon de modification d'une catégorie sur la page de la liste des catégories
```

> - Suppression d'une catégorie
```
> Accès suite à la connexion d'un utilisateur
> Accès via l'icon de suppression d'une catégorie sur la page de la liste des catégories
```

- Connexion/Déconnexion
```
> Accès via le bouton de connexion/déconnexion sur le menu du haut
```

- Inscription
```
> Accès via le bouton d'inscription sur la page de connexion
```
