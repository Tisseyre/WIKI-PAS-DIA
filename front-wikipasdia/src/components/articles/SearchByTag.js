import React, {useState, useEffect} from 'react';
import Article from './Article';
import axios from 'axios';
import {Link} from "react-router-dom";
import { useParams } from 'react-router-dom';

export default function SearchByCategorie() {
    const [articles, setArticle] = useState(null);
    const [tag, setTag] = useState(null);
    const params = useParams();
    var isConnected = (sessionStorage.getItem("isConnected") === 'true');

    useEffect(() => {
        axios.get("http://localhost:3001/api/articlesByTag/"+params.id).then((response) => {
            setArticle(response.data);
        });
        axios.get("http://localhost:3001/api/tags/"+params.id).then((response) => {
            setTag(response.data);
        });
    }, [params.id]);

    if (!articles) return null;
    if (!tag) return null;

    return (
        <div>
            <Link to="/articles/create" className={`${isConnected === true ? '' : 'collapse'} btn btn-primary`}>Ajouter un article</Link>
            <h1 className='text-center my-4'>Les articles du tag {tag.libelle}</h1>
            <div className='d-flex flex-wrap'>
                {
                    articles.map((item, index) => {
                        return (
                            <Article item={item} key={index} linkTo={'/articles/'+item._id} />
                        )
                    })
                }
            </div>
        </div>
    );
}