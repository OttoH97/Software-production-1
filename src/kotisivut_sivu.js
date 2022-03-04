//Kotisivut
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { Form, Button, Row, Col, FloatingLabel } from 'react-bootstrap';
import { Accordion } from 'react-bootstrap';
import { Image } from 'react-bootstrap';

function Kotisivut() {

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Matkakertomus</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Koti</Nav.Link>
                            <Nav.Link href="#link">Tiedot</Nav.Link>
                            <NavDropdown title="Droppi" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">123</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Form>
                <Row className='text-center'>
                    {/* <Image className='img-thumbnail' src={require('./Placeholder.png')}></Image> */}
                    <a>Tähän väliin tulee kuva</a>
                </Row>
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
                <Row style={{display: "flex"}}>
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