import React from "react";
import PropTypes from 'prop-types';
import CreateCar from "../../components/Car/CreateCar/CreateCar";
import { microAlgosToString, truncateAddress } from '../../utils/conversions';
import { Button, Container, Nav, Navbar, OverlayTrigger, Tooltip, Alert } from "react-bootstrap";
import { NotificationError, NotificationSuccess } from "../../components/Notifications";
import { createCarAction } from "../../utils/carmio";
import {toast} from "react-toastify";
import './Navbar.css';

function CusNavbar({ logo, balance, address, avatar, login, logout }) {
    const createCarFunc = async (data) => {
        createCarAction(address, data)
            .then(() => toast(<NotificationSuccess text="Car added successfully." />))
            .catch(error => toast(<NotificationError text={`Failed to create a car. \n ERROR: ${error}`} />))
    };
    
    const isAdmin = "ZORSQQE5UXXUAH3VG5AZIO5E55JSVICUE2MWHOWWA2BJCULGFXD6MXYDKE" === address;

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

    const createBtn = !isAdmin ? <OverlayTrigger
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
        <Button
            variant="dark"
            className="rounded-pill py-1 px-5 text-muted"
        >
            Create
            <i className="bi bi-plus"></i>
        </Button>
    </OverlayTrigger> : <CreateCar createNewCar={createCarFunc} />;

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