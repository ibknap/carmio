import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Container, Row, Col, Alert } from "react-bootstrap";
import CarCard from './CarCard/CarCard';
import Loader from "../Loader";
import { buyCarAction, deleteCarAction, getCarsAction } from "../../utils/carmio";
import { NotificationError } from "../../components/Notifications";
import {toast} from "react-toastify";

const CarContainer = ({ carSection, address, fetchBalance }) => {
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
                        <CarCard
                            image={car.image}
                            name={car.name}
                            brand={car.brand}
                            initialPrice={car.initialPrice}
                            currentBidding={car.currentBidding}
                            details={car.description}
                            balance={fetchBalance}
                            sold={car.sold}
                            appId={car.appId}
                            owner={car.owner} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

CarContainer.propTypes = {
    goToCarSection: PropTypes.func,
};

export default CarContainer;