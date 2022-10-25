import React, { useState } from "react"
import PropTypes from 'prop-types';
import { Card, Button, Alert, Form } from "react-bootstrap";
import { microAlgosToString } from '../../../utils/conversions';
import './CarCard.css';

function CarCard({ image, name, brand, initialPrice, currentBidding, details, balance, sold, appId, owner }) {
  const [isDetail, setDetail] = useState(false)
  const [isBid, setBid] = useState(false)
  const [isBuy, setBuy] = useState(false)

  return (<Card className="car-card">
    <Card.Img variant="top" className="car-card-image" src={image} />

    {/* car basic information */}
    <Card.Body className="car-card-info">
      <Card.Title>{name}</Card.Title>
      <Card.Subtitle className="car-card-subtitle">{brand}</Card.Subtitle>
      <Card.Text className="car-card-sub-others">
        Initial price: <b>{microAlgosToString(initialPrice)} ALGO</b>
        <br />
        Current bidding: <b>{microAlgosToString(currentBidding)} ALGO</b>
      </Card.Text>
    </Card.Body>

    <div className="car-card-purchase-container">
      {/* car bid information */}
      <Button onClick={() => setBid(!isBid)} variant="" className="car-card-purchase-btn">Bid Price</Button>
      {/* car buy information */}
      <Button onClick={() => setBuy(!isBuy)} variant="" className="car-card-purchase-btn">Buy Now</Button>
    </div>

    {/* car detail card information */}
    <Button onClick={() => setDetail(!isDetail)} variant="" className="car-card-detail-btn">Details</Button>

    {/* card information close btn */}
    {isDetail &&
      <div className="car-card-detail">
        <Button onClick={() => setDetail(!isDetail)} variant="" className="car-card-cancel-btn">X</Button>
        <p>{details}</p>
      </div>
    }

    {/* car bid card */}
    {isBid &&
      <div className="car-card-purchase-detail">
        <Button onClick={() => setBid(!isBid)} variant="" className="car-card-cancel-btn">X</Button>
        <p className="car-card-purchase-title">Bid Now</p>
        <p>
          This allows you to bid around initial price
          <hr />
          Current bidding: <b>{microAlgosToString(currentBidding)} ALGO</b>
          <br /><br />
          Current Balance: <b>{microAlgosToString(balance)} ALGO</b>
        </p>
        <hr />
        <Form.Control className="formInput" variant="dark" type="number" id="biddingPrice" placeholder="Bidding price in ALGO" />
        <br />
        <Button onClick={() => setBid(!isBid)} variant="" className="car-card-confirm-trans-btn">
          Confirm Transaction
        </Button>
      </div>
    }

    {/* car buy card */}
    {isBuy &&
      <div className="car-card-purchase-detail">
        <Button onClick={() => setBuy(!isBuy)} variant="" className="car-card-cancel-btn">X</Button>
        <p className="car-card-purchase-title">Buy Now</p>
        <p>
          This allows you to buy at initial price NOW!!!
          <br /><br />
          Initial price: <b>{microAlgosToString(initialPrice)} ALGO</b>
          <br /><br />
          Current Balance: <b>{microAlgosToString(balance)} ALGO</b>
        </p>
        <Alert variant="warning" className="p-2 border-none">
          Please press <b>“Confirm Transaction”</b> to continue with payment.
        </Alert>
        <Button onClick={() => setBuy(!isBuy)} variant="" className="car-card-confirm-trans-btn">
          Confirm Transaction
        </Button>
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
  sold: PropTypes.number,
  appId: PropTypes.number,
  owner: PropTypes.string,
};

export default CarCard;