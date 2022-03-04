import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {OmatSivut} from './Omat_tiedot';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Kotisivut} from './kotisivut_sivu';


ReactDOM.render(
  <React.StrictMode>
    {/* <OmatSivut /> */}
    <Kotisivut />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
