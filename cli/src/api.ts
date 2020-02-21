import fetch from 'node-fetch';
import FormData from 'form-data';
import { object, string } from '@mojotech/json-type-validation';

const imgurEndpoint = 'https://api.imgur.com/3/image';

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
