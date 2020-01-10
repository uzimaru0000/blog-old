import { entryWithID } from '../common/model';
import { array } from '@mojotech/json-type-validation';

const endpoint = '/api';

const guard = (x: Response) => {
  if (x.ok) {
    return x;
  } else {
    throw x;
  }
};

export const getEntries = () => {
  return fetch(`${endpoint}/entries`)
    .then(guard)
    .then(x => x.json())
    .then(array(entryWithID).runPromise);
};

export const getEntry = (id: string) => {
  return fetch(`${endpoint}/entry/${id}`)
    .then(guard)
    .then(x => x.json())
    .then(entryWithID.runPromise);
};
