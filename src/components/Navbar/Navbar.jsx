import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import './Navbar.css';

const CusNavbar = ({ logo, login }) => (
    <Navbar bg="" expand="lg" fixed="top" className="cus-navbar">
        <Container fluid className="px-5">
            <Navbar.Brand href="#">
                <img src={logo} alt="carmio" width={100} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    navbarScroll
                >
                </Nav>
                <Button className="cus-navbar-btn border-none border-1 cus-primary" variant="">Login</Button>
            </Navbar.Collapse>
        </Container>
    </Navbar>
);

CusNavbar.propTypes = {
    logo: PropTypes.string,
    login: PropTypes.func,
};

export default CusNavbar;