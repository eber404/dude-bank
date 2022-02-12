import 'dotenv/load.ts';

const ENCRYPTION_KEY = Deno.env.get('ENCRYPTION_KEY') as string;
const NOMICS_API_KEY = Deno.env.get('NOMICS_API_KEY') as string;

const envVars = {
  ENCRYPTION_KEY,
  NOMICS_API_KEY,
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
