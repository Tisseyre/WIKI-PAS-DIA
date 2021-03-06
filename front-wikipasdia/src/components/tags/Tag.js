import React from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import { AiOutlineClose, AiFillEdit } from 'react-icons/ai';

export default function Tag({ item }) {
    var isConnected = (sessionStorage.getItem("isConnected") === 'true');

    // Modification des titres des tags - affichage des 15 premiers caractères
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

    // Fonction de suppression d'un tag
    const delTag = () => {
        axios
        .delete("http://localhost:3001/api/tags/"+item._id)
        .then((response) => {
            window.location.reload();
        });
    }

    return (
        <div>
            <div className='card m-2' style={{ height: 100, width: 200}}>
                <div className='d-flex justify-content-end'>
                    <Link to={"/tags/"+item._id+"/edit"} className={`${isConnected === true ? '' : 'collapse'} mx-2`} >
                        <AiFillEdit className='text-secondary' style={{ height: 30, width: 30}} />
                    </Link>
                    <AiOutlineClose className={`${isConnected === true ? '' : 'collapse'} text-danger`} onClick={delTag} style={{ height: 30, width: 30, cursor: "pointer"}} />
                </div>
                <Link to={"/tag/"+item._id+"/articles"}>
                    <div className="card-body">
                        <h5 className="card-title">
                            {
                                refacTitle(item.libelle)
                            }
                        </h5>
                    </div>
                </Link>
            </div>
        </div>
    );
}
