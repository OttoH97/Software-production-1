import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Navbar, Card, Button } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';

function Matkakohdesivu() {

    const data = [
        {
            "id": 5,
            "kohdenimi": "Pariisi",
            "maa": "Ranska",
            "kuva": "pariisi.jpg",
            "kuvausteksti": "Kaupunki"
        },
        {
            "id": 6,
            "kohdenimi": "Berliini",
            "maa": "Saksa",
            "kuva": "berliini.jpg",
            "kuvausteksti": "Kaupunki"
        },
        {
            "id": 7,
            "kohdenimi": "Helsinki",
            "maa": "Suomi",
            "kuva": "helsinki.jpg",
            "kuvausteksti": "Kaupunki"
        },
        {
            "id": 8,
            "kohdenimi": "Rooma",
            "maa": "Italia",
            "kuva": "italia.jpg",
            "kuvausteksti": "Kaupunki"
        }
    ]

    const [nimi, setNimi] = useState('');
    const [matkakohteet, setMatkakohteet] = useState(data);

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

            <h3 style={{ backgroundColor: "lightgray" }}>Matkakohteet</h3><br></br>

            <Container>
                <Row className="mb-5">
                    <Col>
                        <label>
                            Hae matkakohteita: <br></br>
                            <input type="text" value={nimi} onChange={(e) => setNimi(e.target.value)} />
                        </label>
                        <button>Hae</button>
                    </Col>
                </Row>
                <Row xs={2} md={4} className="g-4">
                    {matkakohteet.map((matkakohde) => (
                        <Col>
                            <Card style={{ width: '16rem' }}>
                                <Card.Img variant="top" src={matkakohde.kuva} />
                                <Card.Body>
                                    <Card.Title>{matkakohde.kohdenimi}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{matkakohde.maa}</Card.Subtitle>
                                    <Card.Text>
                                        {matkakohde.kuvausteksti}
                                    </Card.Text>
                                    <Button className="mx-3" variant="primary">Muokkaa</Button>
                                    <Button variant="danger">Poista</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )

}
export { Matkakohdesivu };