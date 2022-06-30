import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

export default function Home() {
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3001/api/categories").then((response) => {
            setCategories(response.data);
        });
    }, []);

    if (!categories) return null;

    return (
        <div className='container'>
            <h1>Page principale</h1>
            <div className='w-100'>
                {
                    categories.map((item, index) => {
                        let linkTo = "/categorie/"+item._id+"/articles";
                        return (
                            <div key={index}>
                                <div className='w-100 my-4 p-3 shadow rounded d-flex justify-content-between'>
                                    <h3 >{item.libelle}</h3>
                                    <Link to={linkTo} className='btn btn-primary'>Voir les articles</Link>
                                </div>
                                
                                
                                <div>

                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}
