import React from 'react';
import PropTypes from 'prop-types';
import { Button } from "react-bootstrap";
import './Header.css';

const Header = ({ headerImg, goToCarContainer }) => (
    <div className="d-flex justify-content-center vh-100" style={{background: "url(" + headerImg + ") no-repeat center", backgroundSize: "90% auto"}}>
        <Button
            onClick={() => goToCarContainer()}
            variant="outline-light"
            className="border-none px-3 mt-3 view-car-btn"
        >
            View Carz
        </Button>
    </div>
);

Header.propTypes = {
    headerImg: PropTypes.string,
    goToCarContainer: PropTypes.func,
};

export default Header;