import { app } from 'infra/routes.ts';

app.listen({ port: 3333 }, () => console.log('listening on port 3333'));
