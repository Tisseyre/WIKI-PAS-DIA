const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
const dbname = "wiki";
const uri = "mongodb+srv://user:AZERTY@cluster0.q5hux.mongodb.net/"+dbname+"?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const moment = require('moment');
const cors = require('cors');
const setupDB = require('./conf/setupDB');
moment.locale('fr');

app.use(express.json())
app.use(express.static(__dirname+"/public"))
//Autorise les cors
app.use(cors())

//Connexion mongo
client.connect( (err, client) => {
    if(err) throw err

    console.log("connexion à mongo OK");
    const collectionArticles = client.db(dbname).collection("articles");
    const ObjectId = require('mongodb').ObjectId

    //Route setup effaces les collections et les créer de nouveau avec remplissage des données
    app.route('/api/setup')
        .get((req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            if (setupDB(client, dbname)){
                res.json({
                    dbinit : true,
                    msg : "base de données correctement initialisé"
                })
            }else {
                res.json({
                    dbinit : false,
                    msg : "erreur lors de l'initialisation de la base de données"
                })
            }
        })


    //Articles
    app.route('/api/articles')
        //Récupère tout les articles
        .get((req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            collectionArticles.find({}).toArray((err, result) => {
                if(err) throw err
                // console.log(result);
                res.json(result)
            })
        })
        //Ajout d'un article + ajout automatique d'une nouvelle version pour l'historique
        .post((req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            // controle rapide des champs
            if (req.body.titre === undefined || req.body.contenu === undefined || req.body.auteur === undefined || req.body.image === undefined ||
                req.body.tags === undefined || req.body.categorie === undefined || req.body.versions_article === undefined || req.body.nb_total_versions === undefined ){
                res.status(400);
                // if you using view enggine
                res.json({error : "champs envoyés non valide ou manquant"});
            }else {
                let date = "";
                date += moment().format('L');
                date += " à "
                date += moment().format('LT');
                collectionArticles.insertOne({
                    titre : req.body.titre,
                    contenu : req.body.contenu,
                    date_creation : date,
                    auteur : req.body.auteur,
                    image: req.body.image,
                    tags: req.body.tags,
                    categorie: req.body.categorie,
                    versions_article: [
                        {
                            nb_version : 1,
                            titre : req.body.titre,
                            contenu : req.body.contenu,
                            date_creation : date,
                            auteur : req.body.auteur,
                            image: req.body.image,
                            tags: req.body.tags,
                            categorie: req.body.categorie
                        }
                    ],
                    nb_total_versions : 1
                }, (err, result) => {
                    if(err) throw err
                    res.json(result)
                })
            }
        })
    app.route('/api/articles/:id')
        //Récupère un article en fonction de son id
        .get((req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
                try{
                    collectionArticles.findOne({_id:new ObjectId(req.params.id)}, (err, result) => {
                        if(err) throw err
                        res.json(result)
                })
            }catch (e){
                res.status(400);
                res.json({error : "Erreur id en paramettre non correct"});
            }
        })
        //Supprime un article en fonction de son id
        .delete((req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            try{
                collectionArticles.deleteOne({_id:new ObjectId(req.params.id)}, (err, result) => {
                    if(err) throw err
                    res.json(result)
                })
            }catch (e){
                res.status(400);
                res.json({error : "Erreur id en paramettre non correct"});
            }

        })
        //Modifie une article + ajoute une nouvelle version de l'article modifié pour l'historique
        .put(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            // controle des champs
            if (req.body.titre === undefined || req.body.contenu === undefined || req.body.auteur === undefined || req.body.image === undefined ||
                req.body.tags === undefined || req.body.categorie === undefined || req.body.versions_article === undefined || req.body.nb_total_versions === undefined ||
                req.body.date_creation === undefined){
                res.status(400);
                // if you using view enggine
                res.json({error : "champs envoyés non valide ou manquant"});
            }else{
                try{
                    collectionArticles.updateOne({
                        _id: new ObjectId(req.params.id) // _id n'est pas qu'une clé
                    }, {
                        $set: {
                            titre : req.body.titre,
                            contenu : req.body.contenu,
                            date_creation : req.body.date_creation,
                            auteur : req.body.auteur,
                            image: req.body.image,
                            tags: req.body.tags,
                            categorie: req.body.categorie,
                            nb_total_versions : req.body.nb_total_versions + 1
                        },
                        $push: {
                            versions_article:
                                {
                                    nb_version : req.body.nb_total_versions + 1,
                                    titre : req.body.titre,
                                    contenu : req.body.contenu,
                                    date_creation : req.body.date_creation,
                                    auteur : req.body.auteur,
                                    image: req.body.image,
                                    tags: req.body.tags,
                                    categorie: req.body.categorie
                                }
                        }
                    }, function (err, result) {
                        if (err) throw err;

                        res.json({
                            status: "200",
                            dataCategorie: result,
                        });
                    });
                }catch (e){
                    res.status(400);
                    res.json({error : "Erreur id en paramettre non correct"});
                }
            }

        })
    //Récupère les articles en fonction de l'id de la catégorie
    app.route('/api/articlesByCategorie/:id')
        .get((req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            try{
                collectionArticles.find({"categorie._id" : req.params.id}).toArray((err, result) => {
                    if(err) throw err
                    // console.log(result);
                    res.json(result)
                })
            }catch (e){
                res.status(400);
                res.json({error : "Erreur id en paramettre non correct"});
            }
        })
    //Récupère les articles en fonction de l'id du tag
    app.route('/api/articlesByTag/:id')
        .get((req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            try{
                collectionArticles.find({"tags._id" : req.params.id}).toArray((err, result) => {
                    if(err) throw err
                    // console.log(result);
                    res.json(result)
                })
            }catch (e){
                res.status(400);
                res.json({error : "Erreur id en paramettre non correct"});
            }
        })

    //Récupère les articles en fonction du titre (On ignore la case)
    app.route('/api/articlesByTitre/:titre')
        .get((req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            collectionArticles.find({"titre" : { $regex : req.params.titre, $options: "i" }}).toArray((err, result) => {
                if(err) throw err
                // console.log(result);
                res.json(result)
            })
        })

    //Gestion historique d'un article (id = id article)
    app.route('/api/articles/historique/:id/:numVersion')
        //Suppression d'une version de l'article
        .delete((req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            try{
                collectionArticles.updateOne({
                    _id: new ObjectId(req.params.id) // _id n'est pas qu'une clé
                }, {
                    $pull : {"versions_article" : { "nb_version" : parseInt(req.params.numVersion)}}
                }, function (err, result) {
                    if (err) throw err;

                    res.json({
                        status: "200",
                        dataCategorie: result,
                    });
                });
            }catch (e){
                res.status(400);
                res.json({error : "Erreur id en paramettre non correct"});
            }
        })

    //Gestion restaurer version d'un article (id = id article)
    app.route('/api/articles/restaurerVersion/:id/:numVersion')
        //Restaure une version de l'article en fonction de l'id de l'article et son numéro de version souhaité
        .post((req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            try{
                collectionArticles.findOne({_id:new ObjectId(req.params.id)}, (err, result) => {
                    if(err) throw err
                    let versionTrouve = false;
                    result.versions_article.forEach(function (item, index){
                        if (item.nb_version == req.params.numVersion){
                            versionTrouve = true
                            //faire la restauration
                            collectionArticles.updateOne({
                                _id: new ObjectId(req.params.id) // _id n'est pas qu'une clé
                            }, {
                                $set: {
                                    titre : item.titre,
                                    contenu : item.contenu,
                                    date_creation : item.date_creation,
                                    auteur : item.auteur,
                                    image: item.image,
                                    tags: item.tags,
                                    categorie: item.categorie
                                }
                            })
                        }
                    })
                    if (!versionTrouve){
                        res.status(400)
                        res.json({version_restaurer : false, msgErr : "numVersion introuvable"})
                    }else {
                        res.json({version_restaurer : true})
                    }
                })
            }catch (e){
                res.status(400);
                res.json({error : "Erreur id en paramettre non correct"});
            }
        })

    //Tags
    const collectionTags = client.db(dbname).collection("tags");

    app.route('/api/tags')
        //Récupère tout les tags
        .get((req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            collectionTags.find({}).toArray((err, result) => {
                if(err) throw err
                // console.log(result);
                res.json(result)
            })
        })
        //Ajoute un nouveau tag
        .post((req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            // controle des champs
            if (req.body.libelle === undefined) {
                res.status(400);
                // if you using view enggine
                res.json({error: "champs envoyés non valide ou manquant"});
            }else{
                collectionTags.insertOne({
                    libelle: req.body.libelle,
                }, (err, result) => {
                    if (err) throw err
                    res.json(result)
                })
            }
        })

    app.route('/api/tags/:id')
        //Récupère un tag en fonction de ton id
        .get((req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            try{
                collectionTags.findOne({_id:new ObjectId(req.params.id)}, (err, result) => {
                    if(err) throw err

                    res.json(result)
                })
            }catch (e){
                res.status(400);
                res.json({error : "Erreur id en paramettre non correct"});
            }
        })
        //Supprime un tag en fonction de son id
        .delete((req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            try{
                collectionTags.deleteOne({_id:new ObjectId(req.params.id)}, (err, result) => {
                    if(err) throw err
                    res.json(result)
                })
            }catch (e){
                res.status(400);
                res.json({error : "Erreur id en paramettre non correct"});
            }

        })
        //Modifie un tag en fonction de son id (la modification est reporté sur les tags embarqué dans les articles
        .put(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            try{
                collectionTags.updateOne({
                    _id: new ObjectId(req.params.id) // _id n'est pas qu'une clé
                }, {
                    $set: {
                        libelle: req.body.libelle
                    }
                }, function (err, resultCat) {
                    if (err) throw err;
                    //On update les tag embarqué dans les articles
                    collectionArticles.updateMany(
                        {"tags._id": req.params.id},
                        {$set : {"tags.$.libelle" : req.body.libelle}}
                        , function (err, resultArt){
                            if (err) throw err;
                            //On update les tags embarqué dans l'historique des articles
                            collectionArticles.updateMany(
                                {"versions_article.tags._id": req.params.id},
                                {$set : {"versions_article.$[].tags.$.libelle" : req.body.libelle}}
                                , function (err, resultHist){
                                    if (err) throw err;
                                    res.json({
                                        status: "200",
                                        dataCategorie: resultCat,
                                        dataArticle: resultArt,
                                        dataHistorique: resultHist
                                    });
                                })
                        }
                    )
                });
            }catch (e){
                res.status(400);
                res.json({error : "Erreur id en paramettre non correct"});
            }

        })

    //Catégories
    const collectionCategories = client.db(dbname).collection("categories");
    app.route('/api/categories')
        //Récupère toutes les catégories
        .get((req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            collectionCategories.find({}).toArray((err, result) => {
                if(err) throw err
                // console.log(result);
                res.json(result)
            })
        })
        //Ajoute une catégorie
        .post((req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            // controle des champs
            if (req.body.libelle === undefined) {
                res.status(400);
                // if you using view enggine
                res.json({error: "champs envoyés non valide ou manquant"});
            }else{
                collectionCategories.insertOne({
                    libelle: req.body.libelle,
                }, (err, result) => {
                    if (err) throw err
                    res.json(result)
                })
            }
        })

    app.route('/api/categories/:id')
        //Récupère une catégorie en fonction de son id
        .get((req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            try{
                collectionCategories.findOne({_id:new ObjectId(req.params.id)}, (err, result) => {
                    if(err) throw err

                    res.json(result)
                })
            }catch (e){
                res.status(400);
                res.json({error : "Erreur id en paramettre non correct"});
            }
        })
        //Supprime une catégorie en fonction de son id
        .delete((req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            try{
                collectionCategories.deleteOne({_id:new ObjectId(req.params.id)}, (err, result) => {
                    if(err) throw err
                    res.json(result)
                })
            }catch (e){
                res.status(400);
                res.json({error : "Erreur id en paramettre non correct"});
            }

        })
        //Modifie une catégorie en fonction de son id (la modification est reporté sur la catégorie embarqué dans les articles
        .put(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            try{
                collectionCategories.updateOne({
                    _id: new ObjectId(req.params.id) // _id n'est pas qu'une clé
                }, {
                    $set: {
                        libelle: req.body.libelle
                    }
                }, function (err, resultCat) {
                    if (err) throw err;
                    //On update les catégories embarqué dans les articles
                    collectionArticles.updateMany(
                        {"categorie._id": req.params.id},
                        {$set : {"categorie.libelle" : req.body.libelle}}
                        , function (err, resultArt){
                            if (err) throw err;
                            //On update les catégories embarqué dans l'historique des articles
                            collectionArticles.updateMany(
                                {"versions_article.categorie._id": req.params.id},
                                {$set : {"versions_article.$[].categorie.libelle" : req.body.libelle}}
                                , function (err, resultHist){
                                    if (err) throw err;
                                    res.json({
                                        status: "200",
                                        dataCategorie: resultCat,
                                        dataArticle: resultArt,
                                        dataHistorique: resultHist
                                    });
                                })
                        }
                    )
                });
            }catch (e){
                res.status(400);
                res.json({error : "Erreur id en paramettre non correct"});
            }
        })

    //Utilisateurs
    const collectionUtilisateurs = client.db(dbname).collection("utilisateurs");

    app.route('/api/utilisateurs')
        //Récupère tout les utilisateurs
        .get((req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            collectionUtilisateurs.find({}).toArray((err, result) => {
                if(err) throw err
                // console.log(result);
                res.json(result)
            })
        })
        //Ajout d'un utilisateur (inscription)
        .post((req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            // controle des champs
            if (req.body.prenom === undefined || req.body.nom === undefined || req.body.email === undefined || req.body.password === undefined) {
                res.status(400);
                // if you using view enggine
                res.json({error: "champs envoyés non valide ou manquant"});
            }else{
                collectionUtilisateurs.insertOne({
                    prenom: req.body.prenom,
                    nom: req.body.nom,
                    email: req.body.email,
                    password: req.body.password,
                }, (err, result) => {
                    if (err) throw err
                    res.json(result)
                })
            }
        })

    app.route('/api/login')
        //Route pour la connexion si le login et email match alors la connexion est a true
        .post((req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            collectionUtilisateurs.findOne({email : req.body.email, password : req.body.password}, (err, result) => {
                if(err) throw err
                if (result == null){
                    res.json({
                        connexion : false,
                        msg : "identifiant inconnu ou mot de passe incorrect"
                    })
                }else {
                    res.json({
                        connexion : true,
                        msg : "connexion réussie"
                    })
                }
            })
        })
})

//
app.listen(3001, 'localhost', function(){
    console.log("serveur lancé sur http://localhost:3001/ pensez à importer le fichier insomnia pour tester rapidement l'api ;) ");
})
