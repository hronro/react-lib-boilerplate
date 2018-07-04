import React from 'react';
import './app.css';

// eslint-disable-next-line import/no-unresolved
import MyLib from './lib';

const App = () => (
  <div className="example">
    The following content are import from my lib.
    <MyLib />
  </div>
);

export default App;
