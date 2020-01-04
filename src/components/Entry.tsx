import * as React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { H1, H5, H6, Plane } from '../base/Typography';
import Tag from './Tag';
import Markdown from './Markdown';
import media from 'styled-media-query';

interface Props {
  id: string;
  title: string;
  date: Date;
  tags: string[];
  content: string;
  isExtend?: boolean;
}

export default (props: Props) => (
  <Wrapper isExtend={props.isExtend}>
    <InnerWrapper>
      <Title>{props.title}</Title>
      <Date>{dateFormat(props.date)}</Date>
      <Tags>
        {props.tags.map(x => (
          <Tag key={x} href={`/tag/${x}`}>
            {x}
          </Tag>
        ))}
      </Tags>
      {props.isExtend ? (
        <Markdown source={props.content} />
      ) : (
        <Content>{props.content}</Content>
      )}
      {!props.isExtend && (
        <ReadMoreWrapper>
          <ReadMore as="a" href={`/entry/${props.id}`}>
            <FontAwesomeIcon icon="angle-right" />
            READ MORE
          </ReadMore>
        </ReadMoreWrapper>
      )}
    </InnerWrapper>
  </Wrapper>
);

const dateFormat = (date: Date) => {
  const year = date.getFullYear();
  const month = ('00' + (date.getMonth() + 1)).slice(-2);
  const day = ('00' + date.getDate()).slice(-2);
  return `${year} / ${month} / ${day}`;
};

const Wrapper = styled.div<{ isExtend?: boolean }>`
  width: 100%;
  padding: 32px;
  ${props =>
    !props.isExtend &&
    media.lessThan('medium')`
    width: 90%;
    margin: 16px auto;
    box-shadow: 0 0 4px 0 var(--color-black-50);
    border-radius: 16px;
  `}
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled(H1)`
  border-left: 16px solid var(--color-primary);
  padding-left: 24px;
`;

const Date = styled(H6)`
  color: var(--color-black-50);
  padding-left: 40px;
`;

const Tags = styled.div`
  padding: 16px 0 8px 40px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  & ${Tag} {
    margin: 0 8px 8px 0;
  }
`;

const Content = styled.pre`
  ${Plane}
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
  width: 100%;
  max-height: 160px;
  margin-bottom: 1rem;

  ${media.lessThan('medium')`
    display: none;
  `}
`;

const ReadMoreWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const ReadMore = styled(H5)`
  position: relative;
  color: var(--color-black);
  border: 1px solid var(--color-primary);
  padding: 8px 32px;
  text-decoration: none;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 8px;
    height: 100%;
    background: var(--color-primary);
    transition: 0.3s ease;
    z-index: -1;
  }

  &:hover::after {
    width: 100%;
  }

  &:hover {
    color: var(--color-white);
  }

  & *:first-child {
    margin-right: 8px;
  }
`;
