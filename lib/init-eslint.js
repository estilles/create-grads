import { writeFile } from 'node:fs/promises'
import { promisify } from 'node:util'
import { execFile as execFileOriginal } from 'node:child_process'

const execFile = promisify(execFileOriginal)

const ESLINT_CONFIG = './.eslintrc.json'

export default async () => writeFile(ESLINT_CONFIG, JSON.stringify({
  env: {
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    semi: [
      'error',
      'never',
    ],
    quotes: [
      'error',
      'single',
    ],
    'no-console': 'off',
    indent: [
      'error',
      2,
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
    ],
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
  },
}, undefined, 4)).then(() => execFile('npm', ['install']))
