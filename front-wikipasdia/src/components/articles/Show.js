import React, {useState, useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from 'axios';

export default function Show() {
    const params = useParams()
    const [article, setArticle] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3001/api/articles/"+params.id).then((response) => {
            setArticle(response.data);
        });
    }, []);

    if (!article) return null;

    console.log(article);

    return (
        <div>
            <div className='row'>
                <div className='col-md-8'>
                    <div className='d-flex justify-content-end'>
                        <Link to={ "/articles/"+params.id+"/edit" } className='btn btn-primary'>Modifier</Link>
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
                                        let linkToURL = "/articlesByTag/"+item._id;
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
