import { WithRepository, errorHandle } from '../../lib/api/handler';
import { route, get } from '../../lib/api/router';
import { Entry } from '../../lib/api/Repository';
import { entryEncoder } from '../../lib/model';
import { entryRepo } from './_config';

const getEntries: WithRepository<Entry.Repository> = (repo) => async (
  req,
  res
) => {
  try {
    const ts = Number(req.query.after) || undefined;
    const size = Number(req.query.size) || undefined;
    const tag = req.query.tag as string;
    const { after, entries } = await (tag
      ? repo.getWithTag(tag, ts, size)
      : repo.getAll(ts, size));
    res.status(200).json({ after, entries: entries.map(entryEncoder) });
  } catch (e) {
    console.error(e);
    errorHandle(res, e);
  }
};

export default route(get(getEntries(entryRepo)));
