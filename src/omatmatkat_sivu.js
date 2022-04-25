//Omat matkat
import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { Form, Button, Row, Col,FloatingLabel,ListGroup,Table,Check } from 'react-bootstrap';
import Axios from 'axios';


function OmatMatkat(){

    const [matka, setMatka] = useState([]);
    const [matkakohde, setMatkakohde] = useState([]);
    const [tarina, setTarina] = useState([]);
    const [kayttaja, setKayttaja] = useState(localStorage.getItem("kayttaja"));
    const [email, setSahkoposti] = useState(localStorage.getItem("user"));

    //matka
    const [alkupaivamaara, setAlkupaivamaara] = useState([]);
    const [loppupaivamaara, setLoppupaivamaara] = useState([]);
    const [matkaajaID, setMatkaajaID] = useState(localStorage.getItem("idmatkaaja"));
    const [yksityinen, setYksityinen] = useState(["0"]);
/*     const handlematkaajaIDChange = event => {
        setMatkaajaID(event.target.value);
    }; */
    //tarina
    const [matkakohdeID, setMatkakohdeID] = useState([]);
    const [paivamaara, setPaivamaara] = useState([]);
    const [tarinaTeksti, setTarinaTeksti] = useState([]);
    const [matkaID, setMatkaID] = useState([]);

    useEffect(async () => { //kirjautuneen tiedot
        await Axios.post("http://localhost:3001/kirjautunut",{email: email,}).then((response) => {
            //setKayttaja(response.data);
            localStorage.setItem("kayttaja", response.data);
            localStorage.setItem("idmatkaaja", response.data[0].idmatkaaja);        
            console.log('Kirjautunut:',response.data); 
            //setMatkaajaID(response.data[0].idmatkaaja);
            console.log(matkaajaID); 
            console.log(response.data[0].idmatkaaja)
                   
         });
                 
     }, [])
     

     useEffect(async () => {
      Axios.post("http://localhost:3001/matkakirjautunut",{idmatkaaja: matkaajaID,}).then((response) => {
             setMatka(response.data);
             console.log('Matkat:',response.data); 

         });
     }, [])

     

     const poistamatka = (id) => {
         Axios.delete('http://localhost:3001/poistamatka/'+[id]); 
     };

    const handlealkupvm = event => {
        setAlkupaivamaara(event.target.value)
    };
    const handleloppupvm = event => {
        setLoppupaivamaara(event.target.value)
    };
    const handleTarina = event => {
        setTarinaTeksti(event.target.value)
    };
    const handleMatkakohdeID = event => {
        setMatkakohdeID(event.target.value)       
    };
    const handleYksityinen = event => {
        if(event.target.checked)        
            setYksityinen("1")
            else
            setYksityinen("0")    
    };

    var currentdate = new Date(); 
        var datetime = currentdate.getFullYear() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getDate(); 



    useEffect(async () => {
        Axios.get("http://localhost:3001/matkakohde").then((response) => {
            setMatkakohde(response.data);
            console.log(matkakohde);
        });
    }, [])

    useEffect(async () => {
        Axios.get("http://localhost:3001/tarina").then((response) => {
            setTarina(response.data);
        });
    }, [])

    const handleMatka = event => {
        event.preventDefault();        
        Axios.post("http://localhost:3001/omatmatkat",{
            idmatkaaja:matkaajaID,
            alkupvm:alkupaivamaara,
            loppupvm:loppupaivamaara,
            yksityinen:yksityinen,
        });
        alert(`Luonti onnistui`);
        window.location.reload(true);
    };

    const rivit = matka.map((val) => {

        const getFormattedDate = (dateStr) => { //Muuttaa JSON päivämäärän normaaliksi.
            const date = new Date(dateStr);
            return date.toLocaleDateString();
          }
        
        return <tr key={val.id}>
            <td>{val.idmatka}</td>
            <td>{getFormattedDate(val.alkupvm)}</td>
            <td>{getFormattedDate(val.loppupvm)}</td>
            <td><Button variant="warning">Muokkaa</Button> <Button onClick={() => {poistamatka(val.idmatka)}} variant="danger">Poista</Button></td>                    
        </tr>
        
    })


    return(
    
        <div>
          
    <Navbar  bg="light" expand="lg">        
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
        
        {
            // Jonkunnäöinen looppi matkakohteille tauluun
        }

    <Container fluid="md">
    <Form>
        <h3>Omat matkat</h3>

    <Table striped bordered hover size="sm">
    <thead>
    <tr>
      <th>Matka</th>
      <th>Alku pvm</th>
      <th>Loppu pvm</th>
      <th>Muokkaa / Poista</th>
    </tr>
    </thead>
    <tbody>
        {rivit}    
    </tbody>

    </Table>

    <br></br>
    <h3>Luo uusi matka</h3>
        
    <Row>
    <Col>
    <Form.Label>Matkakohde</Form.Label>
    <Form.Select onChange={handleMatkakohdeID}>
            <option>Valitse matkakohde</option>
        {matkakohde.map((opt) => (
              <option value={opt.idmatkakohde}>{opt.kohdenimi}</option>
            ))}
    </Form.Select>
    </Col>
    <Col>        
        <Form.Label>Alku pvm</Form.Label>
        <FloatingLabel label="YYYY-MM-DD">
        <Form.Control onChange={handlealkupvm} value={alkupaivamaara} placeholder="" />
        </FloatingLabel>
    </Col>
    <Col>
        <Form.Label>Loppu pvm</Form.Label>
        <FloatingLabel label="YYYY-MM-DD">
        <Form.Control onChange={handleloppupvm} value={loppupaivamaara} placeholder="" />
        </FloatingLabel>
    </Col>
    </Row>

    <br></br>
    <Row><Col>
    <FloatingLabel controlId="floatingTextarea2" label="Tarina">
        <Form.Control
        onChange={handleTarina}
        as="textarea"
        placeholder=""
        style={{ height: '100px' }}
        />
        </FloatingLabel>
        
        
    </Col></Row>

    <Row><Col>
    <Form.Check 
    type="checkbox"
    id="yksityinen"
    label="Yksityinen"
    onChange={handleYksityinen}
    /> 
    
    </Col></Row>
    <br></br>

    <Button variant="success" onClick={handleMatka}>Luo</Button>{' '}
    </Form>
    </Container>
</div>


    )
}
export {OmatMatkat};