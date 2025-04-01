import React from 'react';
import { Carousel, Card, Button, Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion'; // Importação do Framer Motion
import './Home.css';
import teste from './icons/teste.webp';
import card2 from './icons/peugeot-logo-0-1.png';

const Home: React.FC = () => {
  return (
    <Container className="home-container">
      {/* Carrossel com animação */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <Carousel className="carousel-container">
          <Carousel.Item>
            <img className="d-block w-100" src={teste} alt="Primeiro Slide" />
            <Carousel.Caption>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Slide 1
              </motion.h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={teste} alt="Segundo Slide" />
            <Carousel.Caption>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Slide 2
              </motion.h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </motion.div>

      {/* Grid de Cards com animação */}
      <h1 className="escrita1">Marcas</h1>
      <Row className="card-grid">
        {Array.from({ length: 6 }).map((_, index) => (
          <Col key={index} md={4} className="card-column">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.8 }}
            >
              <Card className="custom-card">
                <Card.Img variant="top" src={card2} />
                <Card.Body>
                  <Card.Title>Card {index + 1}</Card.Title>
                  <Button className="cardbt" variant="primary">
                    Ação {index + 1}
                  </Button>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;