# React Handlebars Renderer

<p align="center">
<a href="https://www.npmjs.com/package/@vojtechportes/react-handlebars-renderer" target="_blank"><img src="https://badge.fury.io/js/%40vojtechportes%2Freact-handlebars-renderer.svg" alt="npm version" /></a>
</p>

## Why?

Because when you need to render externally loaded template (for example one fetched from api), parsing JSX is not very effective and also, there are really no libraries that would allow anonymous functions, arrow functions etc.

## How?

This module is basically rendering memoized Handlebars tempaltes as React components.

It is also allowing you to register Handlebars partials using `usePartials` hook.
It goes through array of partials and registers them inside useMemo.

That is it.

## Example

```typescript
import React from 'react'
import { Renderer, usePartials, PartialProps } from '@vojtechportes/react-handlebars-renderer'

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
  }
]

interface ItemProps {
  url: string;
  items?: ItemProps[];
}

interface ContextProps {
  test: string;
  items: ItemProps[];
}

const context: ContextProps = {
  text: 'Lorem Ipsum',
  items: [
    { url: '/abc', items: [
      { url: '/abc/def },
    ] },
    { url: '/foo' },
  ]
}

const source = `
  <p>
    {{text}}
  </p>
  <ul>
    {{> list}}
  </ul>
`

const Foo: React.FC = () => {
  usePartials(partials)

  return (
    <Renderer
      context={context}
      source={cource}
    />
  )

  /**
  Will output

  <p>Lorem Ipsum</p>
  <ul>
    <li>
      /abc
      <ul>
        <li>/abc/def</li>
      </ul>
    </li>
    <li>/foo</li>
  </ul>
  */
}
```
