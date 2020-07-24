import '../styles/global.scss';
import '../lib/icon';

import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

const ogp = 'https://blog.uzimaru.com/OGP.png';

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>にわとりになる日まで</title>
          <meta charSet="utf-8" />
          <meta
            name="Description"
            content="うじまるのブログです。技術的なことをメインに書いていきます。"
          />
          <meta property="og:title" content="にわとりになる日まで" />
          <meta property="og:image" content={ogp} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="にわとりになる日まで" />
          <meta name="twitter:image" content={ogp} />
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
        <Header>にわとりになる日まで</Header>
        <Component {...pageProps} />
        <Footer />
      </>
    );
  }
}
