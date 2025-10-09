import React, { Component } from 'react';
import './Exercise.css';

const style_header = {
  color: "white",
  backgroundColor: "DodgerBlue",
  padding: "10px",
  fontFamily: "Arial"
};

class Exercise extends Component {
  render() {
    return (
      <div>
        <h1 style={style_header}>This is a heading</h1>
        <p className="para">This is a paragraph</p>
        <a href="https://www.google.com">Click me</a>
        <form>
          <input type="text" placeholder="Type here" />
        </form>
        <img src="https://via.placeholder.com/150" alt="Placeholder" />
        <ul>
          <li>One</li>
          <li>Two</li>
        </ul>
      </div>
    );
  }
}

export default Exercise;
