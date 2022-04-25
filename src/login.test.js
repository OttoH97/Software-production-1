import { findByText, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import {createMemoryHistory} from 'history'
import React from 'react'
import {NavLink, MemoryRouter as Router, BrowserRouter, MemoryRouter} from 'react-router-dom'

import {Login} from './Login'
const app = require("/Users/OMISTAJA/Documents/Koulutehtävät/Ohjelmistotuotanto2022/Matkakertomus/server/serveri") // Link to your server file
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

      fireEvent.click(screen.getByText("Kirjaudu sisään"));

      let emailInput = screen.getByPlaceholderText(/Anna sähköposti/i);
      let passwordInput = screen.getByPlaceholderText(/Anna salasana/i);
      const kirjaudu = screen.getByTestId(/Kirjaudu/i);

      userEvent.type(emailInput, 'asd');
      userEvent.type(passwordInput, 'asd');
      fireEvent.click(kirjaudu);
})

