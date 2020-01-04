import * as React from 'react';
import styled from 'styled-components';
import Entry from '../components/Entry';
import media from 'styled-media-query';

export default () => (
  <Wrapper>
    <Entry
      id="xxx"
      title="HogeをFugaした話"
      date={new Date()}
      tags={['WebFrontend', '人生', 'あいう', 'ABC', 'いろは', 'abc', '123']}
      content={source}
      isExtend={false}
    />
    <Entry
      id="xxx"
      title="HogeをFugaした話"
      date={new Date()}
      tags={['WebFrontend', '人生']}
      content={source}
      isExtend={false}
    />
  </Wrapper>
);

const source = `
# ABC abc 123 いろは

## ABC abc 123 いろは

### ABC abc 123 いろは

#### ABC abc 123 いろは

##### ABC abc 123 いろは

###### ABC abc 123 いろは

ABC abc 123 いろは

- ABC abc 123 いろは
- ABC abc 123 いろは

1. ABC abc 123 いろは
2. ABC abc 123 いろは

> ABC abc 123 いろは

\`ABC abc 123 いろは\`

\`\`\`js
const a = 12;
console.log(a);
\`\`\`

[りんく]()

---

![](https://avatars0.githubusercontent.com/u/13715034?s=460&v=4)
`;

const Wrapper = styled.div`
  ${media.greaterThan('medium')`
    margin: 0 auto;
    width: 90%;
    max-width: 980px;
  `}

  ${media.lessThan('medium')`
    width: 100%;
  `}
`;
