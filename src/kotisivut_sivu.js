//Kotisivut
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { Form, Button, Row, Col, FloatingLabel } from 'react-bootstrap';
import { Accordion } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import pic from './banner.png';
import { Link, useNavigate } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import Axios from 'axios';
import { Login } from "./Login";
import { click } from '@testing-library/user-event/dist/click';

/*
    TODO:
    #1 Rekisteröitymistietojen vieminen tietokantaan. DONE
    #2 Kirjautuminen. WIP
    #3
 */


function Kotisivut() {

    const navigate = useNavigate();
    const toLogin = ()  => navigate('/Login');

    // Rekisteröitymiseen
    const [show, setShow] = useState(false);
    const handleCloseR = () => {
        setShow(false)
        setEtunimi('');
        setSukunimi('');
        setNimimerkki('');
        setEmail('');
        setPassword('');
        // sulkemisen yhteydessä tekstikentät resetoidaan
    };
    const handleShowR = () => setShow(true);
    const [matkaaja, setMatkaaja] = useState([]);
    const [etunimi, setEtunimi] = useState('');
    const [sukunimi, setSukunimi] = useState('');
    const [nimimerkki, setNimimerkki] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleEnimiChange = event => {
        setEtunimi(event.target.value)
    };
    const handleSnimiChange = event => {
        setSukunimi(event.target.value)
    };
    const handleNmerkkiChange = event => {
        setNimimerkki(event.target.value)
    };
    const handleEmailChange = event => {
        setEmail(event.target.value)
    };
    const handlePasswordChange = event => {
        setPassword(event.target.value)
    };
    useEffect(async () => {
        Axios.get("http://localhost:3001/matkaaja").then((response) => {
            setMatkaaja(response.data);
        });
    }, [])
    const handleSubmit = event => {
        event.preventDefault();
        Axios.post("http://localhost:3001/matkaaja", {
            etunimi: etunimi,
            sukunimi: sukunimi,
            nimimerkki: nimimerkki,
            email: email,
            password: password,
        });
        toLogin();
    };

    //Kirjautumiseen
    const [showK, setShowK] = useState(false);
    const handleCloseK = () => setShowK(false);
    const handleShowK = () => setShowK(true);

   /* const [token, setToken] = useState();

    if (!token) {
        return <Login setToken={setToken} />
    }*/

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
                        <Nav.Link href="login"><Button variant="outline-primary" size="sm" /* onClick={handleShowK} */>Kirjaudu sisään</Button></Nav.Link>
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
                        <Form id='form-register'>
                            <Row>
                                <Form.Label>Etunimi</Form.Label>
                                <Form.Control type='etunimi' name='etunimi' placeholder='Anna etunimi' onChange={handleEnimiChange} value={etunimi} />
                            </Row>
                            <Row>
                                <Form.Label>Sukunimi</Form.Label>
                                <Form.Control type='sukunimi' name='sukunimi' placeholder='Anna sukunimi' onChange={handleSnimiChange} value={sukunimi} />
                            </Row>
                            <Row>
                                <Form.Label>Nimimerkki</Form.Label>
                                <Form.Control type='nimimerkki' name='nimimerkki' placeholder='Anna nimimerkki' onChange={handleNmerkkiChange} value={nimimerkki} />
                            </Row>
                            <Row>
                                <Form.Label>Sähköposti</Form.Label>
                                <Form.Control type='email' name='email' placeholder='Anna sähköposti' onChange={handleEmailChange} value={email} />
                            </Row>
                            <Row>
                                <Form.Label>Salasana</Form.Label>
                                <Form.Control type='password' name='password' placeholder='Anna salasana' onChange={handlePasswordChange} value={password} />
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseR}>
                            Close
                        </Button>
                        <Button variant="primary" type='submit' onClick={handleSubmit}>
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