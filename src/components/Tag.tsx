import styled from 'styled-components';
import { Plane } from '../base/Typography';

export default styled.a`
  ${Plane}
  border: 1px solid var(--color-black-25);
  border-radius: 8px;
  padding: 4px 8px;
  text-decoration: none;
  transition: 300ms ease;

  &::before {
    content: '# ';
  }

  &:hover {
    background: var(--color-accent);
    color: var(--color-white);
  }
`;
