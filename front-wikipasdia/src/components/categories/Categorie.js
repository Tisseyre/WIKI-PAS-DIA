import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';

export default function Categorie({ item, linkTo }) {

    const navigate = useNavigate();

    const delCategorie = () => {
        axios
        .delete("http://localhost:3001/api/categories/"+item._id)
        .then((response) => {
            navigate('/categories');
        });
    }

    return (
        <div>
            <Link to={linkTo}>
            <div className='card m-2' style={{ height: 100, width: 150}}>
                <button onClick={delCategorie}>X</button>
                <div className="card-body">
                    <h5 className="card-title">{item.libelle}</h5>
                </div>
            </div>
            </Link>
        </div>
    );
}
