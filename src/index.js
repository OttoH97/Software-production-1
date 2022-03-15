import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//Sivujen importit
import {OmatSivut} from './Omat_tiedot';
import {OmatMatkat} from "./omatmatkat_sivu";
import {Kotisivut} from "./kotisivut_sivu";
import {Matkakohdesivu} from "./matkakohde_sivu";
import {PorukanMatkat} from "./porukanmatkat_sivu";
import {Jasensivu} from "./jasenet_sivu";
//Bootstrap kirjasto / Route
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";



ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
      <Route path="/" element={<Kotisivut />} />
      <Route path="otiedot" element={<OmatSivut />} />
      <Route path="omatkat" element={<OmatMatkat />} />
      <Route path="matkakohde" element={<Matkakohdesivu />} />
      <Route path="pmatkat" element={<PorukanMatkat />} />
      <Route path="jasenet" element={<Jasensivu />} />
      </Routes>
    </React.StrictMode>  
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
