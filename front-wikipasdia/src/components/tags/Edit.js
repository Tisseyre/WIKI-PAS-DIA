import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function Edit() {
    const [tag, setTag] = useState();
    const [libelle, setLibelle] = useState();
    const navigate = useNavigate();
    const params = useParams()


    useEffect(() => {
        axios.get("http://localhost:3001/api/tags/"+params.id).then((response) => {
            setTag(response.data);
            setLibelle(response.data.libelle);
        });
    }, []);

    if (!tag) return null;

    const handleSubmit = function (e) {
        e.preventDefault();

        axios
        .put("http://localhost:3001/api/tags/"+params.id, {
            "libelle": libelle
        })
        .then((response) => {
            navigate('/tags');
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1 className='text-center my-4'>Modification d'un tag</h1>
                <div className='form-group my-3'>
                    <label className='form-label'>Libelle</label>
                    <input type="text" className='form-control' value={libelle} onChange={ (e) => {setLibelle(e.target.value)}} />
                </div>
                <button className='btn btn-primary'>Ajouter</button>
            </form>
        </div>
    );
}