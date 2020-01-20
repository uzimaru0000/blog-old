import micro, { send } from 'micro';
import { router, get, post, patch, del, withNamespace } from 'microrouter';
import { Handler } from './handler';
import { Account, Entry } from './Repository';
import { verifying } from './middleware';
import Authorizer from './authorizer';
import microCors from 'micro-cors';

const accountRepo = new Account.FaunaRepository(
  process.env.FAUNA_SECRET_KEY || ''
);
const entryRepo = new Entry.FaunaRepository(process.env.FAUNA_SECRET_KEY || '');
const authorizer = new Authorizer(
  process.env.SALT || '',
  process.env.TOKEN_SECRET || '',
  'sha512',
  Number(process.env.AMOUNT)
);

const entryHandler = [
  get('/entries', Handler.getEntries(entryRepo)),
  get('/entry/:id', Handler.getEntry(entryRepo)),
  post('/entry', verifying(authorizer)(Handler.createEntry(entryRepo))),
  patch('/entry', verifying(authorizer)(Handler.updateEntry(entryRepo))),
  del('/entry/:id', verifying(authorizer)(Handler.deleteEntry(entryRepo))),
];

const app = router(
  withNamespace('/api')(
    get('/', () => ({ message: 'server is running' })),
    post(
      '/signup',
      verifying(authorizer)(Handler.createAccount(accountRepo)(authorizer))
    ),
    post('/signin', Handler.signin(accountRepo)(authorizer)),
    ...entryHandler,
    get('/*', (_, res) => send(res, 404, { message: 'not found' }))
  )
);

const cors = microCors();

micro(cors(app)).listen(3000, () => {
  console.log('server is running.');
});
