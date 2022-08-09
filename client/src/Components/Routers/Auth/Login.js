import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, Navigate } from "react-router-dom";
import { getLoginUser } from "../../../Api";
import { store } from "../../../store/store";
import { setUserAction } from "../../../store/user.actions";


const Login = () => {
    const [hasError, setHasError] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(undefined);

    const body = {
        username: username,
        password: password
    }

    const onClickLogin = (e) => {
        e.preventDefault();
        setHasError(false);

        getLoginUser(body)
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
                alert('invalid password or username!!')
                console.log(err.message)
            })

    }

    return <div>
        <Container className="mt-5">
            <Row>
                < Col md={{ span: 4, offset: 4 }}>
                    <h3>Login:</h3>
                    <Form >
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" onChange={u => setUsername(u.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={p => setPassword(p.target.value)} required />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={onClickLogin}>
                            Login
                        </Button>
                        <p> New here? Please  <Link to='/register'>register</Link> </p>
                    </Form>
                    {token ? <Navigate to="/vacations" replace={true} /> : <></>}


                </Col>
            </Row>
        </Container>



    </div>
}

export default Login;