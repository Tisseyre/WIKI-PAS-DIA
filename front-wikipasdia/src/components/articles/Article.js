import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';

export default function Article({ item, linkTo }) {

    const navigate = useNavigate();

    const delArticle = () => {
        axios
        .delete("http://localhost:3001/api/articles/"+item._id)
        .then((response) => {
            navigate('/articles');
        });
    }

    return (
        <div>
            <Link to={linkTo}>
            <div className='card m-2' style={{ height: 200, width: 150}}>
                <button onClick={delArticle}>X</button>
                <img src={item.image.url} className="card-img-top" alt={item.image.nom} />
                <div className="card-body">
                    <h5 className="card-title">{item.titre}</h5>
                </div>
            </div>
            </Link>
        </div>
    );
}
