import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Container, Row, Col } from "react-bootstrap";
import CarCard from './CarCard/CarCard';
import Loader from "../Loader";
import { buyCarAction, createCarAction, deleteCarAction, getCarsAction } from "../../utils/carmio";

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
            })
            .finally(_ => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getCars();
    }, []);

    if (loading) {
        return <Loader />;
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

{/* <Col sm={3} className="mt-5">
    <CarCard
        image="https://images.carexpert.com.au/app/uploads/2022/06/2023-bmw-ix1-xdrive30-HERO.jpg"
        name="BMW xi"
        brand="BMW"
        initialPrice=2.03
        currentBidding=2.03
        details="Sed ut eros ut velit iaculis facilisis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec malesuada magna ac ante fermentum, eu tempor metus convallis. Pellentesque malesuada urna sit amet luctus feugiat. Vivamus imperdiet nisi laoreet, pellentesque purus sit amet, elementum augue. Nam enim tellus, maximus quis turpis eget, molestie efficitur augue."
        balance={100.0} />
</Col> */}

CarContainer.propTypes = {
    goToCarSection: PropTypes.func,
    cars: PropTypes.func.isRequired,
};

export default CarContainer;