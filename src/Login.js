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
//import { responsivePropType } from 'react-bootstrap/esm/createUtilityClasses';
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

    const navigate = useNavigate();
    const toKotisivu = ()  => window.location.href = "http://localhost:3000";
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState(false);
    const [msg, setMsg] = useState('');

    const kirjautunut = () => {
        if (!localStorage.getItem("user") == ''){
            console.log("Olet kirjautunut sisään käyttäjänä " + localStorage.getItem("user"));
        }
        else
            console.log("Et ole kirjautunut sisään vielä!");
    };

    kirjautunut();


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
                localStorage.setItem("user", email); //käyttäjän sähköposti tallennetaan localStorageen
                localStorage.setItem("token", response.data.token); //tokeni tallennetaan localStorageen
                setLoginStatus(true);
                // console.log("user:" + localStorage.getItem("user") + " token:" + localStorage.getItem("token"));
                toKotisivu(); //kirjautumisen jälkeen käyttäjä heitetään takaisin kotisivulle
            }

        });

    };
    
    useEffect(async () => {
        Axios.get("http://localhost:3001/login").then((response) => {
            if (response.data.loggedIn == true) {
                setLoginStatus(true)
                console.log(response.data)
            }
           
        })
    }, [])
    
    const handleLogOut = () => {
        setLoginStatus(false);
        localStorage.clear();
        window.location.reload(true);
    };

    function hideButtons() {
        if (!localStorage.getItem("user") == ''){
            document.getElementById("oMatkat").hidden = false;
            document.getElementById("pMatkat").hidden = false;
            document.getElementById("members").hidden = false;
            document.getElementById("oTiedot").hidden = false;
        }
        else{
            document.getElementById("oMatkat").hidden = true;
            document.getElementById("pMatkat").hidden = true;
            document.getElementById("members").hidden = true;
            document.getElementById("oTiedot").hidden = true;
        }
    };

    return (
        <Container fluid='md'>
            <div onLoad={hideButtons}>

                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/">Matkakertomus</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="matkakohde">Matkakohteet</Nav.Link>
                            {/* <Nav.Link id='oMatkat' href="omatkat">Omat matkat</Nav.Link>
                            <Nav.Link id='pMatkat' href="pmatkat">Porukan matkat</Nav.Link>
                            <Nav.Link id='members' href="jasenet">Jäsenet</Nav.Link>
                            <Nav.Link id='oTiedot' href="otiedot">Omat tiedot</Nav.Link> */}
                            {/* <Nav.Link id='logIn' href="login"><Button id='kirjaudu' variant="outline-primary" size="sm">Kirjaudu sisään</Button></Nav.Link> */}
                            {/* <Nav.Link id='logOut'><Button size='sm' onClick={handleLogOut}>Kirjaudu ulos</Button></Nav.Link> */}
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
                            <Button style={{ marginTop: 10 }} variant='primary' onClick={login} data-testId = "Kirjaudu">Kirjaudu</Button>
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