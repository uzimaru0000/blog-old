import * as React from 'react';
import styled from 'styled-components';
import { H3 } from '../base/Typography';
import { Link } from 'react-router-dom';

export default (props: React.PropsWithChildren<{}>) => (
  <Wrapper>
    <H3>
      <LinkToTop to="/">{props.children}</LinkToTop>
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

const LinkToTop = styled(Link)`
  &:hover {
    color: var(--color-text-75);
  }
`;
