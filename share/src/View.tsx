import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { send } from 'micro';
import { AugmentedRequestHandler } from 'microrouter';
import fetch from 'node-fetch';

export const share: AugmentedRequestHandler = async (req, res) => {
  const id = req.params.id;
  const { ogp } = await fetch(
    `https://blog.uzimaru.com/api/entry/${id}`
  ).then(x => x.json());
  const page = renderToString(<Template id={id} ogpImage={ogp} />);
  res.setHeader('content-type', 'text/html; charset=UTF-8');
  res.setHeader('Location', `https://blog.uzimaru.com/entry/${id}`);
  send(res, 200, page);
};

const Template = ({ id, ogpImage }: { id: string; ogpImage: string }) => (
  <html>
    <head>
      <title>にわとりになる日まで</title>
      <meta charSet="utf-8" />
      <meta property="og:title" content="にわとりになる日まで" />
      <meta property="og:image" content={ogpImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="にわとりになる日まで" />
      <meta name="twitter:image" content={ogpImage} />
      <link rel="canonical" href={`https://blog.uzimaru.com/entry/${id}`} />
    </head>
    <body>
      <script id="init-data" data-id={id}></script>
      <script src="/share/client.js" />
    </body>
  </html>
);
