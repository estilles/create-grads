import { readFile, writeFile } from 'node:fs/promises'

const PKG_JSON = './package.json'

export default async () => readFile(PKG_JSON)
  .then((buffer) => buffer.toString())
  .then((data) => JSON.parse(data))
  .then((json) => ({
    ...json,
    type: 'module',
    scripts: {
      ...json.scripts,
      test: 'node --experimental-vm-modules node_modules/jest/bin/jest.js',
      lint: 'eslint .',
    },
    devDependencies: {
      eslint: '^8.29.0',
      'eslint-config-airbnb-base': '^15.0.0',
      'eslint-plugin-import': '^2.26.0',
      '@jest/globals': '^29.3.1',
      jest: '^29.3.1',
    },

  }))
  .then((updated) => writeFile(PKG_JSON, JSON.stringify(updated, undefined, 4)))
