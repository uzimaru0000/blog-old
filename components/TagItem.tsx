import * as React from 'react';
import styled from 'styled-components';
import { H3 } from './base/Typography';

export default (props: { tagName: string }) => (
  <Wrapper href={`/tag/${props.tagName}`}>
    <H3>{props.tagName}</H3>
  </Wrapper>
);

const Wrapper = styled.a`
  position: relative;
  display: block;
  width: 100%;
  background: var(--color-text);
  color: var(--color-base);
  transition: 500ms ease;

  &::before {
    content: '';
    display: block;
    padding-top: 100%;
  }

  & > ${H3} {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: inherit;

    &::before {
      content: '#';
    }
  }

  &:hover {
    background: var(--color-base);
    border: 3px solid var(--color-text);
    color: var(--color-text);
    box-shadow: 0 0 8px 0 var(--color-text-50);

    & > ${H3} {
      text-shadow: 0 0 4px var(--color-text-50);
    }
  }
`;
