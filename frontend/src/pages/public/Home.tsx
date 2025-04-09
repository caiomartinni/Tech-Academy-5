import React, { useState, useEffect } from "react";
import { Carousel, Card, Button, Container, Row, Col } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import "./Home.css";
import { Link } from "react-router-dom";
import axios from "axios"; // Importando para fazer requisições ao backend
import teste from "./icons/teste.webp";

const itemsPerPage = 6; // Número de marcas por página

const Home: React.FC = () => {
  interface Brand {
    id: number;
    name: string;
  }

  const [brands, setBrands] = useState<Brand[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get("http://localhost:3000/brands")
      .then((response) => setBrands(response.data))
      .catch((error) => console.error("Erro ao buscar marcas:", error));
  }, []);

  const totalPages = Math.ceil(brands.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : totalPages
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  const paginatedBrands = brands.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container className="home-container">
      {/* Carrossel restaurado com as imagens corretas */}
      <h1 className="escrita1">Carros em Destaque</h1>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <Carousel className="carousel-container">
          <Carousel.Item>
            <img className="d-block w-100" src={teste} alt="Primeiro Slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={teste} alt="Segundo Slide" />
          </Carousel.Item>
        </Carousel>
      </motion.div>

      {/* Grid de Marcas com Paginação */}
      <h1 className="escrita1">Marcas</h1>
      <AnimatePresence mode="wait">
        <Row key={currentPage} className="card-grid">
          {paginatedBrands.map((brand) => (
            <Col key={brand.id} md={4} className="card-column">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="custom-card">
                  {/* Carregando a imagem baseada no ID da marca */}
                  <Card.Img variant="top" src={`./images/${brand.id}.png`} />
                  <Card.Body>
                    <Card.Title>{brand.name}</Card.Title>
                    <Link to={`/caradmin/${brand.id}`} className="cardbt">
                      Ver Carros
                    </Link>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </AnimatePresence>

      {/* Controles de Paginação */}
      <div className="pagination-container">
        <Button
          className="arrow-btn"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          &#8592;
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
          &#8594;
        </Button>
      </div>
    </Container>
  );
};

export default Home;
