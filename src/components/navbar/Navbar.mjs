import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import "./navbar.css";

const NavbarComponent = () => {
  const [showNav, setShowNav] = useState(true);
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
        className={showNav ? "navbar-expanded" : "navbar-collapsed"}
      >
        <Nav className="mr-auto">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/latestQuakes" className="nav-link">
            Latest Quakes
          </Link>
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
          <Link to="/signup" className="nav-link">
            Signup
          </Link>
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </Nav>
      </Navbar>

      <div className="nav-buttons-container" style={{ marginTop: "0px", padding:"0" }}>
        <Button variant="primary" className="nav-toggle" onClick={toggleNav}>
          {showNav ? "Hide Nav" : "Show Nav"}
        </Button>

        <Button variant="primary" className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? "Lighten" : "Darken"}
        </Button>
      </div>
    </>
  );
};

export default NavbarComponent;





// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Navbar, Nav, Button } from "react-bootstrap";
// import "./navbar.css";

// const NavbarComponent = () => {
//   const [showNav, setShowNav] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);

//   const toggleNav = () => {
//     setShowNav(!showNav);
//   };

//   const toggleTheme = () => {
//     setDarkMode(!darkMode);
//     if (!darkMode) {
//       document.documentElement.classList.add("dark-mode");
//     } else {
//       document.documentElement.classList.remove("dark-mode");
//     }
//   };

//   return (
//     <>
//       <Navbar
//         bg={darkMode ? "dark" : "light"}
//         variant={darkMode ? "dark" : "light"}
//         className={showNav ? "navbar-expanded" : "navbar-collapsed"}
//       >
//         <Nav className="mr-auto" show={showNav}>
//           <Link to="/" className="nav-link">
//             Home
//           </Link>
//           <Link to="/latestQuakes" className="nav-link">
//             Latest Quakes
//           </Link>
//           <Link to="/dashboard" className="nav-link">
//             Dashboard
//           </Link>
//           <Link to="/signup" className="nav-link">
//             Signup
//           </Link>
//           <Link to="/login" className="nav-link">
//             Login
//           </Link>
//         </Nav>
//       </Navbar>

//       <div className="nav-buttons-container" style={{ marginTop: "2px" }}>
//         <Button variant="primary" className="nav-toggle" onClick={toggleNav}>
//           {showNav ? "Hide Nav" : "Show Nav"}
//         </Button>

//         <Button variant="primary" className="theme-toggle" onClick={toggleTheme}>
//           {darkMode ? "Lighten" : "Darken"}
//         </Button>
//       </div>
//     </>
//   );
// };

// export default NavbarComponent;




// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Navbar, Nav, Button } from "react-bootstrap";
// import "./navbar.css";

// const NavbarComponent = () => {
//   const [showNav, setShowNav] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);

//   const toggleNav = () => {
//     setShowNav(!showNav);
//   };

//   const toggleTheme = () => {
//     setDarkMode(!darkMode);
//     if (!darkMode) {
//       document.documentElement.classList.add("dark-mode");
//     } else {
//       document.documentElement.classList.remove("dark-mode");
//     }
//   };

//   return (
//     <>
//       <Navbar
//         bg={darkMode ? "dark" : "light"}
//         variant={darkMode ? "dark" : "light"}
//         className={showNav ? "navbar-expanded" : "navbar-collapsed"}
//       >
//         <Nav className="mr-auto">
//           <Link to="/" className="nav-link">
//             Home
//           </Link>
//           <Link to="/latestQuakes" className="nav-link">
//             Latest Quakes
//           </Link>
//           <Link to="/dashboard" className="nav-link">
//             Dashboard
//           </Link>
//           <Link to="/signup" className="nav-link">
//             Signup
//           </Link>
//           <Link to="/login" className="nav-link">
//             Login
//           </Link>
//         </Nav>
//       </Navbar>

//       <div className="nav-buttons-container" style={{ marginTop: "2px" }}>
//         <Button variant="primary" className="nav-toggle" onClick={toggleNav}>
//           {showNav ? "Hide Nav" : "Show Nav"}
//         </Button>

//         <Button variant="primary" className="theme-toggle" onClick={toggleTheme}>
//           {darkMode ? "Lighten" : "Darken"}
//         </Button>
//       </div>
//     </>
//   );
// };

// export default NavbarComponent;




// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Navbar, Nav, Button } from "react-bootstrap";
// import "./navbar.css";

// const NavbarComponent = () => {
//   const [showNav, setShowNav] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);
  

//   const toggleNav = () => {
//     setShowNav(!showNav);
//   };

//   const toggleTheme = () => {
//     setDarkMode(!darkMode);
//     if (!darkMode) {
//       document.documentElement.classList.add("dark-mode");
//     } else {
//       document.documentElement.classList.remove("dark-mode");
//     }
//   };

//   return (
//     <>
//       <Navbar
//         bg={darkMode ? "dark" : "light"}
//         variant={darkMode ? "dark" : "light"}
//         className={showNav ? "navbar-expanded" : "navbar-collapsed"}
//       >
//         <Nav className="mr-auto">
//           <Link to="/" className="nav-link">
//             Home
//           </Link>
//           <Link to="/latestQuakes" className="nav-link">
//             Latest Quakes
//           </Link>
//           <Link to="/dashboard" className="nav-link">
//             Dashboard
//           </Link>
//           <Link to="/signup" className="nav-link">
//             Signup
//           </Link>
//           <Link to="/login" className="nav-link">
//             Login
//           </Link>
//         </Nav>
//       </Navbar>

