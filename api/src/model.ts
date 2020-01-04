import {
  object,
  string,
  optional,
  number,
  array,
  succeed,
  fail,
} from '@mojotech/json-type-validation';

export type WithID<T> = { id: string } & T;

export type Role = 'Admin';

export interface Account {
  id: string;
  role: Role;
  hash: string;
}

export interface Entry {
  title: string;
  content: string;
  tags: string[];
  image: string;
  date: Date;
}

export const account = object({
  id: string(),
  role: string().andThen(x => {
    switch (x) {
      case 'Admin':
        return succeed<Role>(x);
    }

    return fail<Role>('error');
  }),
  hash: string(),
});

export const entry = object({
  title: string(),
  content: string(),
  tags: array(string()),
  image: string(),
  date: number().map(x => new Date(x)),
});

export const entryEncoder = (entry: Entry) => ({
  date: entry.date.getTime(),
  ...entry,
});

export const withID = <T>(id: string) => (data: T) => ({
  id,
  ...data,
});
