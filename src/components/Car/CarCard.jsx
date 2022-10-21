import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from "react-bootstrap";

// import './Navbar.css';

const CarCard = ({ name, brand, initialPrice, currentBidding, details }) => (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body className="car-card">
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle>{brand}</Card.Subtitle>
        <Card.Text>{details}</Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
);

CarCard.propTypes = {
    goToCarSection: PropTypes.func,
    name: PropTypes.string,
    brand: PropTypes.string,
    initialPrice: PropTypes.number,
    currentBidding: PropTypes.number,
    details: PropTypes.string,
};

export default CarCard;