import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./PagCar.css";

interface Car {
  name: string;
  image: string;
  description: string;
  specs: string;
  marketValue: number;
  type: string;
  year: number;
}

const CarDetails = () => {
  const [car, setCar] = useState<Car | null>(null);

  useEffect(() => {
    // Simulando busca de dados (substituir por uma requisição HTTP no futuro)
    setTimeout(() => {
      setCar({
        name: "Fusca",
        image: "fusca.jpg",
        description:
          "O Fusca (Volkswagen Beetle) é um dos carros mais icônicos do mundo. Lançado na Alemanha na década de 1930, ele se tornou extremamente popular devido à sua confiabilidade, simplicidade mecânica e baixo custo de manutenção.",
        specs: "1.3L, 40cv",
        marketValue: 25000,
        type: "Hatch",
        year: 1975,
      });
    }, 1000);
  }, []);

  if (!car) return <p>Carregando...</p>;

  return (
    <Container className="box mt-4">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow-lg p-3 rounded">
            <Row>
              <Col md={6} className="text-center">
                <img
                  src={car.image}
                  alt={car.name}
                  className="img-fluid rounded"
                />
              </Col>
              <Col md={6}>
                <Card.Body className="BoxCar">
                  <Card.Title className="fw-bold fs-3">{car.name}</Card.Title>
                  <Card.Text>
                    <strong className="title">Descrição:</strong>{" "}
                    {car.description}
                  </Card.Text>
                  <Card.Text>
                    <strong className="title">Ficha Técnica:</strong>{" "}
                    {car.specs}
                  </Card.Text>
                  <Card.Text>
                    <strong className="title">Valor Médio:</strong> R${" "}
                    {car.marketValue}
                  </Card.Text>
                  <Card.Text>
                    <strong className="title">Tipo do Veículo:</strong>{" "}
                    {car.type}
                  </Card.Text>
                  <Card.Text>
                    <strong className="title">Ano de Fabricação:</strong>{" "}
                    {car.year}
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CarDetails;
