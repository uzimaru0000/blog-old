import { entryWithID } from './model';
import {
  array,
  object,
  number,
  optional,
} from '@mojotech/json-type-validation';
import * as node from 'node-fetch';

type Res = Response | node.Response;

const guard = (x: Res) => {
  if (x.ok) {
    return x;
  } else {
    throw x;
  }
};

export const getEntries = (res: Promise<Res>) => {
  return res
    .then(guard)
    .then(x => x.json())
    .then(
      object({ entries: array(entryWithID), after: optional(number()) })
        .runPromise
    );
};

export const getEntry = (res: Promise<Res>) => {
  return res
    .then(guard)
    .then(x => x.json())
    .then(entryWithID.runPromise);
};
