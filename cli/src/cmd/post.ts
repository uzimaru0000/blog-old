import { Cmd } from './type';
import fs from 'fs';
import { postEntry, uploadImage } from '../api';
import prompts from 'prompts';
import ogp from '../ogp';

export default (token: string) =>
  ({
    name: 'post',
    args: ['<md-file>', '<image-file>'],
    description: 'post a blog entry',
    async action(mdFileName: string, imgFileName: string) {
      try {
        const [content, imageBuf] = await Promise.all([
          readFile(mdFileName).then(x => x.toString()),
          readFile(imgFileName),
        ]);

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
        ]);

        const ogpImage = await ogp(value.title);

        const res = await postEntry(token, {
          title: value.title,
          content,
          date: new Date(),
          tags: value.tags,
          image: await uploadImage('f1d7dba802aa5fd', imageBuf).then(
            x => x.data.link
          ),
          ogp: await uploadImage('f1d7dba802aa5fd', ogpImage).then(
            x => x.data.link
          ),
        }).then(x => x.json());

        console.log(
          `Post success\nURL: https://blog.uzimaru.com/entry/${res.id}`
        );
      } catch (e) {
        console.error(e);
      }
    },
  } as Cmd);

const readFile = (path: string) =>
  new Promise<Buffer>((res, rej) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        rej(err);
      } else {
        res(data);
      }
    });
  });
