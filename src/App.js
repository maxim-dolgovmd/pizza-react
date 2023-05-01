import React, { useEffect, useState } from "react";
import './scss/app.scss';
import { Routes, Route } from 'react-router-dom';

import Header from "./components/Header";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

export const AppContext = React.createContext();

function App() {

  const [searchValue, setSearchValue] = useState('')
  console.log(searchValue)

  return (
    <div className="App">
      <AppContext.Provider value={{searchValue, setSearchValue}}>
        <div className="wrapper">
          <Header/>
          <div className="content">
            <div className="container">
              <Routes>
                <Route
                  path="/"
                  element={<Home/>}
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
      </AppContext.Provider>
    </div>
  );
}

export default App;
