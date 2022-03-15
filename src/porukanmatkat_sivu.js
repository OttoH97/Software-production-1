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
    const [matkataulu, setMatkataulu] = useState([]);

    useEffect(async () => {
        Axios.get("http://localhost:3001/matkakohde").then((response) => {
            setMatkataulu(response.data);
            console.log(response.data);

        });
    }, [])



    const eventHandler = (event) => {
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

            <Taulu matkataulu = {matkataulu}/>
    
        </div>

    )

}

export const Taulu = (props) => {

    const { matkataulu } = props;

    const rivit = matkataulu.map((val) => {
        return <tr key={val.id}>
            <td>{val.idmatkakohde}</td>
            <td>{val.kohdenimi}</td>
            <td>{val.maa}</td>
            <td>{val.paikkakunta}</td>
            <td>{val.kuvausteksti}</td>
            <td>{val.kuva}</td>
            <td><Button variant="primary">Katso</Button> </td>

        </tr>
    })
    return (
        <div className='matkataulu'>

            <Form >
                <Table striped bordered hover size="sm">

                    <thead>
                        <tr>
                            <th>#Id</th>
                            <th>Kohdenimi</th>
                            <th>Maa</th>
                            <th>Paikkakunta </th>
                            <th>kuvausteksti </th>
                            <th>Kuva </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rivit}
                    </tbody>
                </Table>


            </Form>
        </div>
    )

}
export { PorukanMatkat };