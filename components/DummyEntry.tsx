import * as React from 'react';
import styled from 'styled-components';
import media from 'styled-media-query';
import { H1, H6 } from './base/Typography';

interface Props {
  isExtend?: boolean;
}

export default ({ isExtend }: Props) => (
  <Wrapper isExtend={isExtend}>
    <InnerWrapper>
      <Title />
      <Date />
      <Tags>
        <div />
        <div />
        <div />
      </Tags>
      <Content>
        {(isExtend
          ? [...Array(16)]
              .map(_ => Math.round(Math.random() * 3))
              .map(i => ['50%', '75%', '100%'][i])
          : ['100%', '100%', '50%', '100%', '75%']
        ).map((x, i) => (
          <Line key={i} width={x} />
        ))}
      </Content>
    </InnerWrapper>
  </Wrapper>
);

const Wrapper = styled.div<{ isExtend?: boolean }>`
  width: 100%;
  padding: 32px;
  ${props =>
    !props.isExtend &&
    media.lessThan('medium')`
    width: 90%;
    margin: 16px auto;
    box-shadow: 0 0 4px 0 var(--color-text-50);
    border-radius: 16px;
  `}
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled(H1)`
  position: relative;
  border-left: 16px solid var(--color-primary);
  padding-left: 24px;
  height: 3.5rem;

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background-color: var(--color-text-25);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 24px;
    display: block;
    width: 0;
    height: 100%;
    background-color: var(--color-text-25);
    animation: loading 1s ease infinite;
  }

  @keyframes loading {
    from {
      width: 0;
      opacity: 1;
    }
    to {
      width: calc(100% - 24px);
      opacity: 0;
    }
  }
`;

const Date = styled(H6)`
  display: inline-block;
  width: 25%;
  height: 1.5rem;
  background: var(--color-text-25);
  margin: 0.5rem 0 0 40px;

  &:before {
    content: '';
    display: block;
    height: 100%;
    background-color: var(--color-text-25);
    animation: loading 1s ease infinite;
  }

  @keyframes loading {
    from {
      width: 0;
      opacity: 1;
    }
    to {
      width: 100%;
      opacity: 0;
    }
  }
`;

const Tags = styled.div`
  padding: 0.5rem 0 1rem 40px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  & div {
    width: 5rem;
    height: 1.5rem;
    background: var(--color-text-25);
    margin-right: 8px;

    &::before {
      content: '';
      display: block;
      height: 100%;
      background-color: var(--color-text-25);
      animation: loading 1s ease infinite;
    }
  }
  @keyframes loading {
    from {
      width: 0;
      opacity: 1;
    }
    to {
      width: 100%;
      opacity: 0;
    }
  }
`;

const Content = styled.div`
  width: 100%;

  ${media.lessThan('medium')`
    display: none;
  `}
`;

const Line = styled.div<{ width?: string }>`
  width: ${({ width }) => width || '100%'};
  height: 1.5rem;
  background-color: var(--color-text-25);
  margin-bottom: 0.5rem;

  &::before {
    content: '';
    display: block;
    height: 100%;
    background-color: var(--color-text-25);
    animation: loading 1s ease infinite;
  }
  @keyframes loading {
    from {
      width: 0;
      opacity: 1;
    }
    to {
      width: 100%;
      opacity: 0;
    }
  }
`;
