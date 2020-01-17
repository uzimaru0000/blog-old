import { Cmd } from './type';
import fs from 'fs';
import { postEntry, uploadImage } from '../api';
import prompts from 'prompts';
import ogp from '../ogp';
import { emojify, search, Emoji } from 'node-emoji';

export default (token: string) =>
  ({
    name: 'post',
    args: ['<md-file>', '<image-file>'],
    description: 'post a blog entry',
    async action(mdFileName: string, imgFileName: string) {
      try {
        const [content, imageBuf] = await Promise.all([
          readFile(mdFileName)
            .then(x => emojify(x.toString()))
            .then(emojiProcess)
            .then(localImageProcess),
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

// 画像系の処理
const localImageProcess = async (md: string) => {
  const localURL = findLocalImage(md);

  const replaceFuncs = await Promise.all(
    localURL.map(x =>
      readFile(x)
        .then(buff => uploadImage('f1d7dba802aa5fd', buff))
        .then(({ data }) => [x, data.link] as [string, string])
        .then(([path, url]) => replaceLocalImage(path, url))
    )
  );

  return replaceFuncs.reduce((acc, x) => x(acc), md);
};

const findLocalImage = (md: string) => {
  const imageRegex = /!\[(?:.*)\]\((.+)\)/;
  const urlRegex = /http(?:s|):\/\//;

  if (!imageRegex.test(md)) {
    return [];
  }

  return md
    .match(new RegExp(imageRegex, 'g'))
    .map(x => x.match(imageRegex)[1])
    .filter(x => !urlRegex.test(x));
};

const replaceLocalImage = (localPath: string, url: string) => (md: string) =>
  md.replace(localPath, url);

// 絵文字系の処理
const emojiProcess = (md: string) =>
  findEmoji(md)
    .map(x => (console.log(x), x))
    .map(x => [x, search(x)] as [string, Emoji[]])
    .filter(([_, x]) => x.length > 0)
    .map(([str, [emoji]]) => [str, emoji] as [string, Emoji])
    .map(([str, emoji]) => (md: string) => md.replace(str, emoji.emoji))
    .reduce((acc, x) => x(acc), md);

const findEmoji = (md: string) => {
  const emojiRegex = /:(\w*):/;

  if (!emojiRegex.test(md)) {
    return [];
  }

  return md.match(new RegExp(emojiRegex, 'g')).map(x => x.match(emojiRegex)[0]);
};
