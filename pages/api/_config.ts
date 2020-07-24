import { Entry, Account } from '../../lib/api/Repository';
import Authorizer from '../../lib/api/authorizer';

export const entryRepo = new Entry.FaunaRepository(
  process.env.FAUNA_SECRET_KEY || ''
);
export const accountRepo = new Account.FaunaRepository(
  process.env.FAUNA_SECRET_KEY || ''
);
export const authorizer = new Authorizer(
  process.env.SALT || '',
  process.env.TOKEN_SECRET || '',
  'sha512',
  Number(process.env.AMOUNT)
);
