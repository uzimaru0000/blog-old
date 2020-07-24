import { NextApiHandler, NextApiResponse } from 'next';
import { Repository } from './Repository';
import { isDecoderError } from '@mojotech/json-type-validation';
import faunadb from 'faunadb';
import Authorizer from './authorizer';

export type WithRepository<T extends Repository, U = NextApiHandler> = (
  repo: T
) => U;

export type WithAuthorizer<T = NextApiHandler> = (authorizer: Authorizer) => T;

export const errorHandle = (res: NextApiResponse, e: Error) => {
  if (isDecoderError(e)) {
    res.status(500).json({ message: 'Internal Server Error' });
  } else {
    const faunaError = e as faunadb.errors.FaunaHttpError;
    res.status((faunaError.requestResult as any).statusCode).json({
      message: faunaError.message,
    });
  }
};
