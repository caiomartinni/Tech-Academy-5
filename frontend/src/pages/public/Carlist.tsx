import React, { useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import "./Carlist.css";
import card2 from "./icons/peugeot-logo-0-1.png";
import { Link } from "react-router-dom";

const itemsPerPage = 9; // Número de itens por página

const Carlist: React.FC = () => {
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
      <h1 className="escrita1">Carros</h1>

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
                    <Link to={"/pagcar"} className="cardbt">
                      Ação {(currentPage - 1) * itemsPerPage + index + 1}
                    </Link>
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

      {/* Botão para voltar à página Home */}
      <div
        className="home-button-container"
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        <Link
          className="home-button"
          to="/home"
          onClick={() => (window.location.href = "/")}
        >
          Voltar para Página Home
        </Link>
      </div>
    </Container>
  );
};

export default Carlist;
