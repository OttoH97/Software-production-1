//Omat matkat
import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { Form, Button, Row, Col,FloatingLabel,ListGroup,Table } from 'react-bootstrap';
import Axios from 'axios';


function OmatMatkat(){

    const [matka, setMatka] = useState([]);
    const [matkakohde, setMatkakohde] = useState([]);
    const [tarina, setTarina] = useState([]);

    useEffect(async () => {
        Axios.get("http://localhost:3001/matka").then((response) => {
            setMatka(response.data);
            console.log(matka);
        });
    }, [])

    useEffect(async () => {
        Axios.get("http://localhost:3001/matkakohde").then((response) => {
            setMatkakohde(response.data);
            console.log(matkakohde);
        });
    }, [])

    useEffect(async () => {
        Axios.get("http://localhost:3001/tarina").then((response) => {
            setTarina(response.data);
        });
    }, [])

    const rivit = matka.map((val) => {

        const getFormattedDate = (dateStr) => { //Muuttaa JSON päivämäärän normaaliksi.
            const date = new Date(dateStr);
            return date.toLocaleDateString();
          }
        
        return <tr key={val.id}>
            <td>{val.idmatka}</td>
            <td>{getFormattedDate(val.alkupvm)}</td>
            <td>{getFormattedDate(val.loppupvm)}</td>
            <td><Button variant="warning">Muokkaa</Button> <Button variant="danger">Poista</Button></td>                    
        </tr>
        
    })


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
      <th>Matka</th>
      <th>Alku pvm</th>
      <th>Loppu pvm</th>
      <th>Muokkaa / Poista</th>
    </tr>
    </thead>
    <tbody>
        {rivit}    
    </tbody>

    </Table>

    <br></br>
    <h3>Luo uusi matka</h3>

    <Row>
    <Col>
    <Form.Label>Matkakohde</Form.Label>
    <Form.Select>
        <option>Valitse matkakohde</option>
        {matkakohde.map((opt) => (
              <option value={opt.kohdenimi}>{opt.kohdenimi}</option>
            ))}
    </Form.Select>
    </Col>
    <Col>        
        <Form.Label>Alku pvm</Form.Label>
        <FloatingLabel label="YYYY-MM-DD">
        <Form.Control id='alkupvm' placeholder="" />
        </FloatingLabel>
    </Col>
    <Col>
        <Form.Label>Loppu pvm</Form.Label>
        <FloatingLabel label="YYYY-MM-DD">
        <Form.Control id='loppupvm' placeholder="" />
        </FloatingLabel>
    </Col>
    </Row>

    <br></br>

    <FloatingLabel controlId="floatingTextarea2" label="Tarina">
        <Form.Control
        id='tarina'
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