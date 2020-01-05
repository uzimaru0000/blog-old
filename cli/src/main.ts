import program from 'commander';
import fs from 'fs';

import { register, ListCmd, PostCmd, GetCmd, LoginCmd, RemoveCmd } from './cmd';
import { object, string } from '@mojotech/json-type-validation';

(async () => {
  const json = JSON.parse(
    fs.readFileSync(`${process.env.HOME}/.blog/token`).toString()
  );
  const { token } = await object({ token: string() }).runPromise(json);

  program.version('0.0.1');

  register(program)(
    ListCmd,
    PostCmd(token),
    GetCmd,
    LoginCmd,
    RemoveCmd(token)
  ).parse(process.argv);
})();
