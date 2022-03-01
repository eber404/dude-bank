import { NHttp } from 'nhttp/mod.ts';

import { createUserController } from 'main/build-create-user.ts';
import { transferController } from 'main/build-transfer.ts';

import { LocalStorage } from 'infra/data/local-storage.ts';
import { Collection } from 'infra/data/collection.ts';

import { NHttpAdapter } from 'presentation/adapters/NHttpAdapter.ts';
import { Output } from 'presentation/adapters/json-data-output.ts';

const routes = new NHttp();

routes.post('/api/users', NHttpAdapter.Post(createUserController));

routes.get('/api/users', (rev) => {
  const users = LocalStorage.list(Collection.USERS);

  const output = new Output(users);

  if (!output || output.data.length === 0) {
    rev.response.status(404).json({ data: 'no user found' });
  } else {
    rev.response.status(200).json(output);
  }
});

routes.post('/api/transaction', NHttpAdapter.Post(transferController));

export { routes as app };
