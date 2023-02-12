

import React, { useState } from 'react';
import './home.css';

const Home = () => {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState('#000');

  const handleClick = () => {
    setCount(count + 1);
  };

  const handleHover = () => {
    const colors = ['red', 'green', 'blue', 'purple', 'orange', 'pink'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(randomColor);
  };

  return (
    <div className="container">
      <h1 className="title" style={{ color: color }}>
        Welcome to my project!
      </h1>
      <div className="counter">
        <p>Click Count: {count}</p>
        <button onClick={handleClick}>Click Me</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
      <div
        className="box"
        onMouseEnter={handleHover}
        onMouseLeave={() => setColor('#000')}
        style={{ backgroundColor: color }}
      >
        Hover Over Me
      </div>
      <div className="tree-container">
        <ul className="project-tree">
          <li className="project-tree-item">
            <span className="bullet">&#9679;</span>
            Project 1
          </li>
          <li className="project-tree-item">
            <span className="bullet">&#9679;</span>
            Project 2
          </li>
          <li className="project-tree-item">
            <span className="bullet">&#9679;</span>
            Project 3
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
