import fetch from 'node-fetch';
import FormData from 'form-data';
import { Entry, entryEncoder } from '../../common/model';
import { object, string } from '@mojotech/json-type-validation';
import * as API from '../../common/api';

const endpoint = 'https://blog.uzimaru.com/api';
const imgurEndpoint = 'https://api.imgur.com/3/image';

export const getEntries = () =>
  API.getEntries(fetch(`${endpoint}/entries?size=64`)).then(x => x.entries);

export const getEntry = (id: string) =>
  API.getEntry(fetch(`${endpoint}/entry/${id}`));

export const postEntry = (token: string, entry: Entry) =>
  fetch(`${endpoint}/entry`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(entryEncoder(entry)),
  });

export const login = (id: string, password: string) =>
  fetch(`${endpoint}/signin`, {
    method: 'POST',
    body: JSON.stringify({ id, password }),
  })
    .then(x => x.json())
    .then(object({ token: string() }).runPromise);

export const uploadImage = (clientID: string, image: Buffer) => {
  const data = new FormData();
  data.append('image', image);

  return fetch(imgurEndpoint, {
    method: 'POST',
    headers: { authorization: `Client-ID ${clientID}` },
    body: data,
  })
    .then(x => x.json())
    .then(
      object({
        data: object({
          link: string(),
        }),
      }).runPromise
    );
};

export const removeEntry = (token: string, id: string) =>
  fetch(`${endpoint}/entry/${id}`, {
    method: 'DELETE',
    headers: { authorization: `Bearer ${token}` },
  });
