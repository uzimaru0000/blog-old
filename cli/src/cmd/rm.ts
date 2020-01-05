import { Cmd } from '.';
import prompts = require('prompts');
import { getEntries, removeEntry } from '../api';

export default (token: string) =>
  ({
    name: 'rm',
    args: ['[entry-id]'],
    description: 'remove blog entry',
    async action(id?: string) {
      try {
        if (!id) {
          const entries = await getEntries();
          id = await prompts({
            type: 'select',
            message: 'select remove entry',
            name: 'id',
            choices: entries.map(x => ({
              title: x.title,
              value: x.id,
              description: x.content.slice(0, 24) + '...',
            })),
          }).then(x => x.id);
        }

        await removeEntry(token, id);
        console.log('remove success');
      } catch (e) {
        console.error(e);
      }
    },
  } as Cmd);
