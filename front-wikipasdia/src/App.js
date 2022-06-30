import React from 'react';
import './App.css';

// Routes
import {Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import ArticleIndex from "./components/articles/Index";
import ArticleCreate from "./components/articles/Create";
import ArticleEdit from "./components/articles/Edit";
import ArticleShow from "./components/articles/Show";

import TagIndex from "./components/tags/Index";
import TagCreate from "./components/tags/Create";
import TagEdit from "./components/tags/Edit";

import CategorieIndex from "./components/categories/Index";
import CategorieCreate from "./components/categories/Create";
import CategorieEdit from "./components/categories/Edit";

// Navbar
import TopMenu from "./components/layout/TopMenu";
import LeftMenu from "./components/layout/LeftMenu";

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';


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
            <Route path="/tags" element={<TagIndex />} />
            <Route path="/tags/create" element={<TagCreate />} />
            <Route path="/tags/:id/edit" element={<TagEdit />} />

            <Route path="/categories" element={<CategorieIndex />} />
            <Route path="/categories/create" element={<CategorieCreate />} />
            <Route path="/categories/:id/edit" element={<CategorieEdit />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
