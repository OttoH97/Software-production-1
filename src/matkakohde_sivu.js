import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import { Container } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';

function Matkakohdesivu() {

    const data = [
        {
          "id": 5,
          "nimi": "Lontoo",
        },
        {
            "id": 5,
            "nimi": "Berliini",
          },
        {
            "id": 8,
            "nimi": "Helsinki"
        }
        ]

    const [nimi, setNimi] = useState('');
    const [matkakohteet, setMatkakohteet] = useState(data);

    return(
<div>
    <Navbar bg="light" expand="lg">
        <Container>
        <Navbar.Brand href="#home">Matkakertomus</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="#home">Koti</Nav.Link>
                <Nav.Link href="#link">Tiedot</Nav.Link>
                <Nav.Link href="#link">Matkat</Nav.Link>
            <NavDropdown title="Droppi" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">tänne jotain</NavDropdown.Item>          
            </NavDropdown>
            </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>

    <h3 style={{backgroundColor: "lightgray"}}>Matkakohteet</h3><br></br>
    <label>
        Hae matkakohteita: <br></br>
        <input type="text" value={nimi} onChange={(e) =>setNimi(e.target.value)}/>
    </label>
    <button>Hae</button><br></br>

    <table className="taulu">
    <thead>
            <tr>
                <th scope="col">
                Matkakohde
                </th>
            </tr>
        </thead>
        <tbody>
        {matkakohteet.map((matkakohde) => (
            <tr key={matkakohde.id}>
                <td>{matkakohde.nimi}</td>
            </tr>
           ))}
            </tbody>
        </table>

    </div>
    )
    
}
export {Matkakohdesivu};