import { findByText, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import React from 'react'
import { NavLink, MemoryRouter as Router, BrowserRouter, MemoryRouter } from 'react-router-dom'
const app = require("/Users/OMISTAJA/Documents/Koulutehtävät/Ohjelmistotuotanto2022/Matkakertomus/server/serveri") //Kannattaa varmaan muuttaa tämä
const supertest = require('supertest')
const request = supertest(app)


test("Oman matkan lisäys", async () => {
  let idmatkaaja = 10;
  let alkupvm = "20.11.2020"
  let loppupvm = "21.11.2020"
  let yksityinen = 1;


  const response = await request.post("/omatmatkat")
    .set('Content-type', 'application/json')
    .send({
      alkupvm : alkupvm, loppupvm : loppupvm, yksityinen : yksityinen,
      idmatkaaja:idmatkaaja
    });

  expect(response.statusCode).toBe(200);

});

