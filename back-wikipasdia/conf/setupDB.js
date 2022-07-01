const moment = require("moment");
const {ObjectId} = require("mongodb");
const loremText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam suscipit sapien sed euismod tincidunt. Nulla nec tincidunt lectus. Morbi mattis lobortis neque non lacinia. Proin lacinia, diam eget porta laoreet, nulla elit sollicitudin nunc, sit amet ultricies mauris ipsum in urna. Nulla sed metus venenatis est tempus interdum. Quisque feugiat nibh non lacus vestibulum eleifend. Nullam maximus turpis a suscipit lobortis. Nunc scelerisque blandit risus feugiat finibus. Vestibulum efficitur, magna ut tincidunt suscipit, felis nibh dapibus dolor, vitae tincidunt velit erat in metus. Duis congue, ipsum vel tempus vulputate, mi risus iaculis massa, at rutrum mauris turpis et velit. Etiam molestie dignissim finibus.\n" +
    "\n" +
    "Mauris sit amet massa vitae eros semper ultricies in a massa. Sed vel eros a erat faucibus maximus in at erat. Nullam hendrerit orci nulla, vitae fermentum turpis porttitor vitae. Fusce quis auctor leo. Praesent mi velit, sodales nec tincidunt vel, tempor non ex. Etiam sapien ante, viverra vel metus id, malesuada interdum ligula. Pellentesque cursus ipsum id magna dapibus, sit amet tristique est tempor. Aliquam facilisis ex et convallis consectetur. Curabitur a neque feugiat, cursus lectus fringilla, porta nisi. Integer pulvinar sollicitudin lorem, non ornare nulla bibendum in. Sed rutrum, mi eu varius molestie, elit arcu consequat libero, sed semper elit ipsum ac leo. Donec congue sollicitudin mattis. Morbi consectetur felis in rutrum mollis.\n" +
    "\n" +
    "Nunc condimentum leo eu blandit fringilla. Nunc auctor at purus ut malesuada. Integer suscipit sit amet mauris eget porttitor. Donec nulla ipsum, aliquet id molestie a, lobortis quis dui. Cras molestie, nunc sit amet viverra ullamcorper, ante nisi rutrum justo, in vulputate metus neque vitae odio. Nam congue varius sem, ac varius urna ullamcorper sed. Quisque vitae lorem eget augue tempor sodales. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras in elit ultrices, semper purus eget, cursus tellus. In hac habitasse platea dictumst. Aenean blandit ipsum ac quam volutpat fermentum. Phasellus consequat id velit vitae pretium. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In laoreet placerat faucibus.\n" +
    "\n" +
    "Proin pellentesque, turpis sed luctus commodo, eros lectus rutrum sapien, a eleifend purus diam sed justo. Curabitur nec nibh purus. Duis justo magna, pulvinar quis varius quis, ornare id mauris. Sed at leo condimentum, viverra dui vitae, luctus ante. Nunc molestie, nibh sit amet tincidunt venenatis, massa nunc commodo sem, eget faucibus odio lacus eget diam. Etiam urna nisi, imperdiet sit amet metus ut, tincidunt eleifend dolor. Aenean feugiat velit vel nisi euismod, sed volutpat sapien sodales. Morbi nec urna lacus. Sed hendrerit cursus leo ut vulputate.\n" +
    "\n" +
    "In porta nisi quis velit pretium placerat nec in dolor. Suspendisse maximus orci ut facilisis convallis. Nulla arcu erat, pulvinar a purus in, scelerisque mollis dolor. Proin a tincidunt orci, at finibus dolor. Aliquam tincidunt molestie odio quis cursus. Mauris et ante vel dui tempor blandit eu quis dui. Suspendisse dignissim ligula non interdum consectetur. Proin sed tortor dui. Duis vitae sapien cursus, lobortis enim vitae, gravida nibh. Integer sagittis porttitor eros vitae pretium. Nulla congue blandit nunc, nec consectetur ante congue vitae.";
const defaultUrlImg = {
    nom : "image par default",
    url : "https://upload.wikimedia.org/wikipedia/commons/6/6b/Picture_icon_BLACK.svg"
};

