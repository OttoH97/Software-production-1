//Omat matkat
import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { Form, Button, Row, Col,FloatingLabel,ListGroup,Table } from 'react-bootstrap';


function OmatMatkat(){


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

        {
            // Jonkunnäöinen looppi matkakohteille tauluun
        }

    <Container fluid="md">
    <Form>
        <h3>Omat matkat</h3>

    <Table striped bordered hover size="sm">
    <thead>
    <tr>
      <th>#</th>
      <th>Matkakohde</th>
      <th>Alku pvm</th>
      <th>Loppu pvm</th>
      <th>Muokkaa / Poista</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>1</td>
      <td>Moskova</td>
      <td>1.1.2022</td>
      <td>30.1.2022</td>
      <td><Button variant="warning">Muokkaa</Button> <Button variant="danger">Poista</Button></td>
    </tr>    
    </tbody>

    </Table>

    <br></br>
    <h3>Luo uusi matka</h3>

    <Row>
    <Col>
        <Form.Label>Matkakohde</Form.Label>
        <Form.Control placeholder="" />
    </Col>
    <Col>
        <Form.Label>Alku pvm</Form.Label>
        <Form.Control placeholder="" />
    </Col>
    <Col>
        <Form.Label>Loppu pvm</Form.Label>
        <Form.Control placeholder="" />
    </Col>
    </Row>

    <br></br>

    <FloatingLabel controlId="floatingTextarea2" label="Tarina">
        <Form.Control
        as="textarea"
        placeholder=""
        style={{ height: '100px' }}
        />
        </FloatingLabel>
        <br></br>
        <Button variant="success">Luo</Button>{' '}
    
    </Form>
    </Container>
</div>


    )
}
export {OmatMatkat};