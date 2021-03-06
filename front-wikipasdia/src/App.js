import React, {useState} from 'react';
import './App.css';

// Routes
import {Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import ArticleIndex from "./components/articles/Index";
import ArticleCreate from "./components/articles/Create";
import ArticleEdit from "./components/articles/Edit";
import ArticleShow from "./components/articles/Show";
import ArticleByCategorie from "./components/articles/SearchByCategorie";
import ArticleByTag from "./components/articles/SearchByTag";
import ArticleByTitre from "./components/articles/SearchByTitre";

import TagIndex from "./components/tags/Index";
import TagCreate from "./components/tags/Create";
import TagEdit from "./components/tags/Edit";

import CategorieIndex from "./components/categories/Index";
import CategorieCreate from "./components/categories/Create";
import CategorieEdit from "./components/categories/Edit";

import Connexion from "./components/connexion/Connexion";
import Inscription from "./components/connexion/Inscription";

// Navbar
import TopMenu from "./components/layout/TopMenu";
import LeftMenu from "./components/layout/LeftMenu";

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Fonction retournant les menus et les différentes routes
function App() {
  return (
    <div>
      <TopMenu />
      <div className='row'>
        <div className='col-md-2'>
          <LeftMenu />
        </div>
        <div className='col-md-10'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<ArticleIndex />} />
            <Route path="/articles/create" element={<ArticleCreate />} />
            <Route path="/articles/:id/edit" element={<ArticleEdit />} />
            <Route path="/articles/:id" element={<ArticleShow />} />
            <Route path="/categorie/:id/articles" element={<ArticleByCategorie />} />
            <Route path="/tag/:id/articles" element={<ArticleByTag />} />
            <Route path="/articlesByTitre/:titre" element={<ArticleByTitre />} />

            <Route path="/tags" element={<TagIndex />} />
            <Route path="/tags/create" element={<TagCreate />} />
            <Route path="/tags/:id/edit" element={<TagEdit />} />

            <Route path="/categories" element={<CategorieIndex />} />
            <Route path="/categories/create" element={<CategorieCreate />} />
            <Route path="/categories/:id/edit" element={<CategorieEdit />} />

            <Route path="/login" element={<Connexion />} />
            <Route path="/register" element={<Inscription />} />
            
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
