import micro from 'micro';
import { test } from './setup';
import listen from 'test-listen';
import request from 'request-promise';
import { Handler } from '../src/handler';
import { router, get } from 'microrouter';
import { Entry, WithID } from '../../common/model';
import { Repository } from '../src/Repository/entry';

const repo = {
  async create(_: Entry) {
    return '';
  },
  async getAll() {
    return [];
  },
  async get(id: string) {
    return {
      id: id,
      title: '',
      content: '',
      tags: [],
      image: '',
      date: new Date(),
      ogp: '',
    };
  },
  async update(_: WithID<Entry>) {},
  async delete(_: string) {},
} as Repository;

test.before(t => {
  t.context.service = micro(
    router(
      get('/all', Handler.getEntries(repo)),
      get('/:id', Handler.getEntry(repo))
    )
  );
});

test('get all', async t => {
  const url = await listen(t.context.service);
  const body = await request(`${url}/all`);

  console.log(body);

  t.pass();
});
