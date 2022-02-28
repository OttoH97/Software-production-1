import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { Form, Button, Row, Col, FloatingLabel, Table } from 'react-bootstrap';



function PorukanMatkat() {

    const [katsoPressed, setKatsoPressed] = useState(false);

    const eventHandler = (event) =>{
    setKatsoPressed = (true);

    }

    return (


        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Matkakertomus</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Koti</Nav.Link>
                            <Nav.Link href="#link">Tiedot</Nav.Link>
                            <NavDropdown title="Droppi" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">123</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className='matkataulu'>
                <Form >
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Matkakohde</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Helsinki</td>
                                <td>1.1.2022</td>
                                <td>30.1.2022</td>
                                <td><Button onClick={(e)=>eventHandler()} >Katso</Button></td>
                            </tr>
                        </tbody>

                    </Table>



                </Form>
            </div>
        </div>

    )

}
export { PorukanMatkat };