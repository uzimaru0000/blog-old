import { Cmd } from './type';
import fs from 'fs';
import { postEntry } from '../api';
import prompts from 'prompts';

export default (token: string) =>
  ({
    name: 'post',
    args: ['<file-name>'],
    description: 'post a blog entry',
    async action(fileName: string) {
      const content = fs.readFileSync(fileName).toString();

      const value = await prompts([
        {
          type: 'text',
          name: 'title',
          message: 'input entry title : ',
        },
        {
          type: 'list',
          name: 'tags',
          message: 'input entry tags : ',
          hint: 'separate ","',
          seperator: ',',
          initial: '',
        },
        {
          type: 'text',
          name: 'image',
          message: 'input image path : ',
        },
      ]);

      const res = await postEntry(token, {
        title: value.title,
        content,
        date: new Date(),
        tags: value.tags,
        image: await loadImage(value.image).then(
          x => `data:image/png;base64,${x}`
        ),
      }).then(x => x.json());

      console.log(`Post success\nid: ${res.id}`);
    },
  } as Cmd);

const loadImage = (path: string) =>
  new Promise<string>((res, rej) => {
    fs.readFile(path, 'base64', (err, data) => {
      if (err) {
        rej(err);
      } else {
        res(data);
      }
    });
  });
