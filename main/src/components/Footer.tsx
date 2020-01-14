import * as React from 'react';
import styled from 'styled-components';
import Icon from './Icon';

export default () => (
  <Wrapper>
    <a href="https://uzimaru.com" aria-label="portfolio site">
      <Icon />
    </a>
  </Wrapper>
);

const Wrapper = styled.footer`
  width: 100vw;
  height: 255px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-text);
`;
