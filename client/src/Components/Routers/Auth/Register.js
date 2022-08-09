import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, Navigate } from "react-router-dom";
import { setRegisterUser } from '../../../Api'
import { store } from "../../../store/store";
import { setUserAction } from "../../../store/user.actions";

const Register = () => {


    const [hasError, setHasError] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(undefined);

    const body = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password
    }

    const onClickRegister = (e) => {
        e.preventDefault();
        setRegisterUser(body)
            .then(res => {
                store.dispatch({
                    type: setUserAction,
                    payload: res
                });
                return res
            })
            .then(res => {
                setToken(res.token); return res.token
            })
            .then(res => sessionStorage.setItem('token', res))
            .catch(err => {
                setHasError(true);
                alert('Existing user in the system, please choose another user')
                console.log(err.message)
            })

    }
    return <div>
        <Container className="mt-5">
            <Row>
                < Col md={{ span: 4, offset: 4 }}>
                    <h3>Register:</h3>
                    <Form >
                        <Form.Group className="mb-3" controlId="formBasicFirstNname">
                            <Form.Label>First name</Form.Label>
                            <Form.Control type="text" placeholder="First name" onChange={f => setFirstName(f.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicLastName">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control type="text" placeholder="Last name" onChange={l => setLastName(l.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" onChange={u => setUsername(u.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={p => setPassword(p.target.value)} required />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={onClickRegister}>
                            Register
                        </Button>
                        <p> Already user? Please  <Link to='/login'>login</Link> </p>
                    </Form>

                    {token ? <Navigate to="/vacations" replace={true} /> : <></>}
                </Col>
            </Row>
        </Container>



    </div>
}

export default Register;