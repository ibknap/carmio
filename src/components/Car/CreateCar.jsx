import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { stringToMicroAlgos } from "../../utils/conversions";

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
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>New Product</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <FloatingLabel
                            controlId="inputName"
                            label="Product name"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                placeholder="Enter name of product"
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="inputUrl"
                            label="Image URL"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                placeholder="Image URL"
                                value={image}
                                onChange={(e) => {
                                    setImage(e.target.value);
                                }}
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="inputDescription"
                            label="Description"
                            className="mb-3"
                        >
                            <Form.Control
                                as="textarea"
                                placeholder="description"
                                style={{ height: "80px" }}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="inputPrice"
                            label="Price in ALGO"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                placeholder="Price"
                                onChange={(e) => {
                                    setInitialPrice(stringToMicroAlgos(e.target.value));
                                }}
                            />
                        </FloatingLabel>
                    </Modal.Body>
                </Form>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button
                        variant="dark"
                        disabled={!isFormFilled()}
                        onClick={() => {
                            createNewCar({
                                name,
                                image,
                                description,
                                initialPrice
                            });
                            handleCloseModal();
                        }}
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