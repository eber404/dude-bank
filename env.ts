import 'dotenv/load.ts';

const ENV = Deno.env.get('ENV') as string;

const envVars = {
  ENV,
};

function loadVars() {
  const invalidVars = [];

  for (const [key, value] of Object.entries(envVars)) {
    if (!value || value.length === 0) {
      invalidVars.push(key);
    }
  }

  const hasInvalidVar = invalidVars.length > 0;

  if (hasInvalidVar) {
    throw Error(
      `missing the following environment variable${
        invalidVars.length > 1 ? 's' : ''
      } -> ${invalidVars.join(', ')}`,
    );
  }
}

loadVars();

export { envVars as env };
