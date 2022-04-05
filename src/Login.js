import './App.css';
import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, FloatingLabel, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

//Token kirjautuminen ...työn alla

async function loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

function Login({ setToken }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = event => {
        setEmail(event.target.value)
    };
    const handlePasswordChange = event => {
        setPassword(event.target.value)
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            email,
            password
        });
        setToken(token);
    }

    return (
        <Container fluid='md'>
            <div>
                <h1>Ole hyvä ja kirjaudu sisään</h1>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Form.Label>Sähköposti</Form.Label>
                        <Form.Control placeholder='Anna sähköposti' onChange={handleEmailChange} value={email} />
                    </Row>
                    <Row>
                        <Form.Label>Salasana</Form.Label>
                        <Form.Control type='password' placeholder='Anna salasana' onChange={handlePasswordChange} value={password} />
                    </Row>
                    <Row>
                        <div>
                            <Button style={{marginTop : 10}} variant='primary' type='submit' onClick={handleSubmit}>Kirjaudu</Button>
                        </div>
                    </Row>
                </Form>
            </div>
        </Container>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export { Login };