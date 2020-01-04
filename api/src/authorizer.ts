import * as crypto from 'crypto';
import { object, string } from '@mojotech/json-type-validation';
import { sign, verify } from 'jsonwebtoken';
import { Account } from './model';

export interface AuthData {
  id: string;
  password: string;
}

export const authData = object({
  id: string(),
  password: string(),
});

export default class Authorizer {
  constructor(
    private salt: string,
    private tokenSecret: string,
    private algorithm: string = 'sha512',
    private amount: number = 1
  ) {}

  getHash(data: string) {
    return [...Array(this.amount)].reduce((acc, _) => {
      return this.createHash(acc);
    }, data);
  }

  private createHash(data: string) {
    const hash = crypto.createHash(this.algorithm);
    hash.update(data + this.salt);

    return hash.digest('hex');
  }

  createToken({ hash: _, ...data }: Account) {
    return sign(data, this.tokenSecret);
  }

  verifyToken(token: string) {
    return verify(token, this.tokenSecret);
  }
}
