import * as Account from './account';
import * as Entry from './entry';

export type Repository = Account.Repository | Entry.Repository;

export { Account, Entry };
