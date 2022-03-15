import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { Form, Button, Row, Col, FloatingLabel, Table } from 'react-bootstrap';
import Axios from 'axios';



function PorukanMatkat() {

    const [katsoPressed, setKatsoPressed] = useState(false);
    const [matkataulu,setMatkataulu] = useState([]);
    const [matka,setMatka] = useState('');
    const [alkupvm,setAlkupvm] = useState('');
    const [loppupvm,setLoppupvm] = useState('');

    /*useEffect(()=>{
        Axios.get('http://localhost:3001/api/get').then((response)=>{
            setMatkataulu(response.data);
        });
    },[]);

    const submitMatka =()=>{
        Axios.post("http://localhost:3001/api/insert",{
          matka: matka,
          alkupvm : alkupvm,
          loppupvm : loppupvm, 
        });
    }*/

    const eventHandler = (event) =>{
    setKatsoPressed = (true);

    }

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
                        
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className='matkataulu'>
                <Form >
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Matkakohde</th>
                                <th>Alku pvm</th>
                                <th>Loppu pvm </th>
                                
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
                            <tr>
                            <td>1</td>
                                <td>Ibiza</td>
                                <td>28.2.2022</td>
                                <td>3.3.2022</td>
                            </tr>
                        </tbody>

                    </Table>



                </Form>
            </div>
        </div>

    )

}
export { PorukanMatkat };