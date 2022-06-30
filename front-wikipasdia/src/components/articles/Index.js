import React, {useState, useEffect} from 'react';
import Article from './Article';
import axios from 'axios';
import {Link} from "react-router-dom";

export default function Index() {
    const [articles, setArticle] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3001/api/articles").then((response) => {
            setArticle(response.data);
        });
    }, []);

    if (!articles) return null;

    return (
        <div>
            <Link to="/articles/create" className='btn btn-primary'>Ajouter un article</Link>
            <h1 className='text-center my-4'>Les articles</h1>
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
