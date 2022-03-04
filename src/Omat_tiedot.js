//Omat tiedot hallinta
import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { Form, Button, Row, Col,FloatingLabel } from 'react-bootstrap';

function OmatSivut() {

    return(
<div>
    <Navbar bg="light" expand="lg">
        <Container>
        <Navbar.Brand href="#home">Matkakertomus</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="#home">Koti</Nav.Link>
                <Nav.Link href="#link">Tiedot</Nav.Link>
                <Nav.Link href="#link">Omat matkat</Nav.Link>
            <NavDropdown title="Droppi" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">tänne jotain</NavDropdown.Item>          
            </NavDropdown>
            </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>

<Form>
    <Row>
    <Col>
        <Form.Label>Etunimi</Form.Label>
        <Form.Control placeholder="" />
    </Col>
    <Col>
        <Form.Label>Sukunimi</Form.Label>
        <Form.Control placeholder="" />
    </Col>
    <Col>
        <Form.Label>Nimimerkki</Form.Label>
        <Form.Control placeholder="" />
    </Col>
    </Row>

    
        <Form.Group className="mb-2" controlId="salasana">
        <Form.Label>Paikkakunta</Form.Label>
        <Form.Control type="text" placeholder="" />
        </Form.Group>
    
    
        <FloatingLabel controlId="floatingTextarea2" label="Esittely">
        <Form.Control
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
</Form>
</div>
    )
    
}
export {OmatSivut};