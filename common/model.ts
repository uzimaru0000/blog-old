import {
  object,
  string,
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
  ogp: string;
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
  ogp: string(),
});

export const entryWithID = object({
  id: string(),
  title: string(),
  content: string(),
  tags: array(string()),
  image: string(),
  date: number().map(x => new Date(x)),
  ogp: string(),
});

export const entryEncoder = (entry: Entry) => ({
  ...entry,
  date: entry.date.getTime() - entry.date.getTimezoneOffset() * 60 * 1000,
});

export const withID = <T>(id: string) => (data: T) => ({
  ...data,
  id,
});
