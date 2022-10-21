import React, { useState } from "react"
import PropTypes from 'prop-types';
import { Card, Button } from "react-bootstrap";
import './CarCard.css';

function CarCard({ image, name, brand, initialPrice, currentBidding, details }) {
  const [isDetailVisible, setDetailVisible] = useState(false)
  const [isBidVisible, setBidVisible] = useState(false)
  const [isBuyVisible, setBuyVisible] = useState(false)

  return (<Card className="car-card">
    <Card.Img variant="top" className="car-card-image" src={image} />

    <Card.Body className="car-card-info">
      <Card.Title>{name}</Card.Title>
      <Card.Subtitle className="car-card-subtitle">{brand}</Card.Subtitle>
      <Card.Text className="car-card-sub-others">
        Initial price: <b>{initialPrice} ALGO</b>
        <br />
        Current bidding: <b>{currentBidding} ALGO</b>
      </Card.Text>
    </Card.Body>

    <div className="car-card-purchase-container">
      <Button onClick={() => setBidVisible(!isDetailVisible)} variant="" className="car-card-purchase-btn">Bid Price</Button>
      <Button onClick={() => setBuyVisible(!isDetailVisible)} variant="" className="car-card-purchase-btn">Buy Now</Button>
    </div>

    <Button onClick={() => setDetailVisible(!isDetailVisible)} variant="" className="car-card-detail-btn">Details</Button>

    {isDetailVisible &&
      <div className="car-card-detail">
        <Button onClick={() => setDetailVisible(!isDetailVisible)} variant="" className="car-card-detail-cancel-btn">X</Button>
        <p>{details}</p>
      </div>
    }

    {isBidVisible &&
      <div className="car-card-detail">
        <Button onClick={() => setBidVisible(!isBidVisible)} variant="" className="car-card-detail-cancel-btn">X</Button>
        <p>
          Bid Now
        </p>
      </div>
    }

    {isBuyVisible &&
      <div className="car-card-detail">
        <Button onClick={() => setBuyVisible(!isBuyVisible)} variant="" className="car-card-detail-cancel-btn">X</Button>
        <p>
          Buy Now
        </p>
      </div>
    }

  </Card>);
}

CarCard.propTypes = {
  goToCarSection: PropTypes.func,
  name: PropTypes.string,
  brand: PropTypes.string,
  initialPrice: PropTypes.number,
  currentBidding: PropTypes.number,
  details: PropTypes.string,
};

export default CarCard;