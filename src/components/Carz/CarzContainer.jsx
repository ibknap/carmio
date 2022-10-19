import React from 'react';
import PropTypes from 'prop-types';
import { Container } from "react-bootstrap";

// import './Navbar.css';

const CarzContainer = ({carzSection}) => (
    // <div ref={carzSection} style={{paddingTop: "100px", height: "100rem" }}>
    //     hey <br/>
    //     hey <br/>
    //     hey <br/>
    //     hey <br/>
    //     hey <br/>
    //     hey <br/>
    //     hey <br/>
    //     hey <br/>
    //     hey <br/>
    // </div>
    <Container ref={carzSection} style={{paddingTop: "100px", height: "100rem" }}>
        hey <br/>
        hey <br/>
        hey <br/>
        hey <br/>
        hey <br/>
        hey <br/>
        hey <br/>
        hey <br/>
        hey <br/>
    </Container>
);

CarzContainer.propTypes = {
    goToCarzSection: PropTypes.func,
};

export default CarzContainer;