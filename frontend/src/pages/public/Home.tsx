// Home.tsx
import React, { useState, useEffect } from "react";
import { Carousel, Card, Button, Container, Row, Col } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import "./Home.css";
import { Link } from "react-router-dom";
import axios from "axios";
import teste from "./icons/teste.webp"; // Mantenha se usar, ou remova/substitua

const itemsPerPage = 6;

interface Brand {
  id: number; // Assumindo que o ID da API é numérico
  name: string;
}

const Home: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Estado de loading
  const [error, setError] = useState<string | null>(null); // Estado de erro

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get<Brand[]>("http://localhost:3000/brands") // Especifica o tipo de retorno esperado
      .then((response) => {
        setBrands(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar marcas:", error);
        setError("Falha ao carregar as marcas. Tente novamente mais tarde.");
        setLoading(false);
      });
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
      {/* Carrossel */}
      <h1 className="escrita1">Carros em Destaque</h1>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <Carousel className="carousel-container">
          <Carousel.Item>
            {/* Idealmente, use imagens de carros reais aqui */}
            <img className="d-block w-100" src={teste} alt="Destaque 1" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={teste} alt="Destaque 2" />
          </Carousel.Item>
        </Carousel>
      </motion.div>

      {/* Grid de Marcas com Paginação */}
      <h1 className="escrita1">Marcas</h1>

      {/* Feedback de Loading e Erro */}
      {loading && <p>Carregando marcas...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && brands.length === 0 && (
        <p>Nenhuma marca encontrada.</p>
      )}

      {!loading && !error && brands.length > 0 && (
        <>
          <AnimatePresence mode="wait">
            <Row key={currentPage} className="card-grid">
              {paginatedBrands.map((brand) => (
                <Col key={brand.id} md={4} className="card-column mb-4">
                  {" "}
                  {/* Adicionado mb-4 para espaçamento */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="h-100" // Garante que a animação ocupe a altura da coluna
                  >
                    <Card className="custom-card h-100">
                      {" "}
                      {/* Adicionado h-100 para cards terem mesma altura */}
                      {/* Usando /images/ assumindo que 'public' é a raiz do servidor */}
                      <Card.Img
                        variant="top"
                        src={`/images/${brand.id}.png`}
                        alt={brand.name}
                        style={{ objectFit: "contain", height: "150px" }}
                      />{" "}
                      {/* Ajuste de estilo opcional */}
                      <Card.Body className="d-flex flex-column">
                        {" "}
                        {/* Flex column para alinhar botão */}
                        <Card.Title>{brand.name}</Card.Title>
                        {/* === ALTERAÇÃO PRINCIPAL AQUI === */}
                        {/* Link aponta para /cars/ passando o ID da marca */}
                        <Link
                          to={`/cars/${brand.id}`}
                          className="cardbt mt-auto"
                        >
                          {" "}
                          {/* mt-auto empurra o botão para baixo */}
                          Ver Carros
                        </Link>
                        {/* ================================ */}
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </AnimatePresence>

          {/* Controles de Paginação (só mostrar se houver mais de 1 página) */}
          {totalPages > 1 && (
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
          )}
        </>
      )}
    </Container>
  );
};

export default Home;
