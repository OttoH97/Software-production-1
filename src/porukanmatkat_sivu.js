import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { Container, ModalBody } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { Form, Button, Row, Col, FloatingLabel, Table } from 'react-bootstrap';
import Axios from 'axios';
import { Modal } from 'react-bootstrap';
import { Routes, Route, BrowserRouter as Router, useNavigate } from 'react-router-dom'



function PorukanMatkat() {

    const [msg,setMsg] = useState('');

    let navigate = useNavigate();
    useEffect(async () => {
        Axios.get("http://localhost:3001/login").then((response) => {
            if (!localStorage.getItem("user") == ''){
                console.log("Olet kirjautunut sisään käyttäjänä " + localStorage.getItem("user"));
                setMsg("Käyttäjä : "+localStorage.getItem( "user"))
                
            }
            else{
                navigate("/login")
                setMsg("Kirjaudu")
            }
        })
    }, [])

    const handleLogOut = () => {
        localStorage.clear();
        window.location.reload(true);
        setMsg("");
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
                        <Nav.Link><Button size='sm' onClick={handleLogOut}>Kirjaudu ulos</Button></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <p>{msg}</p>
            <Taulu />
            

        </div>

    )

}


export const Taulu = (props) => {
    const [matkataulu, setMatkataulu] = useState([]);
    const [showT, setShowT] = useState(false);
    const [modalData, setModalData] = useState(null);


    const showStory = () => setShowT(true);
    const closeStory = () => setShowT(false);

    useEffect(async () => {
        Axios.get("http://localhost:3001/matkakohdejatarina").then((response) => {
            setMatkataulu(response.data);
            console.log(response.data);

        });
    }, [])

    const rivit = matkataulu.map((val) => {


        return <tr key={val.idmatkakohde}>
            {/* <td>{val.idmatkakohde}</td> */}
            <td>{val.kohdenimi}</td>
            <td>{val.maa}</td>
            <td>{val.paikkakunta}</td>
            <td>{val.kuvausteksti}</td>
            <td><Button
                variant="primary"
                onClick={() => { setModalData(val.teksti); showStory(true) }}>Katso</Button></td>


        </tr>


    })


    return (
        <div className='matkataulu'>

            <Form >
                <Table striped bordered hover size="sm">

                    <thead>
                        <tr>
                            {/* <th>#Id</th> */}
                            <th>Kohdenimi</th>
                            <th>Maa</th>
                            <th>Paikkakunta </th>
                            <th>Kuvaus </th>
                            <th>Tarina</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rivit}
                    </tbody>
                </Table>

                <Modal show={showT} onHide={closeStory} >
                    <Modal.Header closeButton>
                        <h1>Tarina</h1>
                    </Modal.Header>

                    <ModalBody>
                        {modalData}
                    </ModalBody>

                </Modal>
            </Form>
        </div>
    )

}


export { PorukanMatkat };