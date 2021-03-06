import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

export default function LeftMenu() {
  const [tags, setTags] = useState(null);
  var isConnected = (sessionStorage.getItem("isConnected") === 'true');
  // Récupération des tags
  useEffect(() => {
      axios.get("http://localhost:3001/api/tags").then((response) => {
          setTags(response.data);
      });
  }, []);

  if (!tags) return null;
  // Fonction pour initialiser la base de données
  const setupBDD = () => {
    axios.get("http://localhost:3001/api/setup").then((response) => {
        alert(response.data.msg);
        window.location.reload();
    });
  }

  return (
    <div>
      <nav className ="navbar navbar-light bg-light shadow-sm">
        <ul className ="nav navbar-nav m-2 w-100">
          <li className ="nav-item my-2">
            <Link to="/" className='nav-link'>Accueil</Link>
          </li>
          <li className ="nav-item my-2">
            <Link to="/articles" className='nav-link'>Articles</Link>
            <ul className={`${isConnected === true ? '' : 'collapse'}`}>
              <li>
              <Link to="/articles/create" className='nav-link'>Ajouter un article</Link>
              </li>
            </ul>
          </li>
          <li className="nav-item my-2">
            <Link to="/categories" className='nav-link'>Catégories</Link>
          </li>
          <li className="nav-item my-2">
            <Link to="/tags" className='nav-link'>Tags</Link>
            <hr/>
            <ul>
              {
                // Affichage des 10 premiers tags dans le menu de gauche
                  tags.map((item, index) => {
                    if(index > 9) return null;
                    let linkToURL = "/tag/"+item._id+"/articles";
                      return (
                        <li key={index}>
                          <a href={linkToURL}>{item.libelle}</a>
                        </li>
                        
                      )
                  })
              }
            </ul>
          </li>
          <li>
            <button onClick={setupBDD} className='btn btn-primary'>Initialiser la base de données</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
