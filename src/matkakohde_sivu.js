import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { Col, Container, NavItem, Row } from 'react-bootstrap';
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

    //Muokkaus ponnahdusikkunan hallinta
    const [showupdate, setShowupdate] = useState(false);
    const handleCloseUpdate = () => setShowupdate(false);
    const handleShowUpdate = (matkakohde) => {
        setIdmatkakohde(matkakohde.idmatkakohde);
        setKohdenimi(matkakohde.kohdenimi);
        setPaikkakunta(matkakohde.paikkakunta);
        setMaa(matkakohde.maa);
        setKuvausteksti(matkakohde.kuvausteksti);
        setKuva(matkakohde.kuva);
        setShowupdate(true);
    }

    //Hakukenttä
    const [haku, setHaku] = useState('');

    //Matkakohteen tiedot
    const [idmatkakohde, setIdmatkakohde] = useState('');
    const [kohdenimi, setKohdenimi] = useState('');
    const [maa, setMaa] = useState('');
    const [paikkakunta, setPaikkakunta] = useState('');
    const [kuvausteksti, setKuvausteksti] = useState('');
    const [kuva, setKuva] = useState();

    //Lista matkakohteista (haetaan alempana tietokannasta)
    const [matkakohteet, setMatkakohteet] = useState([]);

    const kirjautunut = () => {
        if (!localStorage.getItem("user") == '') return true;
        return false;
    };


    //Hae matkakohteet tietokannasta
    useEffect(async () => {
        Axios.get("http://localhost:3001/matkakohde").then((response) => {
            setMatkakohteet(response.data);
        });
    }, [])

    //Luodaan uusi matkakohde tietokantaan
    function handleSubmit(event) {
        event.preventDefault();
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
            Axios.get("http://localhost:3001/matkakohde").then((response) => {
                setMatkakohteet(response.data);
            });
        });
        handleCloseAdd();
      }

      function handleUpdate(event){
        if (idmatkakohde == null) return;

        const url = 'http://localhost:3001/matkakohde/' + idmatkakohde;
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
            Axios.get("http://localhost:3001/matkakohde").then((response) => {
                setMatkakohteet(response.data);
            });
        });
        handleCloseUpdate();
        handleClose();
      }

      function handleRemove(id){
          if (id == null) return;
          console.log(id);
        const url = 'http://localhost:3001/matkakohde/' + id;
        Axios.delete(url).then((res) => {
            Axios.get("http://localhost:3001/matkakohde").then((response) => {
                setMatkakohteet(response.data);
            });
        });
        handleClose();
      }

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
                        <h5 style={{paddingLeft: '1rem'}}>{modal.paikkakunta} - {modal.maa}</h5>
                        <p style={{paddingLeft: '1rem', paddingTop: '2rem'}}>{modal.kuvausteksti}</p>
                    </div>
                </div>
                </Modal.Body>
                {kirjautunut() ? 
                    modal.tarinamaara < 1 ?
                        <Modal.Footer>
                            <Button className="mx-3" variant="primary" onClick={() => handleShowUpdate(modal)} >Muokkaa</Button>
                            <Button variant="danger" onClick={() => handleRemove(modal.idmatkakohde)}>Poista</Button>
                        </Modal.Footer>
                    : ""
                 : ""}
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

            {/* Muokkaa matkakohde */}
            <Modal size="sm" show={showupdate} onHide={handleCloseUpdate}>
                <Modal.Header closeButton>
                    Muokkaa matkakohdetta {kohdenimi}
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
                    <Button className="mx-3" variant="primary" onClick={() => handleUpdate()}>Tallenna</Button>
                    <Button variant="danger" onClick={handleCloseUpdate}>Peruuta</Button>
                </Modal.Footer>
            </Modal>

            <div style={{ backgroundColor: "lightgray" }}>
                <h3 style={{ marginLeft: "1rem" }}>Matkakohteet</h3>
            </div>


            <Container fluid>
                {kirjautunut() ?
                <Button variant="primary" className='my-3' onClick={handleShowAdd}>
                    Lisää matkakohde
                </Button>
                : ""}
                
                <Row xs={2} md={4} className="g-4">
                    {matkakohteet.map((matkakohde)  => (
                        <Col  key={matkakohde.idmatkakohde} onClick={() => {handleShow(); setModal(matkakohde)} }>
                            <Card className='matkakohde' style={{ width: '23vw' }}>
                                <Card.Img variant="top" src={"http://localhost:3001/matkakohde/kuva/"+matkakohde.kuva} />
                                <Card.Body>
                                    <Card.Title>{matkakohde.kohdenimi}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{matkakohde.paikkakunta} - {matkakohde.maa}</Card.Subtitle>
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

    const handleLogOut = () => {
        localStorage.clear();
        window.location.reload(true);
    };

    const kirjautunut = () => {
        if (!localStorage.getItem("user") == '') return true;
        return false;
    };

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
                    
                    {!kirjautunut() ? <Nav.Link><Button variant="outline-primary" size="sm"  onClick={handleShowR}>Rekisteröidy</Button></Nav.Link> : ''}
                    {!kirjautunut() ?<Nav.Link href="login"><Button variant="outline-primary" size="sm"  /* onClick={handleShowK} */>Kirjaudu sisään</Button></Nav.Link> : ''}
                
                    {kirjautunut() ?<Nav.Link><Button id='logOut' size='sm' onClick={handleLogOut}>Kirjaudu ulos</Button></Nav.Link> : ''}
                
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
export { Matkakohdesivu, Ylapalkki };