import React, {useRef} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Create() {
    const email = useRef();
    const nom = useRef();
    const prenom = useRef();
    const password = useRef();
    const navigate = useNavigate();

    // Fonction de submit du formulaire
    const handleSubmit = function (e) {
        e.preventDefault();

        axios
        .post("http://localhost:3001/api/utilisateurs", {
            "prenom" : prenom.current.value,
            "nom" : nom.current.value,
            "email" : email.current.value,
            "password" : password.current.value
        })
        .then((response) => {
            navigate('/login');
        });
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <h1 className='text-center my-4'>Inscription</h1>
                <div className='row my-3'>
                    <div className='col-md-6 form-group'>
                        <label className='form-label'>Nom</label>
                        <input type="text" className='form-control' ref={nom} />
                    </div>
                    <div className='col-md-6 form-group'>
                        <label className='form-label'>Prénom</label>
                        <input type="text" className='form-control' ref={prenom} />
                    </div>
                </div>
                
                <div className='form-group my-3'>
                    <label className='form-label'>Email</label>
                    <input type="email" className='form-control' ref={email} />
                </div>
                <div className='form-group my-3'>
                    <label className='form-label'>Mot de passe</label>
                    <input type="password" className='form-control' ref={password} />
                </div>
                <button className='btn btn-primary'>S'inscrire</button>
            </form>
        </div>
    );
}