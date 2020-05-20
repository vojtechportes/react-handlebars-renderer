import { registerPartial } from 'handlebars';
import { useMemo } from 'react';

export interface PartialProps {
  name: string;
  content: string;
}

export const usePartials = (partials: PartialProps[]) => {
  useMemo(() => {
    if (partials) {
      for (const { name, content } of partials) {
        registerPartial(name, content);
      }
    }
  }, [partials]);
};
