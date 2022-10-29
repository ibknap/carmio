import React, { useState } from "react"
import PropTypes from 'prop-types';
import { Card, Button, Alert, Form } from "react-bootstrap";
import { microAlgosToString, truncateCarName } from '../../../utils/conversions';
import './CarCard.css';

function CarCard({ address, car, balance, fetchBalance, buyCar, bidCar }) {
  const { image, name, brand, initialPrice, currentBidding, description, sold } = car;

  const [isDetail, setDetail] = useState(false)
  const [biddingPrice, setBiddingPrice] = useState(0)
  const [isBid, setBid] = useState(false)
  const [isBuy, setBuy] = useState(false)

  let isSold = parseInt(microAlgosToString(sold));

  function buyNowFunc() {
    buyCar(car);
    fetchBalance(address)
    setBuy(!isBuy);
  }

  function bidNowFunc() {
    bidCar(car, biddingPrice);
    fetchBalance(address)
    setBid(!isBid);
  }

  return (
    <Card className="car-card">
      <Card.Img variant="top" className="car-card-image" src={image} />

      {/* car basic information */}
      <Card.Body className="car-card-info">
        <Card.Title>{truncateCarName(name)}</Card.Title>
        <Card.Subtitle className="car-card-subtitle">{brand}</Card.Subtitle>
        <Card.Text className="car-card-sub-others">
          Initial price: <b>{microAlgosToString(initialPrice)} ALGO</b>
          <br />
          Current bidding: <b>{microAlgosToString(currentBidding)} ALGO</b>
          <br />
        </Card.Text>
      </Card.Body>

      <div className="car-card-purchase-container">
        {/* car bid information */}
        <Button onClick={isSold === 0 ? () => setBid(!isBid) : false} variant="" disabled={isSold === 0 ? true : false} className="car-card-purchase-btn">Bid Price</Button>
        {/* car buy information */}
        <Button onClick={isSold === 0 ? () => setBuy(!isBuy) : false} variant="" disabled={isSold === 0 ? true : false} className="car-card-purchase-btn">Buy Now</Button>
      </div>

      {/* car sold btn */}
      {isSold === 0 ? <div className="car-sold-btn">Sold</div> : ""}

      {/* car detail card information */}
      <Button onClick={() => setDetail(!isDetail)} variant="" className="car-card-detail-btn">Details</Button>

      {/* card information close btn */}
      {isDetail &&
        <div className="car-card-detail">
          <Button onClick={() => setDetail(!isDetail)} variant="" className="car-card-cancel-btn">X</Button>
          <p>{description}</p>
        </div>
      }

      {/* car bid card */}
      {isBid &&
        <div className="car-card-purchase-detail">
          <Button onClick={() => setBid(!isBid)} variant="" className="car-card-cancel-btn">X</Button>
          <p className="car-card-purchase-title">Bid Now</p>
          <p>
            This allows you to bid around initial price
          </p>
          <hr />
          <p>
            Current bidding: <b>{microAlgosToString(currentBidding)} ALGO</b>
            <br /><br />
            Current Balance: <b>{microAlgosToString(balance)} ALGO</b>
          </p>
          <hr />
          <Form>
            <Form.Control className="formInput" variant="dark" type="number" id="biddingPrice" placeholder="Bidding price in ALGO" onChange={(e) => setBiddingPrice(e.target.value)} />
          </Form>
          <br />
          <Button onClick={() => bidNowFunc(biddingPrice)} variant="" className="car-card-confirm-trans-btn">
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
          <Button onClick={buyNowFunc} variant="" className="car-card-confirm-trans-btn">
            Confirm Transaction
          </Button>
        </div>
      }

    </Card>);
}

CarCard.propTypes = {
  goToCarSection: PropTypes.func,
  address: PropTypes.string.isRequired,
  car: PropTypes.instanceOf(Object).isRequired,
  balance: PropTypes.number,
  fetchBalance: PropTypes.func.isRequired,
  buyCar: PropTypes.func.isRequired,
  bidCar: PropTypes.func.isRequired,
};

export default CarCard;