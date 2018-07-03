import * as React from 'react';

import { myString } from 'my-string';

import './style.styl'

export class MyComponent extends React.PureComponent<{}, {}> {
  render() {
    return (
      <div className="clsprefix-my-component">{myString}</div>
    );
  }
}
