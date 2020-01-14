import styled, { css } from 'styled-components';

const master = css`
  margin: 0;
  padding: 0;
  color: var(--color-text);
`;

export const H1 = styled.h1`
  ${master}
  font-size: 3rem;
  font-weight: normal;
`;

export const H2 = styled.h2`
  ${master}
  font-size: 2.5rem;
  font-weight: normal;
`;

export const H3 = styled.h3`
  ${master}
  font-size: 2rem;
  font-weight: 500;
`;

export const H4 = styled.h4`
  ${master}
  font-size: 2rem;
  font-weight: normal;
`;
export const H5 = styled.h5`
  ${master}
  font-size: 1.5rem;
  font-weight: 500;
`;

export const H6 = styled.h6`
  ${master}
  font-size: 1.5rem;
  font-weight: normal;
`;

export const Plane = css`
  ${master}
  font-weight: normal;
`;
