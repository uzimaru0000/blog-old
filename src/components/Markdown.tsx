import * as React from 'react';
import { ReactMarkdownProps } from 'react-markdown';
import ReactMarkdown from 'react-markdown/with-html';
import { Plane, H1, H2, H3, H4, H5, H6 } from '../base/Typography';
import styled from 'styled-components';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/styles/hljs';

export default (props: ReactMarkdownProps) => (
  <div>
    <ReactMarkdown
      escapeHtml={false}
      renderers={{
        paragraph: Text,
        heading: (props: React.PropsWithChildren<{ level: number }>) =>
          Heading(props.level)(props),
        code: (props: React.PropsWithChildren<{ value: string }>) => (
          <SyntaxHighlighter style={monokai} {...props}>
            {props.value}
          </SyntaxHighlighter>
        ),
        inlineCode: InlineCode,
        blockquote: Blockquote,
        listItem: ListItem,
        link: Link,
        thematicBreak: Hr,
      }}
      {...props}
    />
  </div>
);

const Text = styled.p`
  ${Plane}
`;

const Heading = (level: number) => (props: React.PropsWithChildren<{}>) => {
  switch (level) {
    case 1:
      return <MarkdownH1 {...props} />;
    case 2:
      return <MarkdownH2 {...props} />;
    case 3:
      return <H3 {...props} />;
    case 4:
      return <H4 {...props} />;
    case 5:
      return <H5 {...props} />;
    case 6:
      return <H6 {...props} />;
    default:
      return Text;
  }
};

const MarkdownH1 = styled(H1)`
  border-bottom: 2px solid var(--color-black-25);
`;

const MarkdownH2 = styled(H2)`
  border-bottom: 1px solid var(--color-black-25);
`;

const InlineCode = styled.code`
  background: var(--color-black-5);
  padding: 2px 4px;
  border-radius: 8px;
`;

const Blockquote = styled.blockquote`
  border-left: 4px solid var(--color-black-25);
  margin-left: 0;
  padding-left: 16px;

  & * {
    color: var(--color-black-50);
  }
`;

const ListItem = styled.li`
  ${Plane}
  display: list-item;
`;

const Link = styled.a`
  color: var(--color-accent);

  &:hover {
    opacity: 0.5;
  }
`;

const Hr = styled.hr`
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0) 5%,
    var(--color-black-50) 15% 85%,
    rgba(0, 0, 0, 0) 95%
  );
  border: none;
  margin: 64px auto;
`;
