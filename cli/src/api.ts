import fetch from 'node-fetch';
import FormData from 'form-data';
import { Entry, entryEncoder, entryWithID } from '../../common/model';
import { array, object, string } from '@mojotech/json-type-validation';

const endpoint = 'https://blog.uzimaru.com/api';
const imgurEndpoint = 'https://api.imgur.com/3/image';

export const getEntries = () =>
  fetch(`${endpoint}/entries`)
    .then(x => x.json())
    .then(array(entryWithID).runPromise);

export const postEntry = (token: string, entry: Entry) =>
  fetch(`${endpoint}/entry`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(entryEncoder(entry)),
  });

export const getEntry = (id: string) =>
  fetch(`${endpoint}/entry/${id}`)
    .then(x => x.json())
    .then(entryWithID.runPromise);

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
