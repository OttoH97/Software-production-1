import { findByText, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import React from 'react'
import { NavLink, MemoryRouter as Router, BrowserRouter, MemoryRouter } from 'react-router-dom'
import {Login} from './Login'
import { OmatSivut } from './Omat_tiedot';
const app = require("/Users/OMISTAJA/Documents/Koulutehtävät/Ohjelmistotuotanto2022/Matkakertomus/server/serveri") //Kannattaa varmaan muuttaa tämä
const supertest = require('supertest')
const request = supertest(app)


test("Omien tietojen päivityksen tarkistus", async () => {

    
    const history = createMemoryHistory();
    render(
        <Router location={history.location} navigator={history}>
          <Login />
        </Router>,
      )

      fireEvent.click(screen.getByText("Kirjaudu sisään"));

      let emailInput = screen.getByPlaceholderText(/Anna sähköposti/i);
      let passwordInput = screen.getByPlaceholderText(/Anna salasana/i);
      const kirjaudu = screen.getByTestId(/Kirjaudu/i);

      userEvent.type(emailInput, 'asd');
      userEvent.type(passwordInput, 'asd');
      fireEvent.click(kirjaudu);

      jest.mock('react-router-dom', () => {
        return {
          Redirect: jest.fn(({ to }) => `Sivulle to ${to}`),
        };
      });
      render(
        <Router location={history.location} navigator={history}>
          <OmatSivut/>
        </Router>,
      )

      let etunimi = screen.getByTestId(/etutesti/i);
      let sukunimi = screen.getByTestId(/sukutesti/i);
      let nimimerkki = screen.getByTestId(/nimimerkkitesti/i);
      let paikkakunta = screen.getByTestId(/paikkatesti/i);
      let esittely = screen.getByTestId(/testiesittely/i);
      let sahkoposti = screen.getByTestId(/testisposti/i);
      let tallenna = screen.getByTestId(/tallenna/i)

      userEvent.type(etunimi, 'asd');
      userEvent.type(sukunimi, 'asd');
      userEvent.type(nimimerkki, 'asd');
      userEvent.type(paikkakunta, 'asd');
      userEvent.type(esittely, 'asd');
      userEvent.type(sahkoposti, 'asd');
      fireEvent.click(tallenna);

      const response = await request.post("/paivitatiedot")
.set('Content-type', 'application/json')
.send({etunimi : etunimi,sukunimi : sukunimi, nimimerkki : nimimerkki,
paikkakunta : paikkakunta, esittely : esittely, sahkoposti : sahkoposti}); 

      
      
    test("Tarkastetaan onko käyttäjä päivittynyt"), async () =>{
        const response = await request.get("/matkaaja")
        expect(response.statusCode).toBe(200);
    
        const data = response.body;
        let asiakkaat = data;
        const m = asiakkaat[2];
        expect(m.idmatkaaja).toBeGreaterThan(1);
        expect(m.etunimi).toBe('asd');
        expect(m.sukunimi).toBe('asd');
        expect(m.nimimerkki).toBe('asd');
        expect(m.paikkakunta).toBe('asd');
        expect(m.esittely).toBe('asd');
        expect(m.sahkoposti).toBe('asd');
    }
    

})