import React, { Component } from 'react';
import './app.css';

import MyLib from './lib';

class App extends Component {
  render() {
    return (
      <div className="example">
        The following content are import from my lib.
        <MyLib/>
      </div>
    );
  }
}

export default App;
