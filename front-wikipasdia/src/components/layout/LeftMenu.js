import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

export default function LeftMenu() {
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
        </ul>
      </nav>
    </div>
  );
}
