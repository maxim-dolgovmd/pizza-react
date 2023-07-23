import './scss/app.scss';

import { Routes, Route } from 'react-router-dom';

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import FullPizza from "./pages/FullPizza";

import MainLayout from "./Layouts/MainLayout";

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
          element={<NotFound />}
        />
        <Route
          path="pizza/:id"
          element={<FullPizza />}
        />
        <Route
          path="cart"
          element={<Cart />}
        />
      </Route>
    </Routes>
  );
}

export default App;
