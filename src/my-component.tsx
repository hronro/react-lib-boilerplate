import * as React from 'react';

import { myString } from './my-string';

export class MyComponent extends React.Component {
  render() {
    return (
      <div>{myString}</div>
    );
  }
}
