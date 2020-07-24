import { NextApiHandler } from 'next';

export const route = (...handlers: NextApiHandler[]): NextApiHandler => (
  req,
  res
) => {
  handlers.forEach((handler) => handler(req, res));
};

const methodGuard = (method: string) => (
  handler: NextApiHandler
): NextApiHandler => (req, res) => {
  if (req.method === method) {
    handler(req, res);
  }
};

export const get = methodGuard('GET');
export const post = methodGuard('POST');
export const put = methodGuard('PUT');
export const del = methodGuard('DELETE');
