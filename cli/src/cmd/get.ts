import { Cmd } from './type';
import { getEntry } from '../api';

export default {
  name: 'get',
  args: ['<id>'],
  description: 'get blog entry with id',
  async action(id: string) {
    try {
      const entry = await getEntry(id);
      console.log(entry.content);
    } catch (e) {
      console.log(e);
    }
  },
} as Cmd;
