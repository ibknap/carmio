import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from "react-bootstrap";
import CarCard from './CarCard/CarCard';

const CarContainer = ({ carSection }) => (
    <Container ref={carSection} className="mt-5 mb-5">
        <Row>
            <Col sm={3} className="mt-5">
                <CarCard
                    image="https://images.carexpert.com.au/app/uploads/2022/06/2023-bmw-ix1-xdrive30-HERO.jpg"
                    name="Car name"
                    brand="Car brand name"
                    initialPrice={20.03}
                    currentBidding={30.49}
                    details="Sed ut eros ut velit iaculis facilisis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec malesuada magna ac ante fermentum, eu tempor metus convallis. Pellentesque malesuada urna sit amet luctus feugiat. Vivamus imperdiet nisi laoreet, pellentesque purus sit amet, elementum augue. Nam enim tellus, maximus quis turpis eget, molestie efficitur augue."
                    balance={100.0} />
            </Col>
        </Row>
    </Container>
);

CarContainer.propTypes = {
    goToCarSection: PropTypes.func,
};

export default CarContainer;