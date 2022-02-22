import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import { Container } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';

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
                <Nav.Link href="#link">Matkat</Nav.Link>
            <NavDropdown title="Droppi" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">tänne jotain</NavDropdown.Item>          
            </NavDropdown>
            </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>

    </div>
    )
    
}
export {OmatSivut};