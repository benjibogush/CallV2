import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import "./navbar.css";

const NavbarComponent = () => {
  const [showNav, setShowNav] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  };

  return (
    <>
      <Navbar
        bg={darkMode ? "dark" : "light"}
        variant={darkMode ? "dark" : "light"}
        expand="lg"
        className="navbar"
      >
        <Navbar.Brand className="navbar-brand" as={Link} to="/">
          My App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNav} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/"
                className="nav-link"
                onClick={() => setShowNav(false)}
              >
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/latestQuakes"
                className="nav-link"
                onClick={() => setShowNav(false)}
              >
                Latest Quakes
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/dashboard"
                className="nav-link"
                onClick={() => setShowNav(false)}
              >
                Dashboard
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/signup"
                className="nav-link"
                onClick={() => setShowNav(false)}
              >
                Signup
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/login"
                className="nav-link"
                onClick={() => setShowNav(false)}
              >
                Login
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className="nav-buttons-container">
        <Button variant="primary" className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? "Lighten" : "Darken"}
        </Button>
      </div>
    </>
  );
};

export default NavbarComponent;
