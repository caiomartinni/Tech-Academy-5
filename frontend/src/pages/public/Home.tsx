
import React from "react";
import { motion } from "framer-motion";
import { Button, Card, Carousel } from "react-bootstrap";
import "./Home.css";

const brands = [
  { name: "Toyota", image: "/images/toyota.png" },
  { name: "Ford", image: "/images/ford.png" },
  { name: "Chevrolet", image: "/images/chevrolet.png" },
  { name: "Honda", image: "/images/honda.png" },
];

const carouselItems = [
  { image: "/images/carousel1.jpg", caption: "Descubra os melhores modelos!" },
  { image: "/images/carousel2.jpg", caption: "Encontre o carro dos seus sonhos!" },
  { image: "/images/carousel3.jpg", caption: "Melhores ofertas disponíveis!" },
];

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <Carousel className="home-carousel">
        {carouselItems.map((item, index) => (
          <Carousel.Item key={index}>
            <img className="d-block w-100 carousel-image" src={item.image} alt={`Slide ${index + 1}`} />
            <Carousel.Caption>
              <h3>{item.caption}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      
      <motion.h1 
        className="home-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        CarTalogo - Catálogo de Veículos
      </motion.h1>
      
      <div className="brand-grid">
        {brands.map((brand, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="brand-card">
              <img src={brand.image} alt={brand.name} className="brand-image" />
              <h2 className="brand-name">{brand.name}</h2>
              <Button className="brand-button">Ver Modelos</Button>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;