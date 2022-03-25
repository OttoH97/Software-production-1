import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Navbar, Card, Button } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavDropdown, Modal, Form} from 'react-bootstrap';

function Matkakohdesivu() {

    const [show, setShow] = useState(false);

    const handleCloseR = () => setShow(false);
    const handleShowR = () => setShow(true);

    const [showK, setShowK] = useState(false);

    const handleCloseK = () => setShowK(false);
    const handleShowK = () => setShowK(true);


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

/*     useEffect(async () => {
        Axios.get("http://localhost:3001/matkakohteet").then((res)=>{
            setMatkakohteet(res.data)
            });
    }, []) */

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
                        <Nav.Link><Button variant="outline-primary" size="sm"  onClick={handleShowR}>Rekisteröidy</Button></Nav.Link>
                        <Nav.Link><Button variant="outline-primary" size="sm"  onClick={handleShowK}>Kirjaudu sisään</Button></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
                {/* Rekisteröitymisen modal */}
                <Modal show={show} onHide={handleCloseR}>
                    <Modal.Header closeButton>
                        <Modal.Title>Rekisteröidy</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row>
                                <Form.Label>Etunimi</Form.Label>
                                <Form.Control placeholder='' />
                            </Row>
                            <Row>
                                <Form.Label>Sukunimi</Form.Label>
                                <Form.Control placeholder='' />
                            </Row>
                            <Row>
                                <Form.Label>Nimimerkki</Form.Label>
                                <Form.Control placeholder='' />
                            </Row>
                            <Row>
                                <Form.Label>Sähköposti</Form.Label>
                                <Form.Control placeholder='' />
                            </Row>
                            <Row>
                                <Form.Label>Salasana</Form.Label>
                                <Form.Control placeholder='' />
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseR}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleCloseR}>
                            Rekisteröidy
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/*Kirjautumisen modal */}
                <Modal show={showK} onHide={handleCloseK}>
                    <Modal.Header closeButton>
                        <Modal.Title>Kirjaudu sisään</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row>
                                <Form.Label>Sähköposti</Form.Label>
                                <Form.Control placeholder='' />
                            </Row>
                            <Row>
                                <Form.Label>Salasana</Form.Label>
                                <Form.Control placeholder='' />
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseK}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleCloseK}>
                            Kirjaudu
                        </Button>
                    </Modal.Footer>
                </Modal>

            <h3 style={{ backgroundColor: "lightgray" }}>Matkakohteet</h3><br></br>

            <Container fluid>
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
                            <Card style={{ width: '23vw' }}>
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