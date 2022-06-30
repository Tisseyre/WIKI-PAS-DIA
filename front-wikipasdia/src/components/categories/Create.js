import React, {useRef} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Create() {
    const libelle = useRef();
    const navigate = useNavigate();

    const handleSubmit = function (e) {
        e.preventDefault();

        axios
        .post("http://localhost:3001/api/categories", {
            "libelle": libelle.current.value
        })
        .then((response) => {
            navigate('/categories');
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1 className='text-center my-4'>Création d'une catégorie</h1>
                <div className='form-group my-3'>
                    <label className='form-label'>Libelle</label>
                    <input type="text" className='form-control' ref={libelle} />
                </div>
                <button className='btn btn-primary'>Ajouter</button>
            </form>
        </div>
    );
}