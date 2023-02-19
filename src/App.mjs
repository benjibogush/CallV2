
import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/home/Home.mjs";
import Signup from "./components/signup/Signup.mjs";
import Login from "./components/login/Login.mjs";
import Dashboard from "./components/dashboard/Dashboard.mjs";
import Navbar from "./components/navbar/Navbar.mjs";
import Quake from "./components/quake/Quake.mjs";

class App extends Component {
  render() {
    return (
      <div>
          
        <BrowserRouter>
        
          <Navbar />
          
          <Routes>
            <Route exact path="/" element={<Home/> } />
            <Route path="/latestQuakes" element={<Quake />} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
          </Routes>

        </BrowserRouter>

        
      </div>
    );
  }
}

export default App;