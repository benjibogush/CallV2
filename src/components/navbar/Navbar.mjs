
import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import "./navbar.css";

const Newbar = () => {
  return (
    <Navbar bg="light fixed-top">
      <Navbar.Brand>Welcome</Navbar.Brand>
      <Nav className="ml-auto">
        <Link to="/">
          <Button variant="light" className="nav-button">
            Home
          </Button>
        </Link>
        
         <Link to="/latestQuakes">
          <Button variant="light" className="nav-button">
            Latest Quakes
          </Button>
        </Link>
        <Link to="/signup">
          <Button variant="light" className="nav-button">
            Signup
          </Button>
        </Link>
        <Link to="/login">
          <Button variant="light" className="nav-button">
            Login
          </Button>
        </Link>
        <Link to="/dashboard">
          <Button variant="light" className="nav-button">
            Dashboard
          </Button>
        </Link>
      </Nav>
    </Navbar>
  );
};

export default Newbar;

/*
import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const newbar = () => {
  return (
    <Navbar bg="light fixed-top" expand="lg">
      <Navbar.Brand>My App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default newbar;
*/