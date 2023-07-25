import React, { Suspense } from 'react';
import './scss/app.scss';
import Loadable from 'react-loadable';

import { Routes, Route } from 'react-router-dom';

import Home from "./pages/Home";
import MainLayout from "./Layouts/MainLayout";

// Код сплитинг выполняется на стороне бразуера/клиента
// const Cart = React.lazy(() => import(/* webpackChunkName: 'Cart' */ "./pages/Cart"));

// Код сплитинг выполняется и на стороне бразуера/клиенте и на стороне сервера
const Cart = Loadable({
  loader: () => import(/* webpackChunkName: 'Cart' */ "./pages/Cart"),
  loading: () => <div>Происходит загрузка корзины</div>
})
const NotFound = React.lazy(() => import(/* webpackChunkName: 'NotFound' */ "./pages/NotFound"));
const FullPizza = React.lazy(() => import(/* webpackChunkName: 'FullPizza' */ "./pages/FullPizza"));

function App() {

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          path=""
          element={<Home/>}
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Происходит загрузка страницы</div>}>
              <NotFound />
            </Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<div>Происходит загрузка страницы</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="cart"
          element={
              <Cart />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
