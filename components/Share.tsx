import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import styled from 'styled-components';

interface Props {
  icon: IconProp;
  url: string;
  color: string;
}

export default (props: Props) => (
  <Wrapper href={props.url} color={props.color} target="__blank">
    <FontAwesomeIcon icon={props.icon} />
  </Wrapper>
);

const Wrapper = styled.a`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  width: 3rem;
  height: 3rem;
  border: ${({ color }) => `0.1rem solid ${color}`};
  border-radius: 1rem;
  overflow: hidden;
  color: ${({ color }) => color};
  transition: 300ms ease;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: -22%;
    left: -22%;
    width: 144%;
    height: 144%;
    background: ${({ color }) => color};
    transform: scale(0);
    border-radius: 50%;
    z-index: -1;
    transition: 300ms ease;
  }

  &:hover::before {
    transform: scale(1);
  }

  &:hover {
    color: var(--color-white);
  }
`;
