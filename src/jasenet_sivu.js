import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Navbar, Table } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';


function Jasensivu() {

    const data = [
        {
            "id": 5,
            "etunimi": "Collins",
            "sukunimi": "Burgess",
            "nimimerkki": "Matkustelija",
            "paikkakunta": "Helsinki",
            "esittely": "Lorem ipsum dolor sit amet"
        },
        {
            "id": 8,
            "etunimi": "Campbell",
            "sukunimi": "Wyatt",
            "nimimerkki": "Reissaaja",
            "paikkakunta": "Kuopio",
            "esittely": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        }
    ]

    const [nimi, setNimi] = useState('');
    const [jasenet, setJasenet] = useState(data);


    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Matkakertomus</Navbar.Brand>
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

            <h3 style={{ backgroundColor: "lightgray" }}>Jäsenet</h3><br></br>
            <Container fluid>
                <Row className="mb-5">
                    <Col>
                        <label>
                            Hae jäsentä nimellä: <br></br>
                            <input type="text" value={nimi} onChange={(e) => setNimi(e.target.value)} />
                        </label>
                        <button>Hae</button><br></br>
                    </Col>
                </Row>


                <Table className="table-light taulu">
                    <thead>
                        <tr>
                            <th scope="col">
                                Nimi
                            </th>
                            <th scope="col">
                                Nimimerkki
                            </th>
                            <th scope="col">
                                Paikkakunta
                            </th>
                            <th scope="col">
                                Esittely
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {jasenet.map((jasen) => (
                            <tr key={jasen.id}>
                                <td>
                                    <div className='flex'>
                                        <div className='kuva'>
                                            <img src='https://i.pravatar.cc/100' alt="" />
                                        </div>
                                        <span>{jasen.etunimi + " " + jasen.sukunimi}</span>
                                    </div>
                                </td>
                                <td>{jasen.nimimerkki}</td>
                                <td>{jasen.paikkakunta}</td>
                                <td className='esittely'>{jasen.esittely}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}
export { Jasensivu };