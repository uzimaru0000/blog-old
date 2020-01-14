import { renderToString } from 'react-dom/server';
import * as React from 'react';
import { dom } from '@fortawesome/fontawesome-svg-core';
import Header from './components/Header';
import Footer from './components/Footer';
import { ServerStyleSheet } from 'styled-components';
import GlobalCSS from './style/global';

export default (
  element: React.ReactElement,
  preData: { [key: string]: any } = {},
  isLoadJS: boolean = true,
  ogp?: string
) => {
  const sheet = new ServerStyleSheet();
  const content = sheet.collectStyles(<Skeleton>{element}</Skeleton>);
  const body = renderToString(<Body isLoadJS={isLoadJS}>{content}</Body>);
  const style = sheet.getStyleElement();
  sheet.seal();
  const head = renderToString(
    <Head preData={preData} style={style} ogp={ogp} />
  );
  return `<!DOCTYPE html><html lang="ja">${head}${body}</html>`;
};

const Skeleton = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <>
      <Header>にわとりになる日まで</Header>
      {children}
      <Footer />
    </>
  );
};

const Head = ({
  preData,
  style,
  ogp,
}: {
  preData: { [key: string]: any };
  style: React.ReactElement[];
  ogp?: string;
}) => (
  <head>
    <title>にわとりになる日まで</title>
    <meta charSet="utf-8" />
    <meta
      name="Description"
      content="うじまるのブログです。技術的なことをメインに書いていきます。"
    />
    <meta property="og:title" content="にわとりになる日まで" />
    <meta
      property="og:image"
      content={ogp || 'https://i.imgur.com/cohWQUU.png'}
    />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="にわとりになる日まで" />
    <meta
      name="twitter:image"
      content={ogp || 'https://i.imgur.com/cohWQUU.png'}
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=UA-148389217-1"
    />
    <script
      dangerouslySetInnerHTML={{
        __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-148389217-1');
        `,
      }}
    />
    <script id="init-state" data-state={JSON.stringify(preData)} />
    <style
      dangerouslySetInnerHTML={{
        __html: dom.css(),
      }}
    />
    {style}
  </head>
);

const Body = ({
  children,
  isLoadJS,
}: React.PropsWithChildren<{ isLoadJS: boolean }>) => (
  <body>
    <div id="main">{children}</div>
    {isLoadJS && <script defer src="/js/main.js" />}
    <GlobalCSS />
  </body>
);
