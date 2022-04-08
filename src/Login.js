import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { Container, ModalBody } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { Form, Button, Row, Col, FloatingLabel, Table } from 'react-bootstrap';
import Axios from 'axios';
import { Modal } from 'react-bootstrap';
import { Routes, Route, BrowserRouter as Router, useNavigate } from 'react-router-dom'
import { responsivePropType } from 'react-bootstrap/esm/createUtilityClasses';

//Token kirjautuminen ...työn alla

/*async function loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}*/




function Login({ setToken }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState(false);
    const [msg, setMsg] = useState('');


    /*const handleSubmit = async e => {
        e.preventDefault();
       const token = await loginUser({
            email,
            password
        });
        setToken(token);
    }*/

    Axios.defaults.withCredentials = true; 


    //palauttaa syötetyn sähköpostin ja salasanan
    const login = (e) => {

        Axios.post("http://localhost:3001/login", {
            email: email,
            password: password,

        }).then((response) => {
            console.log(response);

            //jos käyttäjää ei löydy tietokannasta

            if (!response.data.auth) {

                //tulostetaan viesti
                setLoginStatus(false)
                setMsg(response.data.message);

            } else {
                console.log(response.data);
                localStorage.setItem("token", + response.data.token);
                setMsg(response.data.message);
                setLoginStatus(true);
            }

        });

    };
    

    useEffect(async () => {
        Axios.get("http://localhost:3001/login").then((response) => {
            if (response.data.loggedIn == true) {
                setLoginStatus(true)
                setMsg(response.data.user[0].email);
                console.log(response.data)
            }
        })
    }, [])

    return (
        <Container fluid='md'>
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
                            <Nav.Link href="login">Kirjaudu</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Form onSubmit={login}>
                    <h1>Ole hyvä ja kirjaudu sisään</h1>
                    <Row>
                        <Form.Label>Sähköposti</Form.Label>
                        <Form.Control
                            placeholder='Anna sähköposti'
                            type='text'
                            onChange={(e) => { setEmail(e.target.value) }} />
                    </Row>
                    <Row>
                        <Form.Label>Salasana</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Anna salasana'
                            onChange={(e) => { setPassword(e.target.value) }} />
                    </Row>
                    <Row>
                        <div>
                            <Button style={{ marginTop: 10 }} variant='primary' onClick={login}>Kirjaudu</Button>
                        </div>
                    </Row>
                    <p>{msg}</p>
                    
                </Form>
            </div>
        </Container>
    )
}

/*Login.propTypes = {
    setToken: PropTypes.func.isRequired
}*/

export { Login };