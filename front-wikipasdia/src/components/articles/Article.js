import React from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import { AiOutlineClose, AiFillEdit } from 'react-icons/ai';

export default function Article({ item, linkTo }) {
    var isConnected = (sessionStorage.getItem("isConnected") === 'true');

    // Modification des titres des articles - affichage des 15 premiers caractères
    const refacTitle = (title) => {
        let titre = title;
        if (title.length > 15) {
            titre = "";
            for (let i = 0; i < 15; i++) {
                titre += title[i];
            }
            titre += "...";
        }
        return titre;
    }

    // Fonction de suppression d'un article
    const delArticle = () => {
        axios
        .delete("http://localhost:3001/api/articles/"+item._id)
        .then((response) => {
            window.location.reload();
        });
    }

    return (
        <div>
            <div className='card m-3 shadow' style={{ height: 380, width: 200}}>
                <div className='d-flex justify-content-end'>
                    <Link to={"/articles/"+item._id+"/edit"} className={`${isConnected === true ? '' : 'collapse'} mx-2`} >
                        <AiFillEdit className='text-secondary' style={{ height: 30, width: 30}} />
                    </Link>
                    <AiOutlineClose className={`${isConnected === true ? '' : 'collapse'} text-danger`} onClick={delArticle} style={{ height: 30, width: 30, cursor: "pointer"}} />
                </div>
                <Link to={linkTo}>
                    <div className='mx-auto bg-dark rounded' style={{ width: 190}} >
                        <img src={item.image.url} className="card-img-top" alt={item.image.nom} style={{ height: 280, width: 190}} />
                    </div>
                    
                    <div className="card-body">
                        <h5 className="card-title text-center">
                            {refacTitle(item.titre)}
                        </h5>
                    </div>
                </Link>
            </div>
        </div>
    );
}
