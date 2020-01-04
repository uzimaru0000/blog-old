import * as React from 'react';
import styled from 'styled-components';
import { H3 } from '../base/Typography';

export default (props: React.PropsWithChildren<{}>) => (
  <Wrapper>
    <H3>{props.children}</H3>
  </Wrapper>
);

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  padding-left: 50px;
  width: 100vw;
  height: 64px;
  box-shadow: 0 1px 2px var(--color-black-25);
`;
