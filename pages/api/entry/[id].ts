import { route, get, put, del } from '../../../lib/api/router';
import { WithRepository, errorHandle } from '../../../lib/api/handler';
import { Entry } from '../../../lib/api/Repository';
import { entry, entryEncoder, withID, Entry as E } from '../../../lib/model';
import { verifying } from '../../../lib/api/middleware';
import { authorizer, entryRepo } from '../_config';

const getEntry: WithRepository<Entry.Repository> = (repo) => async (
  req,
  res
) => {
  const id = req.query.id as string;

  try {
    const entry = await repo.get(id);
    res.status(200).json(entryEncoder(entry));
  } catch (e) {
    console.error(e);
    errorHandle(res, e);
  }
};

const updateEntry: WithRepository<Entry.Repository> = (repo) => async (
  req,
  res
) => {
  const { body } = req;
  const id = req.query.id as string;

  try {
    const entryData = await entry.runPromise(body);
    await repo.update(withID<E>(id)(entryData));
    res.status(200).send({ message: 'success' });
  } catch (e) {
    console.error(e);
    errorHandle(res, e);
  }
};

const deleteEntry: WithRepository<Entry.Repository> = (repo) => async (
  req,
  res
) => {
  const id = req.query.id as string;

  try {
    await repo.delete(id);
    res.status(200).json({ message: 'success' });
  } catch (e) {
    console.error(e);
    errorHandle(res, e);
  }
};

const verify = verifying(authorizer);

export default route(
  get(getEntry(entryRepo)),
  put(verify(updateEntry(entryRepo))),
  del(verify(deleteEntry(entryRepo)))
);
