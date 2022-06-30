# WIKI-PAS-DIA (Back) -- Par Thibault LOEUILLET

## Instructions temporaires pour lancer le projet test :

    - ce déplacer dans le dossier back-wikipasdia
    - npm install
    - node index.js

## Routes gérées par l'api

### Setup 

```json
    GET --> localhost:3001/api/login -- Initialise la base de données
        
    Retour de l api status 200 : 
    {
        "dbinit" : true,
        "msg" : "base de données correctement initialisé"
    }
```

