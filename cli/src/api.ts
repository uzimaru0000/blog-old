import fetch from 'node-fetch';
import { Entry, entryEncoder, entryWithID } from '../../common/model';
import { array, object, string } from '@mojotech/json-type-validation';

const endpoint = 'http://localhost:3000';

export const getEntries = () => {
  return fetch(`${endpoint}/entries`)
    .then(x => x.json())
    .then(array(entryWithID).runPromise);
};

export const postEntry = (token: string, entry: Entry) => {
  return fetch(`${endpoint}/entry`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(entryEncoder(entry)),
  });
};

export const getEntry = (id: string) => {
  return fetch(`${endpoint}/entry/${id}`)
    .then(x => x.json())
    .then(entryWithID.runPromise);
};

export const login = (id: string, password: string) => {
  return fetch(`${endpoint}/signin`, {
    method: 'POST',
    body: JSON.stringify({ id, password }),
  })
    .then(x => x.json())
    .then(object({ token: string() }).runPromise);
};
