import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from "react-bootstrap";
import CarCard from './CarCard';

const CarContainer = ({ carSection }) => (
    <Container ref={carSection} style={{ paddingTop: "100px", height: "100rem" }}>
        <Row>
            <Col sm={3}>
                <CarCard name="Car name" brand="Car brand name" initialPrice={20} currentBidding={30.4} details="car details details"/>
            </Col>
        </Row>
    </Container>
);

CarContainer.propTypes = {
    goToCarSection: PropTypes.func,
};

export default CarContainer;