import * as React from 'react';
import styled from 'styled-components';
import TagItem from '../TagItem';

export default () => (
  <Wrapper>
    <TagItem tagName="hoge" />
    <TagItem tagName="hoge" />
    <TagItem tagName="hoge" />
    <TagItem tagName="hoge" />
    <TagItem tagName="hoge" />
  </Wrapper>
);

const Wrapper = styled.div`
  display: grid;
  padding: 3rem;
  grid-gap: 2rem;
  background: var(--color-base);
  grid-template-columns: repeat(auto-fill, minmax(255px, 1fr));
`;
