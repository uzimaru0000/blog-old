import Head from 'next/head';
import React from 'react';

type Props = {
  title?: string;
  description?: string;
  ogp?: string;
};

const defaultProps = {
  description: 'うじまるのブログです。技術的なことをメインに書いていきます。',
  ogp: 'https://blog.uzimaru.com/OGP.png',
};

export default ({ title, description, ogp }: Props) => (
  <Head>
    <title>{`${subTitle(title)}にわとりになる日まで`}</title>
    <meta charSet="utf-8" />
    <meta
      name="Description"
      content={description || defaultProps.description}
    />
    <meta
      property="og:title"
      content={`${subTitle(title)}にわとりになる日まで`}
    />
    <meta property="og:image" content={ogp || defaultProps.ogp} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta
      name="twitter:title"
      content={`${subTitle(title)}にわとりになる日まで`}
    />
    <meta name="twitter:image" content={ogp || defaultProps.ogp} />
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
    <script
      async
      src="https://platform.twitter.com/widgets.js"
      charSet="utf-8"
    ></script>
  </Head>
);

const subTitle = (subTitle?: string) => (subTitle ? `${subTitle} - ` : '');
