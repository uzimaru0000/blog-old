import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import Authorizer from './authorizer';

export const verifying = (authorizer: Authorizer) => (
  handler: NextApiHandler
) => async (req: NextApiRequest, res: NextApiResponse) => {
  const rawToken = req.headers.authorization;

  if (!rawToken || !/^Bearer +/.test(rawToken)) {
    res.status(401).json({ message: 'unauthorized' });
    return;
  }

  const token = rawToken.split(' ')[1];

  try {
    authorizer.verifyToken(token);
    await handler(req, res);
  } catch (e) {
    res.status(401).json({ message: 'unauthorized' });
  }
};
