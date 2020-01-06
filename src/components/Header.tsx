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
  box-shadow: 0 1px 2px var(--color-black-25);
  background: var(--color-white);
`;

const LinkToTop = styled(Link)`
  font-size: 1em;
  color: var(--color-black);
  text-decoration: none;

  &:hover {
    color: var(--color-black-75);
  }
`;
