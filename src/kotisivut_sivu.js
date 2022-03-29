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
import pic from './banner.png';
import { Link } from "react-router-dom";
import { Modal } from 'react-bootstrap';


/*
    TODO:
    #1 Rekisteröitymistietojen vieminen tietokantaan.
    #2
    #3
 */


function Kotisivut() {

    // Rekisteröitymiseen
    const [show, setShow] = useState(false);

    const handleCloseR = () => setShow(false);
    const handleShowR = () => setShow(true);

    //Kirjautumiseen
    const [showK, setShowK] = useState(false);

    const handleCloseK = () => setShowK(false);
    const handleShowK = () => setShowK(true);

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
                        <Nav.Link><Button variant="outline-primary" size="sm" onClick={handleShowR}>Rekisteröidy</Button></Nav.Link>
                        <Nav.Link><Button variant="outline-primary" size="sm" onClick={handleShowK}>Kirjaudu sisään</Button></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Form>
                {/* Rekisteröitymisen modal */}
                <Modal show={show} onHide={handleCloseR}>
                    <Modal.Header closeButton>
                        <Modal.Title>Rekisteröidy</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row>
                                <Form.Label>Etunimi</Form.Label>
                                <Form.Control placeholder='' />
                            </Row>
                            <Row>
                                <Form.Label>Sukunimi</Form.Label>
                                <Form.Control placeholder='' />
                            </Row>
                            <Row>
                                <Form.Label>Nimimerkki</Form.Label>
                                <Form.Control placeholder='' />
                            </Row>
                            <Row>
                                <Form.Label>Sähköposti</Form.Label>
                                <Form.Control placeholder='' />
                            </Row>
                            <Row>
                                <Form.Label>Salasana</Form.Label>
                                <Form.Control placeholder='' />
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseR}>
                            Close
                        </Button>
                        <Button variant="primary" type='submit' onClick={handleCloseR}>
                            Rekisteröidy
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/*Kirjautumisen modal */}
                <Modal show={showK} onHide={handleCloseK}>
                    <Modal.Header closeButton>
                        <Modal.Title>Kirjaudu sisään</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row>
                                <Form.Label>Sähköposti</Form.Label>
                                <Form.Control placeholder='Anna sähköposti' />
                            </Row>
                            <Row>
                                <Form.Label>Salasana</Form.Label>
                                <Form.Control placeholder='Anna salasana' />
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseK}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleCloseK}>
                            Kirjaudu
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* Banner kuva */}
                <Row>
                    <Container fluid='md'>
                        <Image className='img-fluid' src={pic} alt="" /><br />
                    </Container>
                </Row>
                {/* Esittely teksti */}
                <Row>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Tervetuloa!</Accordion.Header>
                            <Accordion.Body>
                                Tervetuloa käyttämään Matkakertomus-websovellusta! Täällä voit tallettaa matkakertomuksiasi,
                                esitellä uusia matkakohteita ja tutustua toisten käyttäjien matkoihin ja heidän kokemuksiin. 
                                Liity intohimoisten reissaajien joukkoon!
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Row>
            </Form>



        </div>
    )

}

export { Kotisivut };