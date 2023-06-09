import { findByText, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { response } from 'express';
import {createMemoryHistory} from 'history'
import React from 'react'
import {NavLink, MemoryRouter as Router, BrowserRouter, MemoryRouter} from 'react-router-dom'
import {Kotisivut} from './kotisivut_sivu'
import {Login} from './Login'
const app = require("/Users/OMISTAJA/Documents/Koulutehtävät/Ohjelmistotuotanto2022/Matkakertomus/server/serveri") //Kannattaa varmaan muuttaa tämä :DDD
const supertest = require('supertest')
const request = supertest(app)

test("Kirjaudutaan väärillä tunnuksilla", async () =>{
  let email = "Maija";
  let password = "Mehilainen";
  
    const response = await request.post("/login")
    .set('Content-type', 'application/json')
    .send({email : email, password : password}); 

    const data = response.body;
    expect(data.message).toBe("Käyttäjää ei ole olemassa")
})

test("Onnistuuko kirjautuminen", async () =>{

    jest.mock('react-router-dom', () => {
        return {
          Redirect: jest.fn(({ to }) => `Sivulle to ${to}`),
        };
      });
    const history = createMemoryHistory();

    render(
        <Router location={history.location} navigator={history}>
          <Login />
        </Router>,
      )

      let emailInput = screen.getByTestId(/sposti/i);
      let passwordInput = screen.getByTestId(/salasana/i);
      const kirjaudu = screen.getByTestId(/Kirjaudu/i);

      userEvent.type(emailInput, 'asd');
      userEvent.type(passwordInput, 'asd');
      fireEvent.click(kirjaudu);

      expect(response.status(200))
})


