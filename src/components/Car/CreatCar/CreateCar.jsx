import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { stringToMicroAlgos } from "../../../utils/conversions";
import './CreateCar.css';

const CreateCar = ({ createNewCar }) => {
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [initialPrice, setInitialPrice] = useState(0);
    const [currentBidding, setCurrentBidding] = useState(0);
    const [description, setDescription] = useState("");

    const isFormFilled = useCallback(() => {
        return image && name && brand && initialPrice > 0 && currentBidding > 0 && description;
    }, [image, name, brand, initialPrice, currentBidding, description]);

    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    return (
        <>
            <Button
                onClick={handleShowModal}
                variant="dark"
                className="rounded-pill py-1 px-5"
            >
                Create
                <i className="bi bi-plus"></i>
            </Button>
            <Modal show={showModal} onHide={handleCloseModal} centered scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Car Post</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <FloatingLabel
                            controlId="inputImage"
                            label="Car Image"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                className="formInput"
                                placeholder="Enter car image URL"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="inputName"
                            label="Name"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                className="formInput"
                                placeholder="Enter car name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="inputBrand"
                            label="Brand"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                className="formInput"
                                placeholder="Enter car brand"
                                onChange={(e) => setBrand(e.target.value)}
                            />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="inputInitialPrice"
                            label="Initial Price In ALGO"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                className="formInput"
                                placeholder="Enter car initial price"
                                onChange={(e) => setInitialPrice(stringToMicroAlgos(e.target.value))}
                            />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="inputCurrentBidding"
                            label="Current Bidding In ALGO"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                className="formInput"
                                placeholder="Enter car current bidding"
                                onChange={(e) => setCurrentBidding(stringToMicroAlgos(e.target.value))}
                            />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="inputDescription"
                            label="Description"
                            className="mb-3"
                        >
                            <Form.Control
                                as="textarea"
                                className="formTextarea"
                                placeholder="Enter car description"
                                style={{ height: "100px" }}
                                maxLength={200}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </FloatingLabel>
                    </Modal.Body>
                </Form>
                <Modal.Footer>
                    <Button
                        onClick={() => {
                            createNewCar({
                                name,
                                image,
                                description,
                                initialPrice
                            });
                            handleCloseModal();
                        }}
                        disabled={!isFormFilled()}
                        className="cus-btn border-none text-white"
                        variant=""

                    >
                        Save product
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

CreateCar.propTypes = {
    createNewCar: PropTypes.func.isRequired,
};

export default CreateCar;