# WIKI-PAS-DIA (Back) -- Par Thibault LOEUILLET

## Installation du projet :
    
> - configurer votre base de données mongoDB --> création de compte, utilisateur, droits sur votre ipv4 (le développement a été effectué sur l'offre d'hébergement gratuite disponible sur le site de mongoDB)
> - modifier la constante "uri" du fichier back-wikipasdia/index.js
> - ouvrez un terminal à la racine du dossier back-wikipasdia
> - faire npm install
> - faire node index.js (si tout ce passe bien vous devriez avoir en console le message "connexion à mongo OK"
> - le serveur ce lance sur le port 3001 (il est important de ne pas changer le port pour le bon fonctionnement de l'application react) et l'application react sur le port 3000
> - installer insomia https://insomnia.rest/ (conseillé pour tester facilement l'api)
> - importer le fichier back-wikipasdia/api-insomnia.json dans insomnia pour pouvoir tester l'api
> - dans le dashbord d'insomia cliquez sur le document "api MongoDB/React projet" s'il n'est pas déjà ouvert
> - si vous n'avez pas accès aux requêtes à ce moment là c'est normal il faut cliquer sur l'onget DEBUG en haut et millieu de l'interface
> - vous pouvez maintenant initialiser la base grâce à la requête qui est dans setup --> initialise la base de données
> - la base de donnée est maintenant initialisé vous pouvez tester toutes les requêtes disponible (24) dans les différents dossiers
> - pour initialiser rapidement la base de données sans passer par insomnia utiliser l'url suivant dans un navigateur --> localhost:3001/api/setup 

### Précisions sur la gestion des versions

> La gestion des versions de l'historique d'un article se fait automatiquement côté serveur à l'ajout et a la modification d'un article.

## Routes gérées par l'api et description

### Setup 
- GET --> localhost:3001/api/setup -- Initialise la base de données 
> Retour de l'api status 200 :
```json
    {
        "dbinit" : true,
        "msg" : "base de données correctement initialisé"
    }
```
### Connexion
- POST --> localhost:3001/api/login -- Vérifie en base de données le duo email / password
> Données attendues par l'api
```json
{
	"email" : "email@test.fr",
	"password" : "password"
}
```
> Retour de l'api status 200 :
```json
{
  "connexion": true,
  "msg": "connexion réussie",
  "nom": "nom",
  "prenom": "prenom",
  "email": "email@test.fr"
}
```
### Utilisateur
- POST --> localhost:3001/api/utilisateurs -- Ajoute un utilisateur (inscription)
> Données attendues par l'api
```json
{
  "prenom" : "prenom",
  "nom" : "nom",
  "email" : "email@test.fr",
  "password" : "password"
}
```
> Retour de l'api status 200 :
```json
{
  "acknowledged": true,
  "insertedId": "62bc531588d3c53177c42629"
}
```
- GET --> localhost:3001/api/utilisateurs -- Tout les utilisateurs
> Retour de l'api status 200 :
```json
[
  {
    "_id": "62bdd4f9d2df585d731bb8d0",
    "prenom": "prenom",
    "nom": "nom",
    "email": "email@test.fr",
    "password": "password"
  },
  {
    "_id": "62bdd4f9d2df585d731bb8d1",
    "prenom": "Thibault",
    "nom": "Loeuillet",
    "email": "thibault.loeuillet@andilcampus.fr",
    "password": "password"
  },
  {
    "_id": "62bdd4f9d2df585d731bb8d2",
    "prenom": "Vincent",
    "nom": "Tysseyre",
    "email": "vincent.tysseyre@andilcampus.fr",
    "password": "password"
  }
]
```
### Articles
- GET --> localhost:3001/api/articles -- Tout les articles
> Retour de l'api status 200 :
```json
[
  {
    "_id": "62bdd4f9d2df585d731bb8d3",
    "titre": "Premier article Modifié (pour tester restauration de nb_version 1)",
    "contenu": "Lorem...",
    "date_creation": "30/06/2022 à 18:53",
    "auteur": {
      "nom": "LOEUILLET",
      "prenom": "Thibault"
    },
    "image": {},
    "tags": [
      {
        "_id": "62bdd4f8d2df585d731bb8cc",
        "libelle": "Tag 1"
      },
      {
        "_id": "62bdd4f8d2df585d731bb8cd",
        "libelle": "Tag 2"
      }
    ],
    "categorie": {
      "_id": "62bdd4f8d2df585d731bb8c8",
      "libelle": "Catégorie 1"
    },
    "versions_article": [
      {
        "nb_version": 1,
        "titre": "Premier article",
        "contenu": "Lorem...",
        "date_creation": "30/06/2022 à 18:53",
        "auteur": {
          "nom": "LOEUILLET",
          "prenom": "Thibault"
        },
        "image": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Picture_icon_BLACK.svg",
        "tags": [
          {
            "_id": "62bdd4f8d2df585d731bb8cc",
            "libelle": "Tag 1"
          },
          {
            "_id": "62bdd4f8d2df585d731bb8cd",
            "libelle": "Tag 2"
          }
        ],
        "categorie": {
          "_id": "62bdd4f8d2df585d731bb8c8",
          "libelle": "Catégorie 1"
        }
      },
      {
        "nb_version": 2,
        "titre": "Premier article Modifié (pour tester restauration de nb_version 1)",
        "contenu": "Lorem...",
        "date_creation": "30/06/2022 à 18:53",
        "auteur": {
          "nom": "LOEUILLET",
          "prenom": "Thibault"
        },
        "image": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Picture_icon_BLACK.svg",
        "tags": [
          {
            "_id": "62bdd4f8d2df585d731bb8cc",
            "libelle": "Tag 1"
          },
          {
            "_id": "62bdd4f8d2df585d731bb8cd",
            "libelle": "Tag 2"
          }
        ],
        "categorie": {
          "_id": "62bdd4f8d2df585d731bb8c8",
          "libelle": "Catégorie 1"
        }
      },
      {
        "nb_version": 3,
        "titre": "Premier article Modifié (pour tester restauration de nb_version 1)",
        "contenu": "Lorem...",
        "date_creation": "30/06/2022 à 18:53",
        "auteur": {
          "nom": "LOEUILLET",
          "prenom": "Thibault"
        },
        "image": {},
        "tags": [
          {
            "_id": "62bdd4f8d2df585d731bb8cc",
            "libelle": "Tag 1"
          },
          {
            "_id": "62bdd4f8d2df585d731bb8cd",
            "libelle": "Tag 2"
          }
        ],
        "categorie": {
          "_id": "62bdd4f8d2df585d731bb8c8",
          "libelle": "Catégorie 1"
        }
      }
    ],
    "nb_total_versions": 3
  },
  {
    "_id": "62bdd4f9d2df585d731bb8d4",
    "titre": "Deuxième article",
    "contenu": "Lorem...",
    "date_creation": "30/06/2022 à 18:53",
    "auteur": {
      "nom": "TISSEYRE",
      "prenom": "Vincent"
    },
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Picture_icon_BLACK.svg",
    "tags": [
      {
        "_id": "62bdd4f8d2df585d731bb8cc",
        "libelle": "Tag 1"
      },
      {
        "_id": "62bdd4f8d2df585d731bb8cd",
        "libelle": "Tag 2"
      }
    ],
    "categorie": {
      "_id": "62bdd4f8d2df585d731bb8c9",
      "libelle": "Catégorie 2"
    },
    "versions_article": [
      {
        "nb_version": 1,
        "titre": "Deuxième article",
        "contenu": "Lorem...",
        "date_creation": "30/06/2022 à 18:53",
        "auteur": {
          "nom": "TISSEYRE",
          "prenom": "Vincent"
        },
        "image": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Picture_icon_BLACK.svg",
        "tags": [
          {
            "_id": "62bdd4f8d2df585d731bb8cc",
            "libelle": "Tag 1"
          },
          {
            "_id": "62bdd4f8d2df585d731bb8cd",
            "libelle": "Tag 2"
          }
        ],
        "categorie": {
          "_id": "62bdd4f8d2df585d731bb8c9",
          "libelle": "Catégorie 2"
        }
      }
    ],
    "nb_total_versions": 1
  },
...]
```
- GET --> localhost:3001/api/articles/:id -- Article en fonction de son id
> Retour de l'api status 200 :
```json
{
  "_id": "62bdd4f9d2df585d731bb8d4",
  "titre": "Deuxième article",
  "contenu": "Lorem...",
  "date_creation": "30/06/2022 à 18:53",
  "auteur": {
    "nom": "TISSEYRE",
    "prenom": "Vincent"
  },
  "image": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Picture_icon_BLACK.svg",
  "tags": [
    {
      "_id": "62bdd4f8d2df585d731bb8cc",
      "libelle": "Tag 1"
    },
    {
      "_id": "62bdd4f8d2df585d731bb8cd",
      "libelle": "Tag 2"
    }
  ],
  "categorie": {
    "_id": "62bdd4f8d2df585d731bb8c9",
    "libelle": "Catégorie 2"
  },
  "versions_article": [
    {
      "nb_version": 1,
      "titre": "Deuxième article",
      "contenu": "Lorem...",
      "date_creation": "30/06/2022 à 18:53",
      "auteur": {
        "nom": "TISSEYRE",
        "prenom": "Vincent"
      },
      "image": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Picture_icon_BLACK.svg",
      "tags": [
        {
          "_id": "62bdd4f8d2df585d731bb8cc",
          "libelle": "Tag 1"
        },
        {
          "_id": "62bdd4f8d2df585d731bb8cd",
          "libelle": "Tag 2"
        }
      ],
      "categorie": {
        "_id": "62bdd4f8d2df585d731bb8c9",
        "libelle": "Catégorie 2"
      }
    }
  ],
  "nb_total_versions": 1
}
```
- POST --> localhost:3001/api/articles -- Ajoute un article (date de création et nouvelle version géré automatiquement côté serveur)
> Données attendues par l'api
```json
{
  "titre": "article...",
  "contenu": "un contenu.",
  "auteur": {
    "nom": "nom",
    "prenom": "prenom"
  },
  "image": {
    "nom": "nomImage",
    "url": "url"
  },
  "tags": [{
    "_id": "62bac4c93da31a1ba2167e70",
    "libelle": "tag1"
  }],
  "categorie": {
    "_id": "62bdd2e5ee88b5b4b264e678",
    "libelle": "cetegorie 1"
  },
  "versions_article": [],
  "nb_total_versions": 0
}
```
> Retour de l'api status 200 :
```json
{
  "acknowledged": true,
  "insertedId": "62bdd319ee88b5b4b264e686"
}
```
- PUT --> localhost:3001/api/articles/:id -- Modifier un article (nouvelle version géré automatiquement côté serveur)
> Données attendues par l'api
```json
{
  "titre": "un titre...",
  "contenu": "un contenu...",
  "date_creation": "18/06/2022 à 13:42",
  "auteur": {
    "nom": "nom",
    "prenom": "prenom"
  },
  "image": {
    "nom": "nomImage",
    "url": "url"
  },
  "tags": [
    {
      "_id": "62bac98d0b166085d315669e",
      "libelle": "un libelle"
    }
  ],
  "categorie": {
    "_id": "62bac98d0b166085d315669e",
    "libelle": "categorie"
  },
  "versions_article": [
    {
      "nb_version": 1,
      "titre": "un titre",
      "contenu": "un contenu",
      "auteur": {
        "nom": "nom",
        "prenom": "prenom"
      },
      "image": {
        "nom": "nomImage",
        "url": "url"
      },
      "tags": [
        {
          "_id": "62bac98d0b166085d315669e",
          "libelle": "un libelle"
        }
      ],
      "categorie": {
        "_id": "62bac98d0b166085d315669e",
        "libelle": "categorie"
      }
    }
  ],
  "nb_total_versions": 1
}
```
> Retour de l'api status 200 :
```json
{
  "status": "200",
  "dataCategorie": {
    "acknowledged": true,
    "modifiedCount": 0,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 0
  }
}
```
- DELETE --> localhost:3001/api/articles/:id -- Supprime un article en fonction de son id
> Retour de l'api status 200 :
```json
{
  "acknowledged": true,
  "deletedCount": 1
}
```
- GET --> localhost:3001/api/articlesByCategorie/:id -- Tout les articles en fonction de l'id catégorie
> Retour de l'api status 200 :
```json
[
  {
    "_id": "62bdd4f9d2df585d731bb8d4",
    "titre": "Deuxième article",
    "contenu": "Lorem...",
    "date_creation": "30/06/2022 à 18:53",
    "auteur": {
      "nom": "TISSEYRE",
      "prenom": "Vincent"
    },
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Picture_icon_BLACK.svg",
    "tags": [
      {
        "_id": "62bdd4f8d2df585d731bb8cc",
        "libelle": "Tag 1"
      },
      {
        "_id": "62bdd4f8d2df585d731bb8cd",
        "libelle": "Tag 2"
      }
    ],
    "categorie": {
      "_id": "62bdd4f8d2df585d731bb8c9",
      "libelle": "Catégorie 2"
    },
    "versions_article": [
      {
        "nb_version": 1,
        "titre": "Deuxième article",
        "contenu": "Lorem...",
        "date_creation": "30/06/2022 à 18:53",
        "auteur": {
          "nom": "TISSEYRE",
          "prenom": "Vincent"
        },
        "image": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Picture_icon_BLACK.svg",
        "tags": [
          {
            "_id": "62bdd4f8d2df585d731bb8cc",
            "libelle": "Tag 1"
          },
          {
            "_id": "62bdd4f8d2df585d731bb8cd",
            "libelle": "Tag 2"
          }
        ],
        "categorie": {
          "_id": "62bdd4f8d2df585d731bb8c9",
          "libelle": "Catégorie 2"
        }
      }
    ],
    "nb_total_versions": 1
  }
]
```
- GET --> localhost:3001/api/articlesByTag/:id Tout les articles en fonction de l'id tag
> Retour de l'api status 200 :
```json
[
  {
    "_id": "62bdd4f9d2df585d731bb8d4",
    "titre": "Deuxième article",
    "contenu": "Lorem...",
    "date_creation": "30/06/2022 à 18:53",
    "auteur": {
      "nom": "TISSEYRE",
      "prenom": "Vincent"
    },
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Picture_icon_BLACK.svg",
    "tags": [
      {
        "_id": "62bdd4f8d2df585d731bb8cc",
        "libelle": "Tag 1"
      },
      {
        "_id": "62bdd4f8d2df585d731bb8cd",
        "libelle": "Tag 2"
      }
    ],
    "categorie": {
      "_id": "62bdd4f8d2df585d731bb8c9",
      "libelle": "Catégorie 2"
    },
    "versions_article": [
      {
        "nb_version": 1,
        "titre": "Deuxième article",
        "contenu": "Lorem...",
        "date_creation": "30/06/2022 à 18:53",
        "auteur": {
          "nom": "TISSEYRE",
          "prenom": "Vincent"
        },
        "image": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Picture_icon_BLACK.svg",
        "tags": [
          {
            "_id": "62bdd4f8d2df585d731bb8cc",
            "libelle": "Tag 1"
          },
          {
            "_id": "62bdd4f8d2df585d731bb8cd",
            "libelle": "Tag 2"
          }
        ],
        "categorie": {
          "_id": "62bdd4f8d2df585d731bb8c9",
          "libelle": "Catégorie 2"
        }
      }
    ],
    "nb_total_versions": 1
  },
...]
```
- GET --> localhost:3001/api/articlesByTitre/:titre Tout les articles en fonction du titre de l'article
> Retour de l'api status 200 :
```json
[
  {
    "_id": "62bdd4f9d2df585d731bb8d4",
    "titre": "Deuxième article",
    "contenu": "Lorem...",
    "date_creation": "30/06/2022 à 18:53",
    "auteur": {
      "nom": "TISSEYRE",
      "prenom": "Vincent"
    },
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Picture_icon_BLACK.svg",
    "tags": [
      {
        "_id": "62bdd4f8d2df585d731bb8cc",
        "libelle": "Tag 1"
      },
      {
        "_id": "62bdd4f8d2df585d731bb8cd",
        "libelle": "Tag 2"
      }
    ],
    "categorie": {
      "_id": "62bdd4f8d2df585d731bb8c9",
      "libelle": "Catégorie 2"
    },
    "versions_article": [
      {
        "nb_version": 1,
        "titre": "Deuxième article",
        "contenu": "Lorem...",
        "date_creation": "30/06/2022 à 18:53",
        "auteur": {
          "nom": "TISSEYRE",
          "prenom": "Vincent"
        },
        "image": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Picture_icon_BLACK.svg",
        "tags": [
          {
            "_id": "62bdd4f8d2df585d731bb8cc",
            "libelle": "Tag 1"
          },
          {
            "_id": "62bdd4f8d2df585d731bb8cd",
            "libelle": "Tag 2"
          }
        ],
        "categorie": {
          "_id": "62bdd4f8d2df585d731bb8c9",
          "libelle": "Catégorie 2"
        }
      }
    ],
    "nb_total_versions": 1
  },
...]
```

- POST --> localhost:3001/api/articles/restaurerVersion/:id/:nb_version -- Restaure une version en fonction de l'id article et le nb_version
> Retour de l'api status 200 :
```json
{
  "version_restaurer": true
}
```
- DELETE --> localhost:3001/api/articles/historique/:id/:nb_version -- Supprime une version en fonction de l'id article et le nb_version
> Retour de l'api status 200 :
```json
{
  "status": "200",
  "dataCategorie": {
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
  }
}
```
### Categories
- GET --> localhost:3001/api/categories -- Toutes les categories
> Retour de l'api status 200 :
```json
[
  {
    "_id": "62bdd4f8d2df585d731bb8c8",
    "libelle": "Catégorie 1"
  },
  {
    "_id": "62bdd4f8d2df585d731bb8c9",
    "libelle": "Catégorie 2"
  },
  {
    "_id": "62bdd4f8d2df585d731bb8ca",
    "libelle": "Catégorie 3"
  },
  {
    "_id": "62bdd4f8d2df585d731bb8cb",
    "libelle": "Catégorie 4"
  }
]
```
- GET --> localhost:3001/api/categories/:id -- Categorie en fonction de son id
> Retour de l'api status 200 :
```json
{
  "_id": "62bdd4f8d2df585d731bb8c8",
  "libelle": "Catégorie 1"
}
```
- POST --> localhost:3001/api/categories -- Ajoute une categories
> Données attendues par l'api
```json
{
    "libelle": "categorie"
}
```
> Retour de l'api status 200 :
```json
{
  "acknowledged": true,
  "insertedId": "62bd425740c8e8de083df644"
}
```
- PUT --> localhost:3001/api/articles/:id -- Modifie une catégorie en fonction de son id
> Données attendues par l'api
```json
{
  "libelle": "Catégorie modifié"
}
```
> Retour de l'api status 200 :
```json
{
  "status": "200",
  "dataCategorie": {
    "acknowledged": true,
    "modifiedCount": 0,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
  },
  "dataArticle": {
    "acknowledged": true,
    "modifiedCount": 2,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 2
  },
  "dataHistorique": {
    "acknowledged": true,
    "modifiedCount": 2,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 2
  }
}
```

- DELETE --> localhost:3001/api/categories/:id -- Supprime une catégorie en fonction de son id
> Retour de l'api status 200 :
```json
{
  "acknowledged": true,
  "deletedCount": 1
}
```
### Tags
- GET --> localhost:3001/api/tags -- Toutes les tags
> Retour de l'api status 200 :
```json
[
  {
    "_id": "62bdd4f8d2df585d731bb8cc",
    "libelle": "Tag 1"
  },
  {
    "_id": "62bdd4f8d2df585d731bb8cd",
    "libelle": "Tag 2"
  },
  {
    "_id": "62bdd4f8d2df585d731bb8ce",
    "libelle": "Tag 3"
  },
  {
    "_id": "62bdd4f8d2df585d731bb8cf",
    "libelle": "Tag 4"
  }
]
```
- GET --> localhost:3001/api/tags/:id -- Tag en fonction de son id
> Retour de l'api status 200 :
```json
{
  "_id": "62bdd4f8d2df585d731bb8cc",
  "libelle": "Tag 1"
}
```
- POST --> localhost:3001/api/tags -- Ajoute un tag
> Données attendues par l'api
```json
{
  "libelle": "tag"
}
```
> Retour de l'api status 200 :
```json
{
  "acknowledged": true,
  "insertedId": "62bac8f60b166085d315669c"
}
```
- PUT --> localhost:3001/api/tags/:id -- Modifie un tag en fonction de son id
> Données attendues par l'api
```json
{
  "libelle": "Tag modifié"
}
```
> Retour de l'api status 200 :
```json
{
  "status": "200",
  "dataCategorie": {
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
  },
  "dataArticle": {
    "acknowledged": true,
    "modifiedCount": 3,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 3
  },
  "dataHistorique": {
    "acknowledged": true,
    "modifiedCount": 3,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 3
  }
}
```

- DELETE --> localhost:3001/api/tags/:id -- Supprime un tag en fonction de son id
> Retour de l'api status 200 :
```json
{
  "acknowledged": true,
  "deletedCount": 1
}
```

