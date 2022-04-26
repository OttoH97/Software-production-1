import logo from './logo.svg';
import './App.css';
import { Ylapalkki } from './matkakohde_sivu';
import { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Navbar, Table } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import Axios from 'axios';
import { Routes, Route, BrowserRouter as Router, useNavigate } from 'react-router-dom'


function Jasensivu() {

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

    const [nimi, setNimi] = useState('');
    const [jasenet, setJasenet] = useState([]);

    //Hae jäsenet tietokannasta
    useEffect(async () => {
        Axios.get("http://localhost:3001/matkaaja").then((response) => {
            setJasenet(response.data);
        });
    }, [])
    
    const [show,setShow] = useState(false);
    const [modal, setModal] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Ylapalkki/>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                <div className='flex'>
                    <div className='text-center'>
                        <div className='jasenkuva'>
                            <img src='https://i.pravatar.cc/100' alt="" />
                        </div>
                        <h6 style={{paddingLeft: '1rem'}}>{modal.nimimerkki}</h6>
                        <p style={{paddingLeft: '1rem'}}>{modal.etunimi} {modal.sukunimi}</p>
                        <p style={{paddingLeft: '1rem'}}>{modal.paikkakunta}</p>
                    </div>
                    <p style={{paddingLeft: '3rem', alignSelf: 'center'}}>{modal.esittely}</p>
                </div>
                </Modal.Body>
            </Modal>

            <div style={{ backgroundColor: "lightgray" }}>
                <h3 style={{ marginLeft: "1rem" }}>Jäsenet</h3>
            </div>
            
            <Container fluid>


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
                            <tr key={jasen.idmatkaaja} onClick={() => {handleShow(); setModal(jasen)} }>
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