import React, {useState, useEffect} from 'react';
import Tag from './Tag';
import axios from 'axios';
import {Link} from "react-router-dom";

export default function Index() {
    const [tags, setTags] = useState(null);
    var isConnected = (sessionStorage.getItem("isConnected") === 'true');

    useEffect(() => {
        axios.get("http://localhost:3001/api/tags").then((response) => {
            setTags(response.data);
        });
    }, []);

    if (!tags) return null;

    return (
        <div>
            <Link to="/tags/create" className={`${isConnected === true ? '' : 'collapse'} btn btn-primary`}>Ajouter un tag</Link>
            <h1 className='text-center my-4'>Les tags</h1>
            <div className='d-flex flex-wrap'>
                {
                    tags.map((item, index) => {
                        return (
                            <Tag item={item} key={index} />
                        )
                    })
                }
            </div>
        </div>
    );
}
