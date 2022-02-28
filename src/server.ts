import { app } from 'infra/routes.ts';

import { env } from '/env.ts';

/* if (env.ENV === 'development') {
  localStorage.clear();
} */

app.listen({ port: 3333 }, () => console.log('listening on port 3333'));
