import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Container, Row, Col, Alert } from "react-bootstrap";
import CarCard from './CarCard/CarCard';
import Loader from "../Loader";
import { buyCarAction, bidCarAction, deleteCarAction, getCarsAction } from "../../utils/carmio";
import { NotificationSuccess, NotificationError } from "../../components/Notifications";
import { toast } from "react-toastify";

const CarContainer = ({ carSection, address, balance }) => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(false);

    const getCars = async () => {
        setLoading(true);
        getCarsAction()
            .then(cars => {
                if (cars) {
                    setCars(cars);
                }
            })
            .catch(error => {
                console.log(error);
                toast(<NotificationError text="Could not get cars details" />);

            })
            .finally(_ => {
                setLoading(false);
            });
    };

    const buyCar = async (car) => {
        setLoading(true);
        buyCarAction(address, car)
            .then(() => {
                toast(<NotificationSuccess text="Car bought successfully" />);
                getCars();
            })
            .catch(error => {
                console.log(error)
                toast(<NotificationError text="Failed to purchase car." />);
                setLoading(false);
            })
    };

    const bidCar = async (car, biddingPrice) => {
        setLoading(true);
        bidCarAction(address, car, biddingPrice)
            .then(() => {
                toast(<NotificationSuccess text="Car bid successfully" />);
                getCars();
            })
            .catch(error => {
                console.log(error)
                toast(<NotificationError text="Failed to bid car." />);
                setLoading(false);
            })
    };

    useEffect(() => {
        getCars();
    }, []);

    if (loading) {
        return <Container className="m-5">
            <Row className="justify-content-center">
                <Col sm={3} className="text-center">
                    <Loader />
                    <br />
                    <Alert variant="info" className="p-2 border-none">
                        Loading Car details!!!
                    </Alert>
                </Col>
            </Row>
        </Container>;
    }

    return (
        <Container ref={carSection} className="mt-5 mb-5">
            <Row>
                {cars.map((car, index) => (
                    <Col key={index} sm={3} className="mt-5">
                        <CarCard car={car} balance={balance} buyCar={buyCar} bidCar={bidCar}/>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

CarContainer.propTypes = {
    goToCarSection: PropTypes.func,
    address: PropTypes.string,
    balance: PropTypes.number,
};

export default CarContainer;