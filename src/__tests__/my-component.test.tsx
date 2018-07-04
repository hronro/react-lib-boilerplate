import * as React from 'react';
import { render } from 'react-dom';

import { MyComponent } from 'my-component';

test('render MyComponent without crash', () => {
  const node = document.createElement('div');

  render(<MyComponent />, node);
});
