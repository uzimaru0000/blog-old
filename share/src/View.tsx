import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { send } from 'micro';
import { AugmentedRequestHandler } from 'microrouter';

export const share: AugmentedRequestHandler = (req, res) => {
  const id = req.params.id;
  const page = renderToString(<Template id={id} />);
  res.setHeader('content-type', 'text/html');
  res.setHeader('Location', `https://blog.uzimaru.com/entry/${id}`);
  send(res, 200, page);
};

const Template = ({ id }: { id: string }) => (
  <html>
    <head>
      <title>にわとりになる日まで</title>
      <meta charSet="utf-8" />
      <meta property="og:title" content="にわとりになる日まで" />
      <meta property="og:image" content="https://i.imgur.com/cXD5XlA.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="にわとりになる日まで" />
      <meta name="twitter:image" content="https://i.imgur.com/cXD5XlA.png" />
      <link rel="canonical" href={`https://blog.uzimaru.com/entry/${id}`} />
    </head>
    <body>
      <script id="init-data" data-id={id}></script>
      <script src="/share/client.js" />
    </body>
  </html>
);
