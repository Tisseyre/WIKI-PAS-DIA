import React, {useState} from 'react';
import {Link} from "react-router-dom";

export default function TopMenu() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <nav className='navbar navbar-light bg-light mb-3 py-0 shadow'>
          <div className='container-fluid px-5 py-2 d-flex justify-content-between'>
              <Link to="/" className='navbar-brand'>WIKI PAS DIA</Link>
              <div className='d-flex'>
                  <input type="text" className='form-control' value={search} onChange={ (e) => {setSearch(e.target.value)}} />&nbsp;&nbsp;
                  <a href={"/articlesByTitre/"+search} className='btn btn-primary'>Rechercher</a>
              </div>
              <div className='navbar-nav'>
                  <a href="/" className='nav-link'>Connexion</a>
              </div>
          </div>
      </nav>
    </div>
  );
}
