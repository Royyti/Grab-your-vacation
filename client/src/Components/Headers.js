import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import NavLink from 'react-bootstrap/NavLink';
import { getToken } from '../Api';
import MenuDropdown from './MenuDropdown.jsx';


const Headers = () => {
    const token = getToken();
    return <div>

        <Navbar sticky="top" style={{ backgroundColor: "#00496d" }}>
            <Container fluid>
                <Navbar.Brand as={Link} to={"/"}>
                    <div style={{ height: "5rem", width: "5rem" }}>
                        <Image
                            src="/images/logo2.png"
                            alt="logo"
                            roundedCircle
                            style={{
                                objectFit: "contain",
                                maxWidth: "100%",
                                height: "auto",
                            }}
                        />
                    </div>

                </Navbar.Brand>
                <Nav className="me-auto">

                    <NavLink as={Link} style={{ color: "whitesmoke" }} to="/">
                        Home
                    </NavLink>
                    <NavLink as={Link} style={{ color: "whitesmoke" }} to="/vacations">
                        Vacations
                    </NavLink>
                    <NavLink as={MenuDropdown} title="Menu"></NavLink>

                </Nav>


            </Container>
        </Navbar>


    </div>
}
export default Headers;