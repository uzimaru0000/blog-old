import { route, post } from '../../../lib/api/router';
import { WithRepository, errorHandle } from '../../../lib/api/handler';
import { Entry } from '../../../lib/api/Repository';
import { entry } from '../../../lib/model';
import { verifying } from '../../../lib/api/middleware';
import { authorizer, entryRepo } from '../_config';

const createEntry: WithRepository<Entry.Repository> = (repo) => async (
  { body },
  res
) => {
  try {
    const data = await entry.runPromise(body);
    const id = await repo.create(data);

    res.status(200).json({ message: 'success', id });
  } catch (e) {
    console.error(e);
    errorHandle(res, e);
  }
};

const verify = verifying(authorizer);
export default route(post(verify(createEntry(entryRepo))));
