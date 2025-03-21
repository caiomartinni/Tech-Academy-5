import React from 'react';
import { Carousel, Card, Button, Container, Row, Col } from 'react-bootstrap';
import './Home.css'; // Importe o arquivo CSS
import imagem1 from './icons/Buick-logo.svg.png'; // Importe a imagem
import imagem2 from './icons/Citroen_2022.svg';
import card1 from './icons/Honda-Logo-1981.png';
import card2 from './icons/peugeot-logo-0-1.png';
import teste from './icons/teste.webp'

const Home: React.FC = () => {
  return (
    
    <Container className="home-container">
      {/* Carrossel */}
      <Carousel className="carousel-container">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={teste} // Substitua pelas suas imagens
            alt="Primeiro Slide"
          />
          <Carousel.Caption>
            <h3>Slide 1</h3>
            
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={teste}
            alt="Segundo Slide"
          />
          <Carousel.Caption>
            <h3>Slide 2</h3>
           
          </Carousel.Caption>
        </Carousel.Item>
        {/* Adicione mais Carousel.Item conforme necessário */}
      </Carousel>

      {/* Grid de Cards */}
      <h1 className='escrita1'>Marcas</h1>
      <Row className="card-grid">
        <Col md={4} className="card-column">
          <Card className="custom-card">
            <Card.Img variant="top" src={card2} />
            <Card.Body>
              <Card.Title>Card 1</Card.Title>
              <Button className='cardbt' variant="primary">Ação 1</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="card-column">
          <Card className="custom-card">
            <Card.Img variant="top" src={card2} />
            <Card.Body>
              <Card.Title>Card 2</Card.Title>

              <Button variant="primary">Ação 2</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="card-column">
          <Card className="custom-card">
            <Card.Img variant="top" src={card2} />
            <Card.Body>
              <Card.Title>Card 2</Card.Title>

              <Button variant="primary">Ação 2</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="card-column">
          <Card className="custom-card">
            <Card.Img variant="top" src={card2} />
            <Card.Body>
              <Card.Title>Card 2</Card.Title>

              <Button variant="primary">Ação 2</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="card-column">
          <Card className="custom-card">
            <Card.Img variant="top" src={card2} />
            <Card.Body>
              <Card.Title>Card 2</Card.Title>

              <Button variant="primary">Ação 2</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="card-column">
          <Card className="custom-card">
            <Card.Img variant="top" src={card2} />
            <Card.Body>
              <Card.Title>Card 2</Card.Title>

              <Button variant="primary">Ação 2</Button>
            </Card.Body>
          </Card>
        </Col>
        {/* Adicione mais Col e Card conforme necessário */}
      </Row>
      
    </Container>
    

  );
};

export default Home;


