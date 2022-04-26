import { findByText, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import React from 'react'
import { NavLink, MemoryRouter as Router, BrowserRouter, MemoryRouter } from 'react-router-dom'
import { Login } from './Login'
import { OmatSivut } from './Omat_tiedot';
const app = require("/Users/OMISTAJA/Documents/Koulutehtävät/Ohjelmistotuotanto2022/Matkakertomus/server/serveri") //Kannattaa varmaan muuttaa tämä
const supertest = require('supertest')
const request = supertest(app)


test("Omien tietojen päivityksen tarkistus", async () => {


  let etunimi = "asd"
  let sukunimi = "asd"
  let nimimerkki = "asd"
  let paikkakunta = "asd"
  let esittely = "asd"
  let idmatkaaja = 3;

  const response = await request.post("/paivitatiedot")
    .set('Content-type', 'application/json')
    .send({
      etunimi: etunimi, sukunimi: sukunimi, nimimerkki: nimimerkki,
      paikkakunta: paikkakunta, esittely: esittely,idmatkaaja : idmatkaaja
    });

  expect(response.statusCode).toBe(200);

});

test("Tarkastetaan onko käyttäjä päivittynyt", async () => {
  const response = await request.get("/matkaaja")

  const data = response.body;
  let asiakkaat = data;
  const m = asiakkaat[2];
  expect(m.idmatkaaja).toBeGreaterThan(1);
  expect(m.etunimi).toBe('asd');
  expect(m.sukunimi).toBe('asd');
  expect(m.nimimerkki).toBe('asd');
  expect(m.paikkakunta).toBe('asd');
  expect(m.esittely).toBe('asd');
});


