import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../../assets/icons/logo.png";
import "./Header.css";

function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <Navbar expand="lg" className="header-container">
        <Container fluid>
          <Navbar.Brand href="#">
            <img className="iconpr" src={Logo} alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0 header-nav" navbarScroll>
              <Nav.Link>
                <Link to="/home" className="header-link">
                  Home
                </Link>
              </Nav.Link>
              <Nav.Link href="#action2" className="header-link">
                Link
              </Nav.Link>
              <NavDropdown
                title="Marcas"
                id="navbarScrollingDropdown"
                className="header-dropdown"
              >
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <button className="login-button">Login</button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.div>
  );
}

export default Header;
