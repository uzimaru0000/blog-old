import { route, get } from '../lib/api/router';

export default route(
  get((_, res) => res.status(200).json({ message: 'server is running' }))
);
