import React, { useState } from "react"
import PropTypes from 'prop-types';
import { Button, Container, Nav, Navbar, OverlayTrigger, Tooltip, Alert } from "react-bootstrap";
import './Navbar.css';

function CusNavbar({ logo, balance, address, avatar }) {
    const [isAuth, setAuth] = useState(false);

    const loginInfo = <div className="cus-navbar-btn-avatar border-none border-1 cus-primary" variant="">
        <div style={{ width: "40px", background: "#000" }}>
            <img src={avatar} alt="avatar" className="avatar" />
        </div>
        <div style={{ marginLeft: "10px" }}>
            <b>{balance} ALGO</b>
            <br />
            addr: {address}
        </div>
    </div>

    const loginBtn = <Button onClick={() => setAuth(!isAuth)} className="cus-navbar-btn border-none border-1 cus-primary" variant="">Login</Button>

    const logoutBtn = <Nav.Link href="#" onClick={() => setAuth(false)} className="text-white">Logout</Nav.Link>

    const createBtn = <OverlayTrigger
        key="createBtn"
        placement="bottom"
        overlay={
            <Tooltip id="createBtnTooltip">
                <Alert variant="warning" className="p-2 border-none">
                    Only Admin can create car post. Please contact admins!
                </Alert>
            </Tooltip>
        }
    >
        <Nav.Link href="#" className="text-muted">Create</Nav.Link>
    </OverlayTrigger>

    return (
        <Navbar bg="" expand="lg" fixed="top" className="cus-navbar">
            <Container fluid className="px-5">
                <Navbar.Brand href="#">
                    <img src={logo} alt="carmio" width={100} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                        {isAuth && createBtn}
                        {isAuth && logoutBtn}
                    </Nav>
                    {isAuth ? loginInfo : loginBtn}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

CusNavbar.propTypes = {
    logo: PropTypes.string,
    balance: PropTypes.number,
    address: PropTypes.string,
    avatar: PropTypes.string,
};

export default CusNavbar;