import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Renderer, PartialProps, usePartials } from '../src/index';

interface ItemProps {
  url: string;
  items?: ItemProps[];
}

interface ContextProps {
  test: string;
  items: ItemProps[];
}

const partials: PartialProps[] = [
  {
    name: 'list',
    content: `
      {{#each items}} {{! Each item is an "li" }}
        <li>
            {{url}}
            {{#if items}} {{! Within the context of the current item }}
            <ul>
            {{> list}} {{! Recursively render the partial }}
            </ul>
            {{/if}}
        </li>
      {{/each}}
      `,
  },
];

const App = () => {
  usePartials(partials);

  const source = `
    <div>
      {{test}}
    </div>
    <ul>
      {{> list}}
    </ul>`;

  const context: ContextProps = {
    test: 'My Test',
    items: [{ url: '/a', items: [{ url: '/a/b' }] }, { url: '/c' }],
  };

  return (
    <div>
      <Renderer<ContextProps> source={source} context={context} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
