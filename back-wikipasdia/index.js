const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
const uri = "mongodb+srv://user:AZERTY@cluster0.q5hux.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


app.use(express.json())
app.use(express.static(__dirname+"/public"))



client.connect( (err, client) => {
    if(err) throw err

    console.log("connexion à mongo OK");
    const collectionArticles = client.db("wiki").collection("articles");
    const ObjectId = require('mongodb').ObjectId
    //Articles
    app.route('/api/articles')
        .get((req, res) => {
            collectionArticles.find({}).toArray((err, result) => {
                if(err) throw err
                // console.log(result);
                res.json(result)
            })
        })
        .post((req, res) => {
            // controle des champs
            if (req.body.titre === undefined || req.body.contenu === undefined || req.body.auteur === undefined || req.body.image === undefined ||
                req.body.tags === undefined || req.body.categorie === undefined || req.body.versions_article === undefined || req.body.nb_total_versions === undefined ){
                res.status(400);
                // if you using view enggine
                res.json({error : "champs envoyés non valide ou manquant"});
            }else {
                collectionArticles.insertOne({
                    titre : req.body.titre,
                    contenu : req.body.contenu,
                    auteur : req.body.auteur,
                    image: req.body.image,
                    tags: req.body.tags,
                    categorie: req.body.categorie,
                    versions_article: [
                        {
                            nb_version : 1,
                            titre : req.body.titre,
                            contenu : req.body.contenu,
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
        // .get((req, res) => {
        //     collection.findOne({_id:new ObjectId(req.params.id)}, (err, result) => {
        //         if(err) throw err
        //
        //         res.json(result)
        //     })
        // })
        .delete((req, res) => {
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

    //Tags
    const collectionTags = client.db("wiki").collection("tags");

    app.route('/api/tags')
        .get((req, res) => {
            collectionTags.find({}).toArray((err, result) => {
                if(err) throw err
                // console.log(result);
                res.json(result)
            })
        })
        .post((req, res) => {
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
        // .get((req, res) => {
        //     collection.findOne({_id:new ObjectId(req.params.id)}, (err, result) => {
        //         if(err) throw err
        //
        //         res.json(result)
        //     })
        // })
        .delete((req, res) => {
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

    //Tags
    const collectionCategories = client.db("wiki").collection("categories");

    app.route('/api/categories')
        .get((req, res) => {
            collectionCategories.find({}).toArray((err, result) => {
                if(err) throw err
                // console.log(result);
                res.json(result)
            })
        })
        .post((req, res) => {
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
        // .get((req, res) => {
        //     collection.findOne({_id:new ObjectId(req.params.id)}, (err, result) => {
        //         if(err) throw err
        //
        //         res.json(result)
        //     })
        // })
        .delete((req, res) => {
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
})


app.listen(3000, 'localhost', function(){
    console.log("serveur lancé");
})
