import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Renderer } from '../src';

interface ContextProps {
  test: string;
}

describe('it', () => {
  it('renders without crashing', () => {
    const source = '<div>{test}</div>';
    const context: ContextProps = { test: 'My Test' };

    const div = document.createElement('div');
    ReactDOM.render(
      <Renderer<ContextProps> source={source} context={context} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
