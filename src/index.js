import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Router, Route } from 'react-router-dom';

import {Provider} from 'react-redux'
import {store} from '../src/redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}> {/* store - redax хранилище */}
      <App />
    </Provider>
  </BrowserRouter>
);