module.exports = function (client, dbname){

    let db = client.db(dbname);
    //Drop and create
    //On effaces les collections et les créer de nouveau avec remplissage des données
    //Suppression
    db.collection("articles").drop(function(err, result) {
        db.collection("tags").drop(function(err, result) {
            db.collection("categories").drop(function(err, result) {
                db.collection("utilisateurs").drop(function(err, result) {
                    //Création des collections
                    db.createCollection("articles", function (err, result) {
                        if (err) throw err;
                        console.log("database "+dbname+" créée "+" collection articles créée");
                        db.createCollection("categories", function (err, result) {
                            if (err) throw err;
                            console.log("collection categories créée");
                            db.createCollection("tags", function (err, result) {
                                if (err) throw err;
                                console.log("collection tags créée");
                                db.createCollection("utilisateurs", function (err, result) {
                                    if (err) throw err;
                                    console.log("collection utilisateurs créée");
                                    const collectionCategories = client.db(dbname).collection("categories");
                                    //Remplissage categories
                                    let cat1Id = null;
                                    collectionCategories.insertOne({
                                        libelle: "Catégorie 1",
                                    }, (err, result) => {
                                        if (err) throw err
                                        cat1Id = result.insertedId
                                        let cat2Id = null;
                                        collectionCategories.insertOne({
                                            libelle: "Catégorie 2",
                                        }, (err, result) => {
                                            if (err) throw err
                                            cat2Id = result.insertedId;
                                            let cat3Id = null;
                                            collectionCategories.insertOne({
                                                libelle: "Catégorie 3",
                                            }, (err, result) => {
                                                if (err) throw err
                                                cat3Id = result.insertedId;
                                                let cat4Id = null;
                                                collectionCategories.insertOne({
                                                    libelle: "Catégorie 4",
                                                }, (err, result) => {
                                                    if (err) throw err
                                                    cat4Id = result.insertedId;
                                                    const collectionTags = client.db(dbname).collection("tags");
                                                    //Remplissage tags
                                                    let tag1Id = null;
                                                    collectionTags.insertOne({
                                                        libelle: "Tag 1",
                                                    }, (err, result) => {
                                                        if (err) throw err
                                                        tag1Id = result.insertedId;
                                                        let tag2Id = null;
                                                        collectionTags.insertOne({
                                                            libelle: "Tag 2",
                                                        }, (err, result) => {
                                                            if (err) throw err
                                                            tag2Id = result.insertedId;
                                                            let tag3Id = null;
                                                            collectionTags.insertOne({
                                                                libelle: "Tag 3",
                                                            }, (err, result) => {
                                                                if (err) throw err
                                                                tag3Id = result.insertedId;
                                                                let tag4Id = null;
                                                                collectionTags.insertOne({
                                                                    libelle: "Tag 4",
                                                                }, (err, result) => {
                                                                    if (err) throw err
                                                                    tag4Id = result.insertedId;
                                                                    //Remplissage utilisateurs
                                                                    const collectionUtilisateurs = client.db(dbname).collection("utilisateurs");
                                                                    collectionUtilisateurs.insertMany([
                                                                        {
                                                                            prenom : "prenom",
                                                                            nom : "nom",
                                                                            email : "email@test.fr",
                                                                            password : "password"
                                                                        },
                                                                        {
                                                                            prenom : "Thibault",
                                                                            nom : "Loeuillet",
                                                                            email : "thibault.loeuillet@andilcampus.fr",
                                                                            password : "password"
                                                                        },
                                                                        {
                                                                            prenom : "Vincent",
                                                                            nom : "Tisseyre",
                                                                            email : "vincent.tisseyre@andilcampus.fr",
                                                                            password : "password"
                                                                        }
                                                                    ]);
                                                                    const collectionArticles = client.db(dbname).collection("articles");
                                                                    //Remplissage articles
                                                                    let date = "";
                                                                    date += moment().format('L');
                                                                    date += " à "
                                                                    date += moment().format('LT');
                                                                    collectionArticles.insertMany([
                                                                        {
                                                                            titre : "Premier article Modifié (pour tester restauration de nb_version 1)",
                                                                            contenu : loremText,
                                                                            date_creation : date,
                                                                            auteur : {
                                                                                nom : "LOEUILLET",
                                                                                prenom : "Thibault"
                                                                            },
                                                                            image: defaultUrlImg,
                                                                            tags: [
                                                                                {
                                                                                    _id : tag1Id.toString(),
                                                                                    libelle : "Tag 1",
                                                                                },
                                                                                {
                                                                                    _id : tag2Id.toString(),
                                                                                    libelle : "Tag 2",
                                                                                }],
                                                                            categorie: {
                                                                                _id : cat1Id.toString(),
                                                                                libelle : "Catégorie 1"
                                                                            },
                                                                            versions_article: [
                                                                                {
                                                                                    nb_version : 1,
                                                                                    titre : "Premier article",
                                                                                    contenu : loremText,
                                                                                    date_creation : date,
                                                                                    auteur : {
                                                                                        nom : "LOEUILLET",
                                                                                        prenom : "Thibault"
                                                                                    },
                                                                                    image: defaultUrlImg,
                                                                                    tags: [
                                                                                        {
                                                                                            _id : tag1Id.toString(),
                                                                                            libelle : "Tag 1",
                                                                                        },
                                                                                        {
                                                                                            _id : tag2Id.toString(),
                                                                                            libelle : "Tag 2",
                                                                                        }],
                                                                                    categorie: {
                                                                                        _id : cat1Id.toString(),
                                                                                        libelle : "Catégorie 1"
                                                                                    }
                                                                                },
                                                                                {
                                                                                    nb_version : 2,
                                                                                    titre : "Premier article Modifié (pour tester restauration de nb_version 1)",
                                                                                    contenu : loremText,
                                                                                    date_creation : date,
                                                                                    auteur : {
                                                                                        nom : "LOEUILLET",
                                                                                        prenom : "Thibault"
                                                                                    },
                                                                                    image: defaultUrlImg,
                                                                                    tags: [
                                                                                        {
                                                                                            _id : tag1Id.toString(),
                                                                                            libelle : "Tag 1",
                                                                                        },
                                                                                        {
                                                                                            _id : tag2Id.toString(),
                                                                                            libelle : "Tag 2",
                                                                                        }],
                                                                                    categorie: {
                                                                                        _id : cat1Id.toString(),
                                                                                        libelle : "Catégorie 1"
                                                                                    }
                                                                                }
                                                                            ],
                                                                            nb_total_versions : 2
                                                                        },
                                                                        {
                                                                            titre : "Deuxième article",
                                                                            contenu : loremText,
                                                                            date_creation : date,
                                                                            auteur : {
                                                                                nom : "TISSEYRE",
                                                                                prenom : "Vincent"
                                                                            },
                                                                            image: defaultUrlImg,
                                                                            tags: [
                                                                                {
                                                                                    _id : tag1Id.toString(),
                                                                                    libelle : "Tag 1",
                                                                                },
                                                                                {
                                                                                    _id : tag2Id.toString(),
                                                                                    libelle : "Tag 2",
                                                                                }],
                                                                            categorie: {
                                                                                _id : cat2Id.toString(),
                                                                                libelle : "Catégorie 2"
                                                                            },
                                                                            versions_article: [
                                                                                {
                                                                                    nb_version : 1,
                                                                                    titre : "Deuxième article",
                                                                                    contenu : loremText,
                                                                                    date_creation : date,
                                                                                    auteur : {
                                                                                        nom : "TISSEYRE",
                                                                                        prenom : "Vincent"
                                                                                    },
                                                                                    image: defaultUrlImg,
                                                                                    tags: [
                                                                                        {
                                                                                            _id : tag1Id.toString(),
                                                                                            libelle : "Tag 1",
                                                                                        },
                                                                                        {
                                                                                            _id : tag2Id.toString(),
                                                                                            libelle : "Tag 2",
                                                                                        }],
                                                                                    categorie: {
                                                                                        _id : cat2Id.toString(),
                                                                                        libelle : "Catégorie 2"
                                                                                    }
                                                                                }
                                                                            ],
                                                                            nb_total_versions : 1
                                                                        },
                                                                        {
                                                                            titre : "Troisième article",
                                                                            contenu : loremText,
                                                                            date_creation : date,
                                                                            auteur : {
                                                                                nom : "HEGUY",
                                                                                prenom : "Olivier"
                                                                            },
                                                                            image: defaultUrlImg,
                                                                            tags: [
                                                                                {
                                                                                    _id : tag1Id.toString(),
                                                                                    libelle : "Tag 1",
                                                                                },
                                                                                {
                                                                                    _id : tag2Id.toString(),
                                                                                    libelle : "Tag 2",
                                                                                }],
                                                                            categorie: {
                                                                                _id : cat3Id.toString(),
                                                                                libelle : "Catégorie 3"
                                                                            },
                                                                            versions_article: [
                                                                                {
                                                                                    nb_version : 1,
                                                                                    titre : "Troisième article",
                                                                                    contenu : loremText,
                                                                                    date_creation : date,
                                                                                    auteur : {
                                                                                        nom : "HEGUY",
                                                                                        prenom : "Olivier"
                                                                                    },
                                                                                    image: defaultUrlImg,
                                                                                    tags: [
                                                                                        {
                                                                                            _id : tag1Id.toString(),
                                                                                            libelle : "Tag 1",
                                                                                        },
                                                                                        {
                                                                                            _id : tag2Id.toString(),
                                                                                            libelle : "Tag 2",
                                                                                        }],
                                                                                    categorie: {
                                                                                        _id : cat3Id.toString(),
                                                                                        libelle : "Catégorie 3"
                                                                                    }
                                                                                }
                                                                            ],
                                                                            nb_total_versions : 1
                                                                        }
                                                                    ])
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                });
                            });
                        });
                    });
                })
            })
        })
    })

    return true;
}

