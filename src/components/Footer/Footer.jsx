import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import './Footer.css';

const Footer = () => (
    <Container fluid className="py-2 footer">
        <Row className="p-3">
            <Col>Copyrights (C) @ibukunoluwanap</Col>
            <Col sm={3}>
                <Row>
                    <Col>
                        <a href="https://github.com/ibukunoluwanap/" className="text-white text-decoration-none" target="_blank" rel="noopener noreferrer">
                            <i class="fa-brands fa-github"></i>
                        </a>
                    </Col>
                    <Col>
                        <a href="https://twitter.com/ibukunoluwanap/" className="text-white text-decoration-none" target="_blank" rel="noopener noreferrer">
                            <i class="fa-brands fa-twitter"></i>
                        </a>
                    </Col>
                    <Col>
                        <a href="https://www.linkedin.com/in/ibukunoluwanap/" className="text-white text-decoration-none" target="_blank" rel="noopener noreferrer">
                            <i class="fa-brands fa-linkedin"></i>
                        </a>
                    </Col>
                    <Col>
                        <a href="https://www.instagram.com/ibukunoluwanap/" className="text-white text-decoration-none" target="_blank" rel="noopener noreferrer">
                            <i class="fa-brands fa-instagram"></i>
                        </a>
                    </Col>
                    <Col>
                        <a href="https://www.facebook.com/ibknap/" className="text-white text-decoration-none" target="_blank" rel="noopener noreferrer">
                            <i class="fa-brands fa-facebook"></i>
                        </a>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Container>
);

export default Footer;