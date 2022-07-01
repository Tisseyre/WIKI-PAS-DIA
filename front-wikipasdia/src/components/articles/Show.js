import React, {useState, useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from 'axios';

export default function Show() {
    const params = useParams()
    const [article, setArticle] = useState(null);
    const [isCollapsed, setIsCollapsed] = useState(true);
    var isConnected = (sessionStorage.getItem("isConnected") === 'true');

    // Récupération de l'article demandée
    useEffect(() => {
        axios.get("http://localhost:3001/api/articles/"+params.id).then((response) => {
            setArticle(response.data);
        });
    }, [params.id]);

    if (!article) return null;

    // Fonction pour changer la version d'un article
    const updateVersion = (numVersion) => {
        axios
        .post("http://localhost:3001/api/articles/restaurerVersion/"+params.id+"/"+numVersion)
        .then((response) => {
            window.location.reload();
        });
    }

    return (
        <div>
            <div className='row'>
                <div className='col-md-8'>
                    <div className="d-flex justify-content-end">
                        <Link to={ "/articles/"+params.id+"/edit" } className={`${isConnected === true ? '' : 'collapse'} btn btn-primary`}>Modifier</Link>
                        <button className={`${isConnected === true ? '' : 'collapse'} btn btn-secondary mx-2`} onClick={ () => { setIsCollapsed(!isCollapsed) } } >Changer de version</button>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <div className={`${isCollapsed ? 'collapse' : ''}`}>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>N°</th>
                                        <th>Titre</th>
                                        <th>Modifier</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        article.versions_article.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{item.nb_version}</td>
                                                    <td>{item.titre}</td>
                                                    <td><button className='btn btn-secondary' onClick={ event => updateVersion(item.nb_version)}>Changer</button></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <h1 className='my-3'>{article.titre} - {article.categorie.libelle}</h1>
                    <p>{article.contenu}</p>
                </div>
                <div className='col-md-4'>
                    <div className='shadow mx-auto rounded' style={{ width: 230}}>
                        <div className='p-3'>
                            <div className='w-100 bg-secondary' style={{ height: 200}}>
                                <img src={article.image.url} className="w-100 h-100" alt={article.image.nom} />
                            </div>
                            <div className='my-3'>
                                <h5>Tags</h5>
                                <hr/>
                                {
                                    article.tags.map((item, index) => {
                                        let linkToURL = "/tag/"+item._id+"/articles";
                                        return (
                                            <p key={index}>
                                                <Link to={linkToURL}>{item.libelle}</Link>
                                            </p>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className='bg-secondary rounded px-3 text-white'>
                            <h5>Article ajouté par</h5>
                            <p>
                                {article.auteur.prenom} {article.auteur.nom} <br/>
                                Le {article.date_creation}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
