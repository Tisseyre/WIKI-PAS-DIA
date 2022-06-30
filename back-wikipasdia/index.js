const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
const dbname = "wiki2";
const uri = "mongodb+srv://user:AZERTY@cluster0.q5hux.mongodb.net/"+dbname+"?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const moment = require('moment');
const cors = require('cors');
const setupDB = require('./conf/setupDB');
moment.locale('fr');

app.use(express.json())
app.use(express.static(__dirname+"/public"))
app.use(cors())


client.connect( (err, client) => {
    if(err) throw err

    // let db = client.db('wiki2');
    // db.createCollection("customers", function (err, result) {
    //     if (err) throw err;
    //     console.log("database and Collection created!");
    //     client.close();
    // });

    console.log("connexion à mongo OK");
    const collectionArticles = client.db(dbname).collection("articles");
    const ObjectId = require('mongodb').ObjectId

    //setup
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
        .get((req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            collectionArticles.find({}).toArray((err, result) => {
                if(err) throw err
                // console.log(result);
                res.json(result)
            })
        })
        .post((req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            // controle des champs
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
        .get((req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            collectionArticles.findOne({_id:new ObjectId(req.params.id)}, (err, result) => {
                if(err) throw err

                res.json(result)
            })
        })
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
            }

        })

    app.route('/api/articlesByCategorie/:id')
        .get((req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            collectionArticles.find({"categorie._id" : req.params.id}).toArray((err, result) => {
                if(err) throw err
                // console.log(result);
                res.json(result)
            })
        })

    app.route('/api/articlesByTag/:id')
        .get((req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            collectionArticles.find({"tags._id" : req.params.id}).toArray((err, result) => {
                if(err) throw err
                // console.log(result);
                res.json(result)
            })
        })

    //On ignore la case
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
        .delete((req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
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
        })

    //Gestion restaurer version d'un article (id = id article)
    app.route('/api/articles/restaurerVersion/:id/:numVersion')
        .post((req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
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
        })

    //Tags
    const collectionTags = client.db(dbname).collection("tags");

    app.route('/api/tags')
        .get((req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            collectionTags.find({}).toArray((err, result) => {
                if(err) throw err
                // console.log(result);
                res.json(result)
            })
        })
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
        .get((req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            collectionTags.findOne({_id:new ObjectId(req.params.id)}, (err, result) => {
                if(err) throw err

                res.json(result)
            })
        })
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
        .put(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');

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
                    {"tags._id": new ObjectId(req.params.id)},
                    {$set : {"tags.$.libelle" : req.body.libelle}}
                    , function (err, resultArt){
                        if (err) throw err;
                        //On update les tags embarqué dans l'historique des articles
                        collectionArticles.updateMany(
                            {"versions_article.tags._id": new ObjectId(req.params.id)},
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
        })

    //Tags
    const collectionCategories = client.db(dbname).collection("categories");

    app.route('/api/categories')
        .get((req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            collectionCategories.find({}).toArray((err, result) => {
                if(err) throw err
                // console.log(result);
                res.json(result)
            })
        })
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
        .get((req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            collectionCategories.findOne({_id:new ObjectId(req.params.id)}, (err, result) => {
                if(err) throw err

                res.json(result)
            })
        })
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
        .put(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
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
                    {"categorie._id": new ObjectId(req.params.id)},
                    {$set : {"categorie.libelle" : req.body.libelle}}
                    , function (err, resultArt){
                        if (err) throw err;
                        //On update les catégories embarqué dans l'historique des articles
                        collectionArticles.updateMany(
                            {"versions_article.categorie._id": new ObjectId(req.params.id)},
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
        })

    //Utilisateurs
    const collectionUtilisateurs = client.db(dbname).collection("utilisateurs");

    app.route('/api/utilisateurs')
        .get((req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            collectionUtilisateurs.find({}).toArray((err, result) => {
                if(err) throw err
                // console.log(result);
                res.json(result)
            })
        })
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


app.listen(3000, 'localhost', function(){
    console.log("serveur lancé");
})
