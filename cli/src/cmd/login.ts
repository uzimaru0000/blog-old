import { Cmd } from './type';
import prompts from 'prompts';
import { login } from '../api';
import { existDir, mkdir } from '../util';
import fs from 'fs';

export default {
  name: 'login',
  description: 'login CMS',
  async action() {
    try {
      const value = await prompts([
        {
          type: 'text',
          name: 'id',
          message: 'input id : ',
        },
        {
          type: 'password',
          name: 'password',
          message: 'input password : ',
        },
      ]);

      const res = await login(value.id, value.password);

      await existDir(`${process.env.HOME}/.blog`).then(
        x => !x && mkdir(`${process.env.HOME}/.blog`)
      );

      fs.writeFileSync(`${process.env.HOME}/.blog/token`, JSON.stringify(res));

      console.log('Login success');
    } catch (e) {
      console.log('Login failed');
    }
  },
} as Cmd;
