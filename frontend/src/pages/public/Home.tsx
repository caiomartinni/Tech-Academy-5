import React, { useState } from "react";
import { Carousel, Card, Button, Container, Row, Col } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import "./Home.css";
import teste from "./icons/teste.webp";
import card2 from "./icons/peugeot-logo-0-1.png";

const itemsPerPage = 9; // Número de itens por página

const Home: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalCards = Array.from({ length: 30 }); // Simulação dos cards
  const totalPages = Math.ceil(totalCards.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : totalPages
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  const paginatedCards = totalCards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container className="home-container">
      {/* Carrossel */}
      <h1 className="escrita1">Carros em Destaque</h1>
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

      {/* Grid de Cards com Animação e Paginação */}
      <h1 className="escrita1">Marcas</h1>
      <AnimatePresence mode="wait">
        <Row key={currentPage} className="card-grid">
          {paginatedCards.map((_, index) => (
            <Col key={index} md={4} className="card-column">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="custom-card">
                  <Card.Img variant="top" src={card2} />
                  <Card.Body>
                    <Card.Title>
                      Card {(currentPage - 1) * itemsPerPage + index + 1}
                    </Card.Title>
                    <Button href="Carlist" className="cardbt" variant="primary">
                      Ação {(currentPage - 1) * itemsPerPage + index + 1}
                    </Button>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </AnimatePresence>

      {/* Controles de Paginação com Setas */}
      <div className="pagination-container">
        <Button
          className="arrow-btn"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          &#8592; {/* Seta para a esquerda */}
        </Button>
        {Array.from({ length: totalPages }).map((_, index) => (
          <Button
            key={index}
            className={`pagination-btn ${
              currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          className="arrow-btn"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          &#8594; {/* Seta para a direita */}
        </Button>
      </div>
    </Container>
  );
};

export default Home;
