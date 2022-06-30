import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Create() {
    const titre = useRef();
    const contenu = useRef();
    const imgName = useRef();
    const imgURL = useRef();
    const categorie = useRef();
    const navigate = useNavigate();

    const [tag, setTag] = useState([]);

    const [categories, setCategories] = useState(null);
    const [tags, setTags] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3001/api/categories").then((response) => {
            setCategories(response.data);
        });
        axios.get("http://localhost:3001/api/tags").then((response) => {
            setTags(response.data);
        });
    }, []);

    if (!categories) return null;
    if (!tags) return null;


    const handleTagChange = (e) => {
        let value = Array.from(e.target.selectedOptions, option => option.value);
        setTag(value);
    }

    const handleSubmit = function (e) {
        e.preventDefault();

        /*console.log(titre.current.value);
        console.log(contenu.current.value);
        console.log(imgName.current.value);
        console.log(imgURL.current.value);
        console.log(categorie.current.value);
        console.log(tag);*/

        let categ = null;
        let postTag = [];
        categories.map((item, index) => {
            if(item._id == categorie.current.value) {
                categ = item;
            }
        })

        tags.map((item, index) => {
            tag.map((item2, index2) => {
                if(item._id == item2) {
                    postTag.push(item);
                }
            });
            
        })

        axios
        .post("http://localhost:3001/api/articles", {
            "titre": titre.current.value,
            "contenu": contenu.current.value,
            "auteur": {
                "nom": "nom 3",
                "prenom": "prenom 3"
            },
            "image": {
                "nom": imgName.current.value,
                "url": imgURL.current.value
            },
            "tags": postTag,
            "categorie": {
                "_id": categ._id,
                "libelle": categ.libelle
            },
            "versions_article": [],
            "nb_total_versions": 0
        })
        .then((response) => {
            navigate('/articles');
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1 className='text-center my-4'>Création d'un article</h1>
                <div className='row'>
                    <div className='col-md-8'>
                        <div className='row'>
                            <div className='col-md-12 form-group my-3'>
                                <label className='form-label'>Titre</label>
                                <input type="text" className='form-control' ref={titre} />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6 form-group my-3'>
                                <label className='form-label'>Nom de l'image</label>
                                <input type="text" ref={imgName} className='form-control' />
                            </div>
                            <div className='col-md-6 form-group my-3'>
                                <label className='form-label'>URL de l'image</label>
                                <input type="text" ref={imgURL} className='form-control' />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-12 form-group my-3'>
                                <label className='form-label'>Contenu</label>
                                <textarea className='form-control' ref={contenu} rows="10"></textarea>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='form-group my-3'>
                            <label className='form-label'>Catégorie</label>
                            <select ref={categorie} className='form-control'>
                                {
                                    categories.map((item, index) => {
                                        return (
                                            <option key={index} value={item._id}>{item.libelle}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='form-group my-3'>
                            <fieldset>
                                <label className='form-label'>Tags</label>
                                <select onChange={handleTagChange} multiple className='form-control'>
                                    {
                                        tags.map((item, index) => {
                                            return (
                                                <option key={index} value={item._id}>{item.libelle}</option>
                                            )
                                        })
                                    }
                                </select>
                            </fieldset>
                        </div>
                    </div>
                </div>
                <button className='btn btn-primary'>Ajouter</button>
                <input type="reset" value="Annuler" className='btn btn-secondary mx-3' />
            </form>
        </div>
    );
}
