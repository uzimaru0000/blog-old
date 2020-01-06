import program from 'commander';
import fs from 'fs';

import { register, ListCmd, PostCmd, GetCmd, LoginCmd, RemoveCmd } from './cmd';
import { object, string } from '@mojotech/json-type-validation';
import { existDir } from './util';

(async () => {
  const isExist = await existDir(`${process.env.HOME}/.blog/token`);
  const json = JSON.parse(
    isExist
      ? fs.readFileSync(`${process.env.HOME}/.blog/token`).toString()
      : '{ "token": "" }'
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
