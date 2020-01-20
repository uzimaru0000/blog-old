import * as API from '../../../common/api';
import fetch from 'node-fetch';

// const endpoint = 'https://blog.uzimaru.com/api';
const endpoint = 'http://localhost:3000/api';

export const getEntries = () =>
  API.getEntries(fetch(`${endpoint}/entries`)).then(x => x.entries);

export const getEntriesWithTag = (tag: string) =>
  API.getEntries(fetch(`${endpoint}/entries?tag=${tag}`)).then(x => x.entries);

export const getEntry = (id: string) =>
  API.getEntry(fetch(`${endpoint}/entry/${id}`));
