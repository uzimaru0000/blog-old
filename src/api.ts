import { entryWithID } from '../common/model';
import { array } from '@mojotech/json-type-validation';

const endpoint = 'https://blog.api.uzimaru.com';

export const getEntries = () => {
  return fetch(`${endpoint}/entries`)
    .then(x => x.json())
    .then(array(entryWithID).runPromise);
};

export const getEntry = (id: string) => {
  return fetch(`${endpoint}/entry/${id}`)
    .then(x => x.json())
    .then(entryWithID.runPromise);
};
