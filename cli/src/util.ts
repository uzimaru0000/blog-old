import fs from 'fs';
import { spawn } from 'child_process';

export const existDir = (path: string) =>
  new Promise<boolean>((res) => {
    fs.stat(path, (err) => {
      res(err === null);
    });
  });

export const mkdir = (path: string) =>
  new Promise<boolean>((res, rej) => {
    fs.mkdir(path, (err) => {
      if (err === null) {
        res(true);
      } else {
        rej(err);
      }
    });
  });

export const readFile = (path: string) =>
  new Promise<Buffer>((res, rej) => {
    fs.readFile(path.replace('~', process.env.HOME), (err, data) => {
      if (err) {
        rej(err);
      } else {
        res(data);
      }
    });
  });

export const remove = (path: string) =>
  new Promise((res, rej) => {
    fs.unlink(path, (err) => (err ? rej(err) : res()));
  });

export const openEditor = (path: string, editor: string = 'vim') =>
  new Promise<number>((res, rej) => {
    const vim = spawn(editor, [path], {
      stdio: [process.stdin, process.stdout, process.stderr],
    });

    vim.on('exit', (code) => {
      if (code === 0) {
        res(code);
      } else {
        rej(code);
      }
    });
  });
