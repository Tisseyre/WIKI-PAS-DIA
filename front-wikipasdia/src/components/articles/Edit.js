import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function Edit() {
    const [titre, setTitre] = useState();
    const [contenu, setContenu] = useState();
    const [imgName, setImgName] = useState();
    const [imgURL, setImgURL] = useState();

    const categorie = useRef();
    const navigate = useNavigate();

    const [tag, setTag] = useState([]);

    const params = useParams()
    const [categories, setCategories] = useState(null);
    const [tags, setTags] = useState(null);
    const [article, setArticle] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3001/api/articles/"+params.id).then((response) => {
            setArticle(response.data);
            setTitre(response.data.titre);
            setContenu(response.data.contenu);
            setImgName(response.data.image.nom);
            setImgURL(response.data.image.url);
        });
        axios.get("http://localhost:3001/api/categories").then((response) => {
            setCategories(response.data);
        });
        axios.get("http://localhost:3001/api/tags").then((response) => {
            setTags(response.data);
        });
    }, [params.id]);

    if (!article) return null;
    if (!categories) return null;
    if (!tags) return null;
    

    const handleTagChange = (e) => {
        let value = Array.from(e.target.selectedOptions, option => option.value);
        setTag(value);
    }

    const handleSubmit = function (e) {
        e.preventDefault();

        let categ = null;
        let postTag = [];

        for (let i = 0; i < categories.length; i++) {
            if(categorie.current.value === categories[i]._id) {
                categ = categories[i];
            }
        }

        for (let i = 0; i < tags.length; i++) {
            for (let j = 0; j < tag.length; j++) {
                if(tags[i]._id === tag[j]) {
                    postTag.push(tags[i]);
                }
            }
        }

        axios
        .put("http://localhost:3001/api/articles/"+params.id, {
            "titre": titre,
            "contenu": contenu,
            "date_creation": article.date_creation,
            "auteur": article.auteur,
            "image": {
                "nom": imgName,
                "url": imgURL
            },
            "tags": postTag,
            "categorie": {
                "_id": categ._id,
                "libelle": categ.libelle
            },
            "versions_article": article.versions_article,
            "nb_total_versions": article.nb_total_versions
        })
        .then((response) => {
            navigate('/articles');
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1 className='text-center my-4'>Modification d'un article</h1>
                <div className='row'>
                    <div className='col-md-8'>
                        <div className='row'>
                            <div className='col-md-12 form-group my-3'>
                                <label className='form-label'>Titre</label>
                                <input type="text" value={titre} className='form-control' onChange={ (e) => {setTitre(e.target.value)}} />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6 form-group my-3'>
                                <label className='form-label'>Nom de l'image</label>
                                <input type="text" value={imgName} onChange={ (e) => {setImgName(e.target.value)}} className='form-control' />
                            </div>
                            <div className='col-md-6 form-group my-3'>
                                <label className='form-label'>URL de l'image</label>
                                <input type="text" value={imgURL} onChange={ (e) => {setImgURL(e.target.value)}} className='form-control' />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-12 form-group my-3'>
                                <label className='form-label'>Contenu</label>
                                <textarea className='form-control' value={contenu} onChange={ (e) => {setContenu(e.target.value)}} rows="10"></textarea>
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
