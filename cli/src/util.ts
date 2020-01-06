import fs from 'fs';

export const existDir = (path: string) =>
  new Promise<boolean>(res => {
    fs.stat(path, err => {
      res(err === null);
    });
  });

export const mkdir = (path: string) =>
  new Promise<boolean>((res, rej) => {
    fs.mkdir(path, err => {
      if (err === null) {
        res(true);
      } else {
        rej(err);
      }
    });
  });
