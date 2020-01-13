import * as React from 'react';
import micro, { send } from 'micro';
import { router, get } from 'microrouter';
import view from './View';
import Top from './containers/Top';
import Detail from './containers/Detail';
import NotFound from './page/NotFound';
import { getEntries, getEntry } from './api/server';
import { entryEncoder } from '../common/model';
import './icon';

const app = router(
  get('/', async (_, res) => {
    const entries = await getEntries();
    const preData = entries.reduce(
      (acc, { id, ...entry }) => ({ ...acc, [id]: entryEncoder(entry) }),
      {}
    );

    send(res, 200, view(<Top entries={entries} />, preData));
  }),
  get('/entry/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const entry = await getEntry(id);
      const { id: _, ...preData } = entry;

      send(
        res,
        200,
        view(
          <Detail entry={entry} />,
          { [id]: entryEncoder(preData) },
          true,
          entry.ogp
        )
      );
    } catch (e) {
      send(res, 404, view(<NotFound />, {}, false));
    }
  }),
  get('/*', (_, res) => {
    send(res, 404, view(<NotFound />, {}, false));
  })
);

micro(app).listen(1234, () => {
  console.log('listen');
});
