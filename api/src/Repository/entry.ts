import { Entry, entry, WithID, withID } from '../model';
import faunadb, { query as q } from 'faunadb';
import { FaunaResponseDecoder } from '../utils';
import { array } from '@mojotech/json-type-validation';

export interface Repository {
  create(data: Entry): Promise<void>;
  getAll(): Promise<WithID<Entry>[]>;
  get(id: string): Promise<WithID<Entry>>;
  update(data: WithID<Entry>): Promise<void>;
  delete(id: string): Promise<void>;
}

export class FaunaRepository implements Repository {
  private client: faunadb.Client;

  constructor(secret: string) {
    this.client = new faunadb.Client({ secret });
  }

  private entryWithID = FaunaResponseDecoder<Entry>(entry).map(x =>
    withID<Entry>(x.ref.id)(x.data)
  );

  async create(data: Entry) {
    await this.client.query(q.Create(q.Ref(q.Collection('Entry')), { data }));
  }

  async getAll() {
    return this.client
      .query(
        q.Map(
          q.Paginate(q.Match(q.Index('all_entry'))),
          q.Lambda('x', q.Get(q.Var('x')))
        )
      )
      .then(x => (x as any).data)
      .then(array(this.entryWithID).runPromise);
  }

  async get(id: string) {
    return this.client
      .query(q.Get(q.Ref(q.Collection('Entry'), id)))
      .then(x => this.entryWithID.runPromise(x));
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
