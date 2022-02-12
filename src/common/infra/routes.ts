import { NHttp } from 'nhttp/mod.ts';

import { NHttpAdapter } from 'common/presentation/adapters/NHttpAdapter.ts';
import { Output } from 'common/presentation/adapters/json-data-output.ts';
import { listUsers } from 'user/infra/data/local-storage-users.ts';
import { createUserController } from 'user/main/build-create-user.ts';

const routes = new NHttp();

routes.post('/api/users', NHttpAdapter.Post(createUserController));

routes.get('/api/users', (rev) => {
  const users = listUsers();

  const output = new Output(users);

  if (!output || output.data.length === 0) {
    rev.response.status(404).json({ data: 'no user found' });
  } else {
    rev.response.status(200).json(output);
  }
});

export { routes as app };
