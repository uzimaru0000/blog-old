import * as API from '../../../common/api';

const endpoint = '/api';

export const getEntries = (after?: number) =>
  API.getEntries(fetch(`${endpoint}/entries${after ? `?after=${after}` : ''}`));

export const getEntry = (id: string) =>
  API.getEntry(fetch(`${endpoint}/entry/${id}`));
