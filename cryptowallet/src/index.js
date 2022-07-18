import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './Login';
import Main from './Main';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,
        Routes,
        Route,
      } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Deposit from './Deposit';
import Exchange from './Exchange';
import Profile from './Profile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
          <Route  path='/' element={<App/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path='/main' element={<Main/>} />
          <Route path='/deposit' element={<Deposit/>} />
          <Route path='/exchange' element={<Exchange/>} />
          <Route path='/profile' element={<Profile/>} />
        </Routes>
    </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
