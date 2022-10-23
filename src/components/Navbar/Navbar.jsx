import React from "react";
import PropTypes from 'prop-types';
import { microAlgosToString, truncateAddress } from '../../utils/conversions';
import { Button, Container, Nav, Navbar, OverlayTrigger, Tooltip, Alert } from "react-bootstrap";
import './Navbar.css';

function CusNavbar({ logo, balance, address, avatar, login, logout }) {
    const accountInfo = <a href={`https://testnet.algoexplorer.io/address/${address}`} target="_blank" rel="noreferrer" className="text-decoration-none cus-navbar-btn-avatar border-none border-1 cus-primary" variant="">
        <div style={{ width: "40px", background: "#000" }}>
            <img src={avatar} alt="avatar" className="avatar" />
        </div>
        <div style={{ marginLeft: "10px" }}>
            <b>{microAlgosToString(balance)} ALGO</b>
            <br />
            addr: {truncateAddress(address)}
        </div>
    </a>

    const loginBtn = <Button onClick={() => login()} className="cus-navbar-btn border-none border-1 cus-primary" variant="">Login</Button>

    const logoutBtn = <Nav.Link onClick={() => logout()} className="text-white">Logout</Nav.Link>

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
                        {address && createBtn}
                        {address && logoutBtn}
                    </Nav>
                    {address ? accountInfo : loginBtn}
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
    login: PropTypes.func,
    logout: PropTypes.func,
};

export default CusNavbar;