import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

export default function TopMenu() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  var isConnected = (sessionStorage.getItem("isConnected") === 'true');

  const logout = () => {
    sessionStorage.setItem("isConnected", "false");
    navigate('/');
    window.location.reload();
  }

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
                <Link to="/login" className={`${isConnected == true ? 'collapse' : ''} nav-link`}>Connexion</Link>
                <span onClick={logout} className={`${isConnected == true ? '' : 'collapse'} nav-link`} style={{ cursor:'pointer' }}>Déconnecter</span>
              </div>
          </div>
      </nav>
    </div>
  );
}
