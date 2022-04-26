import { findByText, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import {createMemoryHistory} from 'history'
import React from 'react'
import {NavLink, MemoryRouter as Router, BrowserRouter, MemoryRouter} from 'react-router-dom'

import {Matkakohde} from './matkakohde_sivu'
const app = require("/Users/OMISTAJA/Documents/Koulutehtävät/Ohjelmistotuotanto2022/Matkakertomus/server/serveri") //Kannattaa varmaan muuttaa tämä
const supertest = require('supertest')
const request = supertest(app)

/*test("Matkakohteen lisääminen", async () =>{

  let kohdenimi = "Lontoo";
  let maa = "Englanti;"
  let paikkakunta = "Lontoo";
  let kuvausteksti = "Pubikierros Lontoossa";
  let kuva = 1
  

  const response = await request.post("/matkakohde")
.set('Content-type', 'application/json')
.send({kohdenimi : kohdenimi, maa : maa, paikkakunta : paikkakunta,
kuvausteksti : kuvausteksti, kuva : kuva}); 

expect(response.statusCode).toBe(200);


})*/
test("Matkakohteen hakeminen", async () =>{

  const response = await request.get("/matkakohde")

expect(response.statusCode).toBe(200);




})