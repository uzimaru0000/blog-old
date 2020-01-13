import * as React from 'react';
import styled from 'styled-components';
import { H1 } from '../base/Typography';

export default () => (
  <Wrapper>
    <H1>Not Found...</H1>
    <Egg width={160} color={'var(--color-text-50)'} />
  </Wrapper>
);

const Wrapper = styled.div`
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--color-base);

  & * {
    margin-bottom: 1rem;
  }

  & *:last-child {
    margin-bottom: 0;
  }
`;

const Egg = ({ width, color }: { width: number; color: string }) => (
  <svg width={width} viewBox="0 0 309 411" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M309 253.039C309 340.279 239.828 411 154.5 411C69.172 411 0 340.279 0 253.039C0 165.8 69.172 0 154.5 0C239.828 0 309 165.8 309 253.039ZM154.5 385C226.573 385 285 322.57 285 246.793C278 171 226.5 31.5 154.5 27C97.4906 31.3853 53.5139 120.96 34.2286 195L69.5 182L98 220.5L149 165.5L186 210.5L149 177L98 249L63 210.5L26.9883 228.5C25.9091 234.92 25.0762 241.047 24.5 246.793C24.5 322.57 82.4268 385 154.5 385Z"
      fill={color}
    />
  </svg>
);
