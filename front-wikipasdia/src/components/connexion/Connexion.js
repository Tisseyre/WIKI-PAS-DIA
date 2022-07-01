import React, {useRef} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Create() {
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();

    // Fonction de submit du formulaire
    const handleSubmit = function (e) {
        e.preventDefault();

        axios
        .post("http://localhost:3001/api/login", {
            "email": email.current.value,
            "password": password.current.value
        })
        .then((response) => {
            if(response.data.connexion){
                // Création de la session de l'utilisateur et de vérification qu'il y ait bien une connexion
                sessionStorage.setItem("isConnected", response.data.connexion);
                sessionStorage.setItem("user", JSON.stringify({
                    "nom": response.data.nom,
                    "prenom": response.data.prenom,
                    "email": response.data.email
                }));

                navigate('/');
                window.location.reload();
            }
        });
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <h1 className='text-center my-4'>Connexion</h1>
                <div className='form-group my-3'>
                    <label className='form-label'>Email</label>
                    <input type="email" className='form-control' ref={email} />
                </div>
                <div className='form-group my-3'>
                    <label className='form-label'>Mot de passe</label>
                    <input type="password" className='form-control' ref={password} />
                </div>
                <button className='btn btn-primary'>Connexion</button>
            </form>
            <p>Vous n'avez pas de compte ? <Link to="/register">S'inscrire</Link></p>
            
        </div>
    );
}