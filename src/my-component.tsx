import * as React from 'react';

import { myString } from 'my-string';

import './style.styl';

export const MyComponent: React.SFC<{}> = () => (
  <div className="clsprefix-my-component">{myString}</div>
);
