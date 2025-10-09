// App.js
import React, { Component } from 'react';
import ColorComponent from './ColorComponent';

class Child extends Component {
  componentWillUnmount() {
    alert('Child component is being unmounted!');
  }

  render() {
    return <h2>Hello World!</h2>;
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }

  deleteChild = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div>
        <h1>React Lifecycle Exercises</h1>

        {/* ✅ Show / Hide the Child component */}
        {this.state.show && <Child />}
        <button onClick={this.deleteChild}>Delete</button>

        <hr />

        {/* ✅ Updating Lifecycle */}
        <ColorComponent />
      </div>
    );
  }
}

export default App;

