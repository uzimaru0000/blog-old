import * as React from 'react';
import micro, { send, sendError } from 'micro';
import { router, get } from 'microrouter';
import compress from 'micro-compress';
import view from './View';
import Top from '../components/containers/Top';
import Detail from '../components/containers/Detail';
import NotFound from '../components/containers/NotFound';
import { getEntries, getEntry } from './api';
import { entryEncoder } from '../../../common/model';
import '../style/icon';

const app = router(
  get('/', async (req, res) => {
    try {
      const entries = await getEntries();
      const preData = entries.reduce(
        (acc, { id, ...entry }) => ({
          ...acc,
          [id]: entryEncoder(entry),
        }),
        {}
      );

      send(
        res,
        200,
        view(<Top isLoading={false} entries={entries} />, preData)
      );
    } catch (e) {
      console.error(e);
      sendError(req, res, {});
    }
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

micro(compress(app)).listen(1234, () => {
  console.log('listen');
});
