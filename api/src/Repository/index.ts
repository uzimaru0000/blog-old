import * as Account from './account';
import * as Entry from './entry';

type Repository = Account.Repository | Entry.Repository;

export { Repository, Account, Entry };
