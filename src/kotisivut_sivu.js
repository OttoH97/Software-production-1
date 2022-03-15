//Kotisivut
import logo from './logo.svg';
import './App.css';
import { useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { Form, Button, Row, Col, FloatingLabel } from 'react-bootstrap';
import { Accordion } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import pic from './banner.png';
import { Link } from "react-router-dom";

//import {Kotisivut} from './kotisivut_sivu'; //kopioi index.js tiedostoon
//<Kotisivut /> //kopioi index.js tiedostoon

function Kotisivut() {

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Matkakertomus</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="matkakohde">Matkakohteet</Nav.Link>
                        <Nav.Link href="omatkat">Omat matkat</Nav.Link>
                        <Nav.Link href="pmatkat">Porukan matkat</Nav.Link>
                        <Nav.Link href="jasenet">Jäsenet</Nav.Link>
                        <Nav.Link href="otiedot">Omat tiedot</Nav.Link>
                        <Nav.Link><Button variant="outline-primary" size="sm">Rekisteröidy</Button></Nav.Link>
                        <Nav.Link><Button variant="outline-primary" size="sm">Kirjaudu sisään</Button></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Form>
                <div className='text-center'>
                    <img src={pic} width={1920} height={400} alt="" /><br />
                </div>
                <Row>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Tervetuloa!</Accordion.Header>
                            <Accordion.Body>
                                Tervetuloa käyttämään Matkakertomus-websovellusta! Täällä voit tallettaa matkakertomuksiasi,
                                esitellä uusia matkakohteita ja tutustua toisten käyttäjien matkoihin ja heidän kokemuksiin.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Accordion Item #2</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                                est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Row>
                <Row style={{ display: "flex" }}>
                    <Col className='text-center'>
                        <Button variant="outline-primary" size="lg">Rekisteröidy</Button>
                    </Col>
                    <Col>
                        <Button variant="outline-primary" size="lg">Kirjaudu sisään</Button>
                    </Col>
                </Row>
            </Form>

        </div>
    )

}

export { Kotisivut };