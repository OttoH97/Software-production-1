//Omat tiedot hallinta
import logo from './logo.svg';
import './App.css';
import React from "react";
import {useState, useEffect} from 'react';
import { Container, FormGroup } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { Form, Button, Row, Col,FloatingLabel } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Axios from 'axios';

function OmatSivut() {

    const [email, setSahkoposti] = useState(localStorage.getItem("user"));
    const [tiedot, setTiedot] = useState([]);
    const [kayttaja, setKayttaja] = useState([]);

    useEffect(async () => {
        Axios.get("http://localhost:3001/matkaaja").then((response) => {
            setTiedot(response.data);
            console.log(response.data);
            setKayttaja(tiedot.find(email))
            console.log(kayttaja);
            
        });
    }, [])
    
    

    return(
<div>
<Navbar  bg="light" expand="lg">        
        <Navbar.Brand href="/">Matkakertomus</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="matkakohde">Matkakohteet</Nav.Link>
                <Nav.Link href="omatkat">Omat matkat</Nav.Link>
                <Nav.Link href="pmatkat">Porukan matkat</Nav.Link>
                <Nav.Link href="jasenet">Jäsenet</Nav.Link>
                <Nav.Link href="otiedot">Omat tiedot</Nav.Link>            
            </Nav>
        </Navbar.Collapse>        
    </Navbar>

<Container fluid="md">
<Form>
    <h3>Omat tiedot</h3>
    <Form.Group>
    <Row>
    <Col>
        <Form.Label>Etunimi</Form.Label>
        <Form.Control id='etunimi' placeholder="" />
    </Col>
    <Col>
        <Form.Label>Sukunimi</Form.Label>
        <Form.Control id='sukunimi' placeholder="" />
    </Col>
    <Col>
        <Form.Label>Nimimerkki</Form.Label>
        <Form.Control id='nimimerkki' placeholder="" />
    </Col>
    </Row>
    </Form.Group>
    
        <Form.Group className="mb-2" controlId="salasana">
        <Form.Label>Paikkakunta</Form.Label>
        <Form.Control id='paikkakunta' type="text" placeholder="" />
        </Form.Group>
    
    
        <FloatingLabel controlId="floatingTextarea2" label="Esittely">
        <Form.Control
        id='esittely'
        as="textarea"
        placeholder=""
        style={{ height: '100px' }}
        />
        </FloatingLabel>
    

    <Row>
    <Col>
        <Form.Label>Sähköposti</Form.Label>
        <Form.Control readOnly placeholder="" />
    </Col>
    <Col>
        <Form.Label>Salasana</Form.Label>
        <Form.Control readOnly placeholder="" />
    </Col>
    </Row>
    <br></br>
    <Button variant="success">Tallenna</Button>{' '}
</Form>
</Container>
</div>
    )
    
}
export {OmatSivut};