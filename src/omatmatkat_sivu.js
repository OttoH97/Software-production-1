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
import { Modal } from 'react-bootstrap';
import { Routes, Route, BrowserRouter as Router, useNavigate } from 'react-router-dom'


function OmatMatkat(){

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
    const [kuvaus, setKuvaus] = useState([]);

    //tarina
    const [matkakohdeID, setMatkakohdeID] = useState([]);
    const [paivamaara, setPaivamaara] = useState([]);
    const [tarinaTeksti, setTarinaTeksti] = useState([]);
    const [matkaID, setMatkaID] = useState("");

    //Muokkaus
    const [tarinaTekstim, setTarinaTekstim] = useState([]);
    const [alkupaivamaaram, setAlkupaivamaaram] = useState('');
    const [loppupaivamaaram, setLoppupaivamaaram] = useState('');
    const [matkaIDm, setMatkaIDm] = useState("");
    const [kuvausm, setKuvausm] = useState([]);

    useEffect(async () => {
        setMatkamuokkaus(null)
    }, [])
    const [matkamuokkaus, setMatkamuokkaus] = useState([]);


    const handleLogOut = () => {
        localStorage.clear();
        window.location.reload(true);
    };

    useEffect(async () => { //kirjautuneen tiedot
        await Axios.post("http://localhost:3001/kirjautunut",{email: email,}).then((response) => {
            //setKayttaja(response.data);
            localStorage.setItem("kayttaja", response.data);
            localStorage.setItem("idmatkaaja", response.data[0].idmatkaaja);        
            console.log('Kirjautunut:',response.data); 
            //setMatkaajaID(response.data[0].idmatkaaja);
            console.log("idmatkaaja: " + matkaajaID);             
         });
                 
     }, [])
     

     useEffect(async () => {
        Axios.post("http://localhost:3001/matkakirjautunut",{idmatkaaja: matkaajaID,}).then((response) => {
             setMatka(response.data);
             console.log('Matkat:',response.data); 

         });
     }, [])

     

     const poistamatka = (id) => {
         Axios.delete('http://localhost:3001/poistamatka/' + id);
         setTimeout(() => {window.location.reload(true);},1500);         
     };

     const etsimatka = (mid) => {
        Axios.get('http://localhost:3001/etsimatka/' + mid).then((response) => {
            console.log('matkamuokkaus: ',matkamuokkaus)
            setAlkupaivamaaram(aikamuutos(response.data[0].alkupvm))
            setLoppupaivamaaram(aikamuutos(response.data[0].loppupvm))
            setKuvausm(response.data[0].kuvaus)
            setMatkaIDm(response.data[0].idmatka)
        });
    };

    const etsitarina = (mid) => {
        Axios.post('http://localhost:3001/etsitarina/' + mid).then((response) => {
            console.log(response.data)
            setTarinaTekstim(response.data[0].teksti.toString())
        });
    };

    const handlekuvaus = event => {
        setKuvaus(event.target.value)
    };
    const handlekuvausm = event => {
        setKuvausm(event.target.value)
    };
    const handlealkupvm = event => {
        setAlkupaivamaara(event.target.value)
    };
    const handleloppupvm = event => {
        setLoppupaivamaara(event.target.value)
    };
    const handlealkupvmm = event => {
        setAlkupaivamaaram(event.target.value)
    };
    const handleloppupvmm = event => {
        setLoppupaivamaaram(event.target.value)
    };
    const handleTarina = event => {
        setTarinaTeksti(event.target.value)
    };
    const handleTarinam = event => {
        setTarinaTekstim(event.target.value)
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

    const handleShowR = () => setShow(true);
        const [show, setShow] = useState(false);
        const handleCloseR = () => {
            setShow(false)
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

    //Matkan luonti
    const handleMatka = () => {             
        Axios.post("http://localhost:3001/omatmatkat",{
              idmatkaaja:matkaajaID,
              alkupvm:alkupaivamaara,
              loppupvm:loppupaivamaara,
              yksityinen:yksityinen,
              kuvaus:kuvaus,
              
          })
          .then(function(response)  {
              console.log(response.data.insertId.toString());
              
    
          Axios.post("http://localhost:3001/omatmatkatTarina",{
              idmatkakohde:matkakohdeID,
              pvm:datetime,
              teksti:tarinaTeksti,
              idmatka:response.data.insertId,
          })    
      }).catch(function (error){
            console.log(error)
          })
        setTimeout(() => {window.location.reload(true);},1500);
      }

      //Muokkaus
    const handleMuokkaus = () => {
        Axios.post('http://localhost:3001/paivitamatka', {
            alkupvm:alkupaivamaaram,
            loppupvm:loppupaivamaaram,
            idmatka:matkaIDm,
            teksti:tarinaTekstim,
            kuvaus:kuvausm,
        });
    };
    const handleMuokkausM = () => {
        Axios.post('http://localhost:3001/paivitatarina', {
            idmatka:matkaIDm,
            teksti:tarinaTekstim,
        });
        setTimeout(() => {window.location.reload(true);},1500);
    };
      
      const aikamuutos = ((val) =>{
          var aika = new Date(val);           
            return aika.toLocaleDateString("sv-SE");
      })
      
  
    const rivit = matka.map((val) => {
        const getFormattedDate = (dateStr) => { //Muuttaa JSON päivämäärän normaaliksi. 
            const date = new Date(dateStr);
            return date.toLocaleDateString("sv-SE");
          }        
        return <tr key={val.id}>
            <td>{val.kuvaus}</td>
            <td>{val.idmatka}</td>
            <td>{getFormattedDate(val.alkupvm)}</td>
            <td>{getFormattedDate(val.loppupvm)}</td>
            <td><Button onClick={()=>{etsimatka(val.idmatka);etsitarina(val.idmatka);}} variant="warning">Muokkaa</Button> <Button onClick={() => {poistamatka(val.idmatka)}} variant="danger">Poista</Button></td>                    
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
                <Nav.Link id='logOut'><Button size='sm' onClick={handleLogOut}>Kirjaudu ulos</Button></Nav.Link>          
            </Nav>
        </Navbar.Collapse>        
    </Navbar>
        

    <Container fluid="md">
    <Form>
        <h3>Omat matkat</h3>

    <Table striped bordered hover size="sm">
    <thead>
    <tr>
        <th>Kuvaus</th>
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
    <Row><Col>
    <Form.Label>Matka nimi</Form.Label>
        <FloatingLabel label="Matka nimi">
        <Form.Control onChange={handlekuvaus} value={kuvaus} placeholder="" />
        </FloatingLabel>
    </Col></Row>
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

    <Button variant="success" onClick={handleMatka}>Luo matka</Button>{' '}
    </Form>
    <br></br>
    <h2>Muokkaa</h2>
    <Row><Col>
    <Form.Label>Matka nimi</Form.Label>
        <FloatingLabel label="Matka nimi">
        <Form.Control onChange={handlekuvausm} value={kuvausm} placeholder="" />
        </FloatingLabel>
    </Col></Row>
            <Row>
            <Col>        
        <Form.Label>Alku pvm</Form.Label>
        <FloatingLabel label="YYYY-MM-DD">
        <Form.Control onChange={handlealkupvmm} value={alkupaivamaaram} placeholder="" />
        </FloatingLabel>
    </Col>
    <Col>
        <Form.Label>Loppu pvm</Form.Label>
        <FloatingLabel label="YYYY-MM-DD">
        <Form.Control onChange={handleloppupvmm} value={loppupaivamaaram} placeholder="" />
        </FloatingLabel>
    </Col>
    </Row>
    <br></br>
    <Row>
    <Col>
    <FloatingLabel controlId="floatingTextarea2" label="Tarina">
        <Form.Control
        onChange={handleTarinam}
        value={tarinaTekstim}
        as="textarea"
        placeholder=""
        style={{ height: '100px' }}
        />
        </FloatingLabel>
    </Col>   
    </Row>
    <br></br>
    <Button variant="success" onClick={()=>{handleMuokkaus();handleMuokkausM();}} >Muokkaa matkaa</Button>{' '}
    </Container>
</div>


)
        }
export {OmatMatkat};