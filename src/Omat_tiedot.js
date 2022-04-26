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
import { Routes, Route, BrowserRouter as Router, useNavigate } from 'react-router-dom'

function OmatSivut() {

    const [msg,setMsg] = useState('');

    let navigate = useNavigate();
    useEffect(async () => {
        Axios.get("http://localhost:3001/login").then((response) => {
            if (!localStorage.getItem("user") == ''){
                console.log("Olet kirjautunut sisään käyttäjänä " + localStorage.getItem("user"));
                setMsg("Käyttäjä : "+localStorage.getItem( "user"))
                
            }
            else{
                navigate("/login")
                setMsg("Kirjaudu")
            }
        })
    }, [])

    const [email, setSahkoposti] = useState(localStorage.getItem("user"));
    const [kayttaja, setKayttaja] = useState([]);

    const [id, setID] = useState('');
    const [etunimi, setEtunimi] = useState('');
    const [sukunimi, setSukunimi] = useState('');
    const [nimimerkki, setNimimerkki] = useState('');
    const [esittely, setEsittely] = useState('');
    const [paikkakunta, setPaikkakunta] = useState('');

    const handleLogOut = () => {
        localStorage.clear();
        window.location.reload(true);
    };

    useEffect(async () => {
       Axios.post("http://localhost:3001/kirjautunut",{email: email,}).then((response) => {
            setKayttaja(response.data);            
            console.log('Kirjautunut:',response.data);
            setID(response.data[0].idmatkaaja);
            setEtunimi(response.data[0].etunimi);
            setSukunimi(response.data[0].sukunimi);
            setNimimerkki(response.data[0].nimimerkki);
            setEsittely(response.data[0].esittely);
            setPaikkakunta(response.data[0].paikkakunta);
        });
    }, [])

    const handleEtunimi = event => {
        setEtunimi(event.target.value)
    };
    const handleSukunimi = event => {
        setSukunimi(event.target.value)
    };
    const handleNimimerkki = event => {
        setNimimerkki(event.target.value)
    };
    const handleEsittely = event => {
        setEsittely(event.target.value)
    };
    const handlePaikkakunta = event => {
        setPaikkakunta(event.target.value)
    };
    const handleMuutos = event => {
        event.preventDefault();        
        Axios.post("http://localhost:3001/paivitatiedot",{
            idmatkaaja:id,
            etunimi:etunimi,
            sukunimi:sukunimi,
            nimimerkki:nimimerkki,
            esittely,esittely,
            paikkakunta,paikkakunta,            
        });
        alert(`Päivitys onnistui`);
    };

    
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
                <Nav.Link id='logOut'><Button size='sm' onClick={handleLogOut}>Kirjaudu ulos</Button></Nav.Link>            
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
        <Form.Control name='etunimi' onChange={handleEtunimi} value={etunimi} placeholder="" />
    </Col>
    <Col>
        <Form.Label>Sukunimi</Form.Label>
        <Form.Control name='sukunimi' onChange={handleSukunimi} value={sukunimi} placeholder="" />
    </Col>
    <Col>
        <Form.Label>Nimimerkki</Form.Label>
        <Form.Control name='nimimerkki' onChange={handleNimimerkki} value={nimimerkki} placeholder="" />
    </Col>
    </Row>
    </Form.Group>
    
        <Form.Group className="mb-2" controlId="salasana">
        <Form.Label>Paikkakunta</Form.Label>
        <Form.Control name='paikkakunta' onChange={handlePaikkakunta} value={paikkakunta} type="text" placeholder="" />
        </Form.Group>
    
    
        <FloatingLabel controlId="floatingTextarea2" label="Esittely">
        <Form.Control
        onChange={handleEsittely} 
        value={esittely}
        name='esittely'
        as="textarea"
        placeholder=""
        style={{ height: '100px' }}
        />
        </FloatingLabel>
    

    <Row>
    <Col>
        <Form.Label>Sähköposti</Form.Label>
        <Form.Control name='sahkoposti' value={email} readOnly placeholder="" />
    </Col>
    </Row>
    <br></br>
    <Button variant="success" onClick={handleMuutos}>Tallenna</Button>{' '}
</Form>
</Container>
</div>
    )
    
}
export {OmatSivut};