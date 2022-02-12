const scriptName = Deno.args[0] ?? '';

const entryPoint = 'src/server.ts';
const mapFile = 'import_map.json';

const scripts: { [key: string]: any } = {
  dev: [
    'deno',
    'run',
    '--watch',
    '--allow-all',
    `--import-map=${mapFile}`,
    entryPoint,
  ],
  test: [
    'deno',
    'test',
    '--allow-all',
    `--import-map=${mapFile}`,
  ],
};

const cmd = scripts[scriptName];

if (cmd) {
  const process = Deno.run({ cmd });
  await process.status();
} else {
  console.log(`script '${scriptName}' not found`);
}
