import { findByText, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import {createMemoryHistory} from 'history'
import React from 'react'
import {NavLink, MemoryRouter as Router, BrowserRouter, MemoryRouter} from 'react-router-dom'

import {Kotisivut} from './kotisivut_sivu'
const app = require("/Users/OMISTAJA/Documents/Koulutehtävät/Ohjelmistotuotanto2022/Matkakertomus/server/serveri") //Kannattaa varmaan muuttaa tämä
const supertest = require('supertest')
const request = supertest(app)

test("Onnistuuko rekisteröityminen", async () =>{

  let etunimi = "Collins";
  let sukunimi = "Burgess;"
  let nimimerkki = "CB";
  let email = "cb@gmail.com";
  let password = "cb"
  

  const response = await request.post("/matkaaja")
.set('Content-type', 'application/json')
.send({etunimi : etunimi,sukunimi : sukunimi, nimimerkki : nimimerkki,
email : email,password : password}); 

expect(response.statusCode).toBe(200);


})