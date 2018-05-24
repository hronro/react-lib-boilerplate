import * as React from 'react';

import { myString } from './my-string';

export class MyComponent extends React.PureComponent<{}, {}> {
  render() {
    return <div>{myString}</div>;
  }
}
