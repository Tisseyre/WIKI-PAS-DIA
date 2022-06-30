import React from 'react';
import {Link} from "react-router-dom";

export default function LeftMenu() {
  return (
    <div>
      <nav className ="navbar navbar-light bg-light shadow-sm">
        <ul className ="nav navbar-nav m-2 w-100">
          <li className ="nav-item my-2">
            <Link to="/" className='nav-link'>Accueil</Link>
          </li>
          <li className ="nav-item my-2">
            <Link to="/" className='nav-link'>Débuter sur le wiki</Link>
          </li>
          <li className ="nav-item my-2">
            <Link to="/articles" className='nav-link'>Articles</Link>
            <ul>
              <li>
              <Link to="/articles/create" className='nav-link'>Ajouter un article</Link>
              </li>
            </ul>
          </li>
          <li className ="nav-item my-2">
            <Link to="/categories" className='nav-link'>Catégories</Link>
          </li>
          <li className ="nav-item my-2">
            <Link to="/tags" className='nav-link'>Tags</Link>
            <hr/>
          </li>
        </ul>
      </nav>
    </div>
  );
}
