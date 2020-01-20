import { AugmentedRequestHandler, ServerResponse } from 'microrouter';
import { json, send } from 'micro';
import {
  Role,
  withID,
  entry,
  Entry as E,
  entryEncoder,
} from '../../common/model';
import { Repository, Account, Entry } from './Repository';
import { isDecoderError } from '@mojotech/json-type-validation';
import faunadb from 'faunadb';
import Authorizer, { authData } from './authorizer';

type WithRepository<T extends Repository, U = AugmentedRequestHandler> = (
  repo: T
) => U;

type WithAuthorizer<T = AugmentedRequestHandler> = (
  authorizer: Authorizer
) => T;

const errorHandle = (res: ServerResponse, e: Error) => {
  if (isDecoderError(e)) {
    send(res, 500, { message: 'Internal Server Error' });
  } else {
    const faunaError = e as faunadb.errors.FaunaHttpError;
    send(res, (faunaError.requestResult as any).statusCode, {
      message: faunaError.message,
    });
  }
};

export namespace Handler {
  export const createEntry: WithRepository<Entry.Repository> = repo => async (
    req,
    res
  ) => {
    const body = await json(req);

    try {
      const data = await entry.runPromise(body);
      const id = await repo.create(data);

      send(res, 200, { message: 'success', id });
    } catch (e) {
      console.error(e);
      errorHandle(res, e);
    }
  };

  export const getEntry: WithRepository<Entry.Repository> = repo => async (
    req,
    res
  ) => {
    const id = req.params.id;

    try {
      const entry = await repo.get(id);
      send(res, 200, entryEncoder(entry));
    } catch (e) {
      console.error(e);
      errorHandle(res, e);
    }
  };

  export const getEntries: WithRepository<Entry.Repository> = repo => async (
    req,
    res
  ) => {
    try {
      const ts = Number(req.query.after) || undefined;
      const size = Number(req.query.size) || undefined;
      const tag = req.query.tag;
      const { after, entries } = await (tag
        ? repo.getWithTag(tag, ts, size)
        : repo.getAll(ts, size));
      send(res, 200, { after, entries: entries.map(entryEncoder) });
    } catch (e) {
      console.error(e);
      errorHandle(res, e);
    }
  };

  export const updateEntry: WithRepository<Entry.Repository> = repo => async (
    req,
    res
  ) => {
    const body = await json(req);
    const id = req.params.id;

    try {
      const entryData = await entry.runPromise(body);
      await repo.update(withID<E>(id)(entryData));
      send(res, 200, { message: 'success' });
    } catch (e) {
      console.error(e);
      errorHandle(res, e);
    }
  };

  export const deleteEntry: WithRepository<Entry.Repository> = repo => async (
    req,
    res
  ) => {
    const id = req.params.id;

    try {
      await repo.delete(id);
      send(res, 200, { message: 'success' });
    } catch (e) {
      console.error(e);
      errorHandle(res, e);
    }
  };

  export const createAccount: WithRepository<
    Account.Repository,
    WithAuthorizer
  > = repo => authorizer => async (req, res) => {
    const body = await json(req);

    try {
      const data = await authData.runPromise(body);
      const hash = authorizer.getHash(data.password);

      const account = { id: data.id, role: 'Admin' as Role, hash };
      await repo.create(account);

      const token = authorizer.createToken(account);
      send(res, 200, { token });
    } catch (e) {
      console.log(e);
      errorHandle(res, e);
    }
  };

  export const signin: WithRepository<
    Account.Repository,
    WithAuthorizer
  > = repo => authorizer => async (req, res) => {
    const body = await json(req);

    try {
      const data = await authData.runPromise(body);
      const hash = authorizer.getHash(data.password);

      const account = await repo.get(data.id);

      if (account.hash !== hash) {
        send(res, 401, { message: 'failed to sign in' });
        return;
      }

      const token = authorizer.createToken(account);
      send(res, 200, { token });
    } catch (e) {
      console.log(e);
      errorHandle(res, e);
    }
  };
}
