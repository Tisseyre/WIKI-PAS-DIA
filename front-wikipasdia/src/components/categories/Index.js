import React, {useState, useEffect} from 'react';
import Categorie from './Categorie';
import axios from 'axios';
import {Link} from "react-router-dom";

export default function Index() {
    const [categories, setCategories] = useState(null);
    var isConnected = (sessionStorage.getItem("isConnected") === 'true');

    // Récupération des catégories
    useEffect(() => {
        axios.get("http://localhost:3001/api/categories").then((response) => {
            setCategories(response.data);
        });
    }, []);

    if (!categories) return null;

    return (
        <div>
            <Link to="/categories/create" className={`${isConnected === true ? '' : 'collapse'} btn btn-primary`}>Ajouter une catégorie</Link>
            <h1 className='text-center my-4'>Les catégories</h1>
            <div className='d-flex flex-wrap'>
                {
                    categories.map((item, index) => {
                        return (
                            <Categorie item={item} key={index} />
                        )
                    })
                }
            </div>
        </div>
    );
}
