import React from 'react';
import {Link} from "react-router-dom";

export default function TopMenu() {
  return (
    <div>
      <nav className='navbar navbar-light bg-light mb-3 py-0 shadow'>
          <div className='container-fluid px-5 py-2 d-flex justify-content-between'>
              <Link to="/" className='navbar-brand'>WIKI PAS DIA</Link>
              <div>
                  <a href="/" className='nav-link'>Test</a>
              </div>
              <div className='navbar-nav'>
                  <a href="/" className='nav-link'>Connexion</a>
              </div>
          </div>
      </nav>
    </div>
  );
}
