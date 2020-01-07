import micro, { send } from 'micro';
import { router, get, withNamespace } from 'microrouter';
import * as View from './View';

const clientJS = `
const id = document.getElementById('init-data').dataset.id;
window.location.replace(\`https://blog.uzimaru.com/entry/\${id}\`);
`;

const app = router(
  withNamespace('/share')(
    get('/client.js', (_, res) => send(res, 200, clientJS)),
    get('/:id', View.share)
  )
);
micro(app).listen(3000, () => {
  console.log('listen');
});
