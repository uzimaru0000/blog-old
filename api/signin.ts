import { route, post } from '../lib/api/router';
import { verifying } from '../lib/api/middleware';
import { authorizer, accountRepo } from './_config';
import {
  WithRepository,
  WithAuthorizer,
  errorHandle,
} from '../lib/api/handler';
import { authData } from '../lib/api/authorizer';
import { Account } from '../lib/api/Repository';

const signin: WithRepository<Account.Repository, WithAuthorizer> = (repo) => (
  authorizer
) => async (req, res) => {
  const { body } = req;

  try {
    const data = await authData.runPromise(body);
    const hash = authorizer.getHash(data.password);

    const account = await repo.get(data.id);

    if (account.hash !== hash) {
      res.status(401).json({ message: 'failed to sign in' });
      return;
    }

    const token = authorizer.createToken(account);
    res.status(200).json({ token });
  } catch (e) {
    console.log(e);
    errorHandle(res, e);
  }
};

const verify = verifying(authorizer);

export default route(post(verify(signin(accountRepo)(authorizer))));
