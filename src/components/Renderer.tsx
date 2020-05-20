import { compile } from 'handlebars';
import React, { useMemo } from 'react';
import ReactHtmlParser from 'react-html-parser';

export interface RendererProps<T> {
  context: T;
  source: string;
}

export const Renderer = <T extends {}>({ context, source }: RendererProps<T>) =>
  useMemo(() => {
    const template = compile(source);
    const html = template(context);

    return <>{ReactHtmlParser(html)}</>;
  }, [context, source]);
