import { entryWithID } from './model';
import {
  array,
  object,
  number,
  optional,
} from '@mojotech/json-type-validation';

const guard = (x: Response) => {
  if (x.ok) {
    return x;
  } else {
    throw x;
  }
};

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://blog.uzimaru.com'
    : 'http://localhost:3000';

const endpoint = '/api';

export const GET_ENTRIES = (after?: number) =>
  `${BASE_URL}${endpoint}/entries${after ? `?after=${after}` : ''}`;

export const GET_ENTRY = (id: string) => `${BASE_URL}${endpoint}/entry/${id}`;

export const GET_ENTRIES_WITH_TAG = (tag: string, after?: number) =>
  `${BASE_URL}${endpoint}/entries?tag=${encodeURIComponent(tag)}${
    after ? `&after=${after}` : ''
  }`;

export const getEntries = (after?: number) =>
  fetch(GET_ENTRIES(after))
    .then(guard)
    .then((x) => x.json())
    .then(
      object({ entries: array(entryWithID), after: optional(number()) })
        .runPromise
    );

export const getEntry = (id: string) =>
  fetch(GET_ENTRY(id))
    .then(guard)
    .then((x) => x.json())
    .then(entryWithID.runPromise);

export const getEntriesWithTag = (tag: string, after?: number) =>
  fetch(GET_ENTRIES_WITH_TAG(tag, after))
    .then(guard)
    .then((x) => x.json())
    .then(
      object({ entries: array(entryWithID), after: optional(number()) })
        .runPromise
    );