//    <div className="nav-buttons-container" style={{marginTop: "2px"}}>
//         <Button variant="primary" className="nav-toggle" onClick={toggleNav}>
//           {showNav ? "Hide Nav" : "Show Nav"}
//         </Button>

//         <Button variant="primary" className="theme-toggle" onClick={toggleTheme}>
//           {darkMode ? "Lighten" : "Darken"}
//         </Button>
//       </div>
    
//     </>
//   );
// };

// export default NavbarComponent;





// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Navbar, Nav, Button } from "react-bootstrap";
// import "./navbar.css";

// const NavbarComponent = () => {
//   const [showNav, setShowNav] = useState(true);
//   const [darkMode, setDarkMode] = useState(false);

//   const toggleNav = () => {
//     setShowNav(!showNav);
//   };

//   const toggleTheme = () => {
//     setDarkMode(!darkMode);
//     if (!darkMode) {
//       document.documentElement.classList.add("dark-mode");
//     } else {
//       document.documentElement.classList.remove("dark-mode");
//     }
//   };

//   return (
//     <>
//       <Navbar
//         bg={darkMode ? "dark" : "light"}
//         variant={darkMode ? "dark" : "light"}
//         className={showNav ? "navbar-expanded" : "navbar-collapsed"}
//       >
//         <Nav className="ml-auto">
//           <Link to="/" className="nav-link">
//             Home
//           </Link>
//           <Link to="/latestQuakes" className="nav-link">
//             Latest Quakes
//           </Link>
//           <Link to="/dashboard" className="nav-link">
//             Dashboard
//           </Link>
//           <Link to="/signup" className="nav-link">
//             Signup
//           </Link>
//           <Link to="/login" className="nav-link">
//             Login
//           </Link>
//         </Nav>
//       </Navbar>

//       <Button variant="primary" className="nav-toggle" onClick={toggleNav}>
//         {showNav ? "Hide Nav" : "Show Nav"}
//       </Button>

//       <Button variant="primary" className="theme-toggle" onClick={toggleTheme}>
//         {darkMode ? "Lighten" : "Darken"}
//       </Button>
//     </>
//   );
// };

// export default NavbarComponent;





/*
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import "./navbar.css";

const CustomNavbar = () => {
  const [isDark, setIsDark] = useState(false);

  const handleDarkModeToggle = () => {
    setIsDark(!isDark);
  };

  return (
    <Navbar
      className={`custom-navbar ${isDark ? "dark-mode" : ""}`}
      bg="light"
      expand="md"
    >
      <Navbar.Brand>Navbar</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/latestQuakes" className="nav-link">
            Latest Quakes
          </Link>
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
          <Link to="/signup" className="nav-link">
            Signup
          </Link>
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </Nav>
      </Navbar.Collapse>
      <Button
        variant="primary"
        onClick={handleDarkModeToggle}
        className="ml-auto"
      >
        {isDark ? "Light Mode" : "Dark Mode"}
      </Button>
    </Navbar>
  );
};

export default CustomNavbar;
*/


/*
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import "./navbar.css";

const NavbarComponent = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Navbar bg={isDarkMode ? "dark" : "light"} variant={isDarkMode ? "dark" : "light"} expand="md" className="custom-navbar">
      <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
      <Button variant="outline-light" onClick={handleToggleTheme}>
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </Button>
      <Button variant="outline-light" onClick={handleToggleMenu}>
        Menu
      </Button>
      <Navbar.Collapse className={isMenuVisible ? "show" : ""}>
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/latestQuakes">LatestQuakes</Nav.Link>
          <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
*/

/*
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import "./navbar.css";

const NavbarComponent = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <Navbar bg="light" expand="md" className="custom-navbar">
      <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
      <Button variant="outline-dark" onClick={handleToggleMenu}>
        Menu
      </Button>
      <Navbar.Collapse className={isMenuVisible ? "show" : ""}>
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/latestQuakes">LatestQuakes</Nav.Link>
          <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
*/




/*
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Dropdown } from "react-bootstrap";
import "./navbar.css";

const NavbarComponent = () => {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuExpanded(!isMenuExpanded);
  };

  const handleToggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <Navbar
      bg={isDarkTheme ? "dark" : "light"}
      expand="md"
      expanded={isMenuExpanded}
      className="custom-navbar"
    >
      <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
      <Navbar.Toggle onClick={handleToggleMenu} />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/latestQuakes">LatestQuakes</Nav.Link>
          <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
          <Dropdown alignRight>
            <Dropdown.Toggle variant="link" id="theme-toggle">
              {isDarkTheme ? "Dark" : "Light"} Theme
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleToggleTheme}>
                {isDarkTheme ? "Light" : "Dark"} Theme
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;

*/



/*
import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import "./navbar.css";

const Newbar = () => {
  return (
    <Navbar bg="light" fixed="top">
      <Navbar.Brand>Welcome</Navbar.Brand>
      <Nav className="flex-column">
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
*/


/*
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

*/


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