import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';

function Matkakohdesivu() {

    const data = [
        {
            "id": 5,
            "kohdenimi": "Pariisi",
            "maa": "Ranska",
            "kuvausteksti": "Kaupunki"
        },
        {
            "id": 6,
            "kohdenimi": "Berliini",
            "maa": "Saksa",
            "kuvausteksti": "Kaupunki"
        },
        {
            "id": 7,
            "kohdenimi": "Helsinki",
            "maa": "Suomi",
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
                        <Nav.Link href="#home">Matkakohteet</Nav.Link>
                        <Nav.Link href="#link">Omat matkat</Nav.Link>
                        <Nav.Link href="#link">Porukan matkat</Nav.Link>
                        <Nav.Link href="#link">Jäsenet</Nav.Link>
                        <Nav.Link href="#link">Omat tiedot</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <h3 style={{ backgroundColor: "lightgray" }}>Matkakohteet</h3><br></br>
            <label>
                Hae matkakohteita: <br></br>
                <input type="text" value={nimi} onChange={(e) => setNimi(e.target.value)} />
            </label>
            <button>Hae</button><br></br>

            <table className='taulu'>
                <thead>
                    <tr>
                        <th scope="col">
                            Matkakohde
                        </th>
                        <th scope="col">
                            Maa
                        </th>
                        <th scope="col">
                            Kuvaus
                        </th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {matkakohteet.map((matkakohde) => (
                        <tr key={matkakohde.id}>
                            <td>
                                <img src='https://i.pravatar.cc/100' alt="" />
                                {matkakohde.kohdenimi}
                            </td>
                            <td>{matkakohde.maa}</td>
                            <td>{matkakohde.kuvausteksti}</td>
                            <td><button>Poista</button></td>
                            <td><button>Muokkaa</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )

}
export { Matkakohdesivu };