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
import {Routes, Route, BrowserRouter as Router,useNavigate} from 'react-router-dom'



function PorukanMatkat() {

    
    const [user,setUser] = useState(null);
    

    const loginDone = (loggedUser) =>{setUser(loggedUser);}

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
             
                {user ? 
                <Taulu /> : <Kirjaudu onLogin = {(user) => loginDone(user)} />} 
            
        </div>

    )

}


export const Taulu = (props) => {
    const [matkataulu, setMatkataulu] = useState([]);

    const [tarina,setTarina] = useState([]);

    const [showT, setShowT] = useState(false);
    const [matka,setMatka] = useState('')
    const [modalData,setModalData] = useState(null);
    

    const showStory = () => setShowT(true);
    const closeStory = () => setShowT(false);
    


    useEffect(async () => {
        Axios.get("http://localhost:3001/matkakohdejatarina").then((response) => {
            setMatkataulu(response.data);
            console.log(response.data);

        });
    }, [])

    
    
    const rivit = matkataulu.map((val) => {
        return <tr key={val.id}>
            <td>{val.idmatkakohde}</td>
            <td>{val.kohdenimi}</td>
            <td>{val.maa}</td>
            <td>{val.paikkakunta}</td>
            <td>{val.kuvausteksti}</td>
            <td>{val.kuva}</td>
            <td><Button
                variant="primary"
                onClick={()=>{setModalData(val.teksti);showStory(true)}}>Katso</Button></td>
                
            
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
                
                <Modal show={showT} onHide={closeStory} >
                    <Modal.Header closeButton>
                        Tarina
                    </Modal.Header>

                    <ModalBody>
                   {modalData}
                    </ModalBody>

                </Modal>
                

            </Form>
        </div>
    )

}
export const Kirjaudu = (props) => {

    let navigate = useNavigate();

    const [etunimi, setEtunimi] = useState('');
    const [hlonro, setHloNro] = useState('');

    const onClick = (event) => {
        if (props.onLogin != null) {

            props.onLogin(etunimi + ',' + hlonro);
            console.log(props.onLogin)
            navigate("/pmatkat")

        }
    }

    return (
        <div>

            <label>
                Etunimi
                <input
                    type="text"
                    value={etunimi}
                    onChange={(e) => setEtunimi(e.target.value)} />
            </label>

            <label>
                Henkilönumero
                <input
                    type="text"
                    value={hlonro}
                    onChange={(e) => setHloNro(e.target.value)} />

            </label>

            <button onClick={(e) => onClick(e)}>Kirjaudu</button>

        </div>

    )

}
export { PorukanMatkat };