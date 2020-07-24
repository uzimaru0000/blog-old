import { Account } from '../../lib/api/Repository';
import { authData } from '../../lib/api/authorizer';
import { Role } from '../../lib/model';
import { route, post } from '../../lib/api/router';
import {
  WithRepository,
  WithAuthorizer,
  errorHandle,
} from '../../lib/api/handler';
import { accountRepo, authorizer } from './_config';

const createAccount: WithRepository<Account.Repository, WithAuthorizer> = (
  repo
) => (authorizer) => async (req, res) => {
  const { body } = req;

  try {
    const data = await authData.runPromise(body);
    const hash = authorizer.getHash(data.password);

    const account = { id: data.id, role: 'Admin' as Role, hash };
    await repo.create(account);

    const token = authorizer.createToken(account);
    res.status(200).json({ token });
  } catch (e) {
    console.log(e);
    errorHandle(res, e);
  }
};

export default route(post(createAccount(accountRepo)(authorizer)));
