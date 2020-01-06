import { Cmd } from './type';
import { getEntries } from '../api';
import prompts from 'prompts';

export default {
  name: 'list',
  description: 'list blog entries',
  async action() {
    try {
      const entries = await getEntries();

      const { selected } = await prompts({
        type: 'select',
        name: 'selected',
        message: 'select entry',
        choices: entries.map(x => {
          return {
            title: x.title,
            value: x,
            description: dateFormat(x.date),
          };
        }),
      });

      console.log(`
id: ${selected.id}

${selected.content}
`);
    } catch (e) {
      console.log(e);
    }
  },
} as Cmd;

const dateFormat = (date: Date) => {
  const year = date.getFullYear();
  const month = ('00' + (date.getMonth() + 1)).slice(-2);
  const day = ('00' + date.getDate()).slice(-2);
  return `${year}/${month}/${day}`;
};
