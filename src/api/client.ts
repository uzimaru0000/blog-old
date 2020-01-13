import * as API from './api';

const endpoint = 'https://blog.uzimaru.com/api';

export const getEntries = () => API.getEntries(fetch(`${endpoint}/entries`));

export const getEntry = (id: string) =>
  API.getEntry(fetch(`${endpoint}/entry/${id}`));
