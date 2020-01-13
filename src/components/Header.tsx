import * as React from 'react';
import styled from 'styled-components';
import { H3 } from '../base/Typography';

export default (props: React.PropsWithChildren<{}>) => (
  <Wrapper>
    <H3>
      <LinkToTop href="/">{props.children}</LinkToTop>
    </H3>
  </Wrapper>
);

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  padding-left: 50px;
  width: 100vw;
  height: 64px;
  background: var(--color-base);
  border-bottom: 1px solid var(--color-text-50);
`;

const LinkToTop = styled.a`
  &:hover {
    color: var(--color-text-75);
  }
`;
