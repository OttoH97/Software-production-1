import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Navbar, Card, Button } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import Axios from 'axios';
import { NavDropdown, Modal, Form} from 'react-bootstrap';

function Matkakohdesivu() {
    const [modal, setModal] = useState('');

    //Matkakohteen lisätietojen ponnahdusikkuna
    const [showpop,setShowpop] = useState(false); 
    const handleClose = () => setShowpop(false);
    const handleShow = () => setShowpop(true);

    //Uuden matkakohteen ponnahdusikkunan hallinta
    const [showadd, setShowadd] = useState(false);
    const handleCloseAdd = () => setShowadd(false);
    const handleShowAdd = () => setShowadd(true);

    //Hakukenttä
    const [haku, setHaku] = useState('');

    //Matkakohteen tiedot
    const [kohdenimi, setKohdenimi] = useState('');
    const [maa, setMaa] = useState('');
    const [paikkakunta, setPaikkakunta] = useState('');
    const [kuvausteksti, setKuvausteksti] = useState('');
    const [kuva, setKuva] = useState();

    //Lista matkakohteista (haetaan alempana tietokannasta)
    const [matkakohteet, setMatkakohteet] = useState([]);

    //Hae matkakohteet tietokannasta
    useEffect(async () => {
        Axios.get("http://localhost:3001/matkakohde").then((response) => {
            setMatkakohteet(response.data);
        });
    }, [])

    //Luodaan uusi matkakohde tietokantaan
    function handleSubmit(event) {
        event.preventDefault()
        const url = 'http://localhost:3001/matkakohde';
        const formData = new FormData();
        formData.append('kuva', kuva);
        formData.append('kohdenimi', kohdenimi);
        formData.append('maa', maa);
        formData.append('paikkakunta', paikkakunta);
        formData.append('kuvausteksti', kuvausteksti);
        const config = {
          headers: {'content-type': 'multipart/form-data',},
        };
        Axios.post(url, formData, config).then((res) => {
            console.log(formData);
          console.log(res.data);
        });
        handleCloseAdd();
      }

    //Testausdata
/*     const data = [
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
    ] */

    return (
        <div>
            <Ylapalkki />

            {/* Esikatselu modal */}
            <Modal size="xl" show={showpop} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                <div className='flex'>
                    <div className='matkakohdekuva'>
                        <img src={"http://localhost:3001/matkakohde/kuva/"+modal.kuva} alt="" />
                    </div>

                    <div>
                        <h2 style={{paddingLeft: '1rem'}}>{modal.kohdenimi}</h2>
                        <h5 style={{paddingLeft: '1rem'}}>{modal.maa}</h5>
                        <p style={{paddingLeft: '1rem', paddingTop: '2rem'}}>{modal.kuvausteksti}</p>
                    </div>
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="mx-3" variant="primary">Muokkaa</Button>
                    <Button variant="danger">Poista</Button>
                </Modal.Footer>
            </Modal>

            {/* Uusi matkakohde */}
            <Modal size="sm" show={showadd} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                    Lisää uusi matkakohde
                </Modal.Header>
                <Modal.Body>
                <div className='flex'>
                    <Form>
                        <Row>
                            <Form.Label>Kuva</Form.Label>
                            <Form.Control type="file" onChange={(e) => setKuva(e.target.files[0])}/>
                        </Row>
                        <Row>
                            <Form.Label>Kohdenimi</Form.Label>
                            <Form.Control placeholder='Pariisi' name="kohdenimi" value={kohdenimi} onChange={(e) => setKohdenimi(e.target.value)} />
                        </Row>
                        <Row>
                            <Form.Label>Maa</Form.Label>
                            <Form.Control placeholder='Ranska' value={maa} onChange={(e) => setMaa(e.target.value)} />
                        </Row>
                        <Row>
                            <Form.Label>Paikkakunta</Form.Label>
                            <Form.Control placeholder='Pariisi' value={paikkakunta} onChange={(e) => setPaikkakunta(e.target.value)} />
                        </Row>
                        <Row>
                            <Form.Label>Kuvausteksti</Form.Label>
                            <Form.Control placeholder='kuvausteksti' value={kuvausteksti} onChange={(e) => setKuvausteksti(e.target.value)} />
                        </Row>
                    </Form>
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="mx-3" variant="primary" onClick={handleSubmit}>Tallenna</Button>
                    <Button variant="danger" onClick={handleCloseAdd}>Peruuta</Button>
                </Modal.Footer>
            </Modal>

            <h3 style={{ backgroundColor: "lightgray" }}>Matkakohteet</h3><br></br>

            <Button variant="primary" onClick={handleShowAdd}>
                Lisää matkakohde
            </Button>

            <Container fluid>
                <Row className="mb-5">
                    <Col>
                        <label>
                            Hae matkakohteita: <br></br>
                            <input type="text" value={haku} onChange={(e) => setHaku(e.target.value)} />
                        </label>
                        <button>Hae</button>
                    </Col>
                </Row>
                <Row xs={2} md={4} className="g-4">
                    {matkakohteet.map((matkakohde)  => (
                        <Col  key={matkakohde.id} onClick={() => {handleShow(); setModal(matkakohde)} }>
                            <Card className='matkakohde' style={{ width: '23vw' }}>
                                <Card.Img variant="top" src={"http://localhost:3001/matkakohde/kuva/"+matkakohde.kuva} />
                                <Card.Body>
                                    <Card.Title>{matkakohde.kohdenimi}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{matkakohde.maa}</Card.Subtitle>
                                    <Card.Text>
                                        {matkakohde.kuvausteksti}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )

}

//Navigointi ja rekisteröinti
function Ylapalkki() {
    const [show, setShow] = useState(false);
    const handleCloseR = () => setShow(false);
    const handleShowR = () => setShow(true);

    const [showK, setShowK] = useState(false);
    const handleCloseK = () => setShowK(false);
    const handleShowK = () => setShowK(true);

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
                    <Nav.Link href="login"><Button variant="outline-primary" size="sm"  /* onClick={handleShowK} */>Kirjaudu sisään</Button></Nav.Link>
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
    </div>
    )
}
export { Matkakohdesivu };