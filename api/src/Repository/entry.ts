import {
  Entry,
  entry,
  WithID,
  withID,
  entryEncoder,
} from '../../../common/model';
import faunadb, { query as q } from 'faunadb';
import { FaunaResponseDecoder } from '../utils';
import {
  array,
  object,
  number,
  tuple,
  optional,
} from '@mojotech/json-type-validation'

// accountとentityっていう概念の違いが同列に表現されているので、違和感を感じたので、ここは揃えた方が良いと思いました！
// 個人的には分ける必要はないかなと思ったけど、何かあるのかな？
// 何のRepositoryかわかると良さそう
export interface Repository {
  create(data: Entry): Promise<string>;
  getAll(
    ts?: number,
    size?: number
  ): Promise<{ after?: number; entries: WithID<Entry>[] }>;
  get(id: string): Promise<WithID<Entry>>;
  getWithTag(
    tag: string,
    ts?: number,
    size?: number
  ): Promise<{ after?: number; entries: WithID<Entry>[] }>;
  update(data: WithID<Entry>): Promise<void>;
  delete(id: string): Promise<void>;
}

// 命名が同じだから、若干わかりづらいかな？
export class FaunaRepository implements Repository {
  private client: faunadb.Client;

  constructor(secret: string) {
    this.client = new faunadb.Client({ secret });
  }

  private entryWithID = FaunaResponseDecoder<Entry>(entry).map(x =>
    withID<Entry>(x.ref.id)(x.data)
  );

  async create(data: Entry) {
    return await this.client
      .query(
        q.Create(q.Collection('Entry'), {
          data: entryEncoder(data),
        })
      )
      .then(this.entryWithID.runPromise)
      .then(x => x.id);
  }

  async getAll(ts?: number, size: number = 3) {
    return this.client
      .query(
        q.Map(
          q.Paginate(q.Match(q.Index('entry_sorted_by_date')), {
            size: size,
            after: ts,
          }),
          q.Lambda(['_', 'ref'], q.Get(q.Var('ref')))
        )
      )
      .then(
        object({
          after: optional(tuple([number(), object(), object()]).map(x => x[0])),
          data: array(this.entryWithID),
        }).runPromise
      )
      .then(({ after, data }) => ({ after, entries: data }));
  }

  async get(id: string) {
    return this.client
      .query(q.Get(q.Ref(q.Collection('Entry'), id)))
      .then(x => this.entryWithID.runPromise(x));
  }

  async getWithTag(tag: string, ts?: number, size: number = 3) {
    return this.client
      .query(
        q.Map(
          q.Paginate(q.Match(q.Index('tagged_entry'), tag), {
            size,
            after: ts,
          }),
          q.Lambda('x', q.Get(q.Var('x')))
        )
      )
      .then(
        object({
          after: optional(tuple([number(), object(), object()]).map(x => x[0])),
          data: array(this.entryWithID),
        }).runPromise
      )
      .then(({ after, data }) => ({ after, entries: data }));
  }

  async update({ id, ...data }: WithID<Entry>) {
    await this.client.query(
      q.Update(q.Ref(q.Collection('Entry'), id), { data })
    );
  }

  async delete(id: string) {
    await this.client.query(q.Delete(q.Ref(q.Collection('Entry'), id)));
  }
}
