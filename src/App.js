import React, { useEffect, useState } from "react";
import './scss/app.scss';
import { Routes, Route } from 'react-router-dom';

import Header from "./components/Header";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";



function App() {

  const [searchValue, setSearchValue] = useState('')
  console.log(searchValue)

  return (
    <div className="App">
      <div className="wrapper">
        <Header searchValue={searchValue} setSearchValue={setSearchValue} />
        <div className="content">
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={<Home searchValue={searchValue}/>}
              />
              <Route
                path="*"
                element={<NotFound />}
              />
              <Route
                path="/cart"
                element={<Cart />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
