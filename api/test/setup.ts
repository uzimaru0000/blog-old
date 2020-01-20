import { Server } from 'http';
import anyTest, { TestInterface } from 'ava';

interface Context {
  service: Server;
}

export const test = anyTest as TestInterface<Context>;

test.after(t => {
  if (t.context.service) {
    t.context.service.close();
  }
});
