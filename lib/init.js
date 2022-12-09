import { readFile, writeFile } from 'node:fs/promises'
import { promisify } from 'node:util'
import { execFile as execFileOriginal } from 'node:child_process'

import cleanUp from './init-cleanup.js'
import initGitIgnore from './init-gitignore.js'
import initEslint from './init-eslint.js'

const execFile = promisify(execFileOriginal)

const PKG_JSON = './package.json'

const npmInit = () => execFile('npm', ['init', '-y'])


const updatePackageJson = async () => readFile(PKG_JSON)
  .then((buffer) => buffer.toString())
  .then((data) => JSON.parse(data))
  .then((json) => ({
    ...json,
    type: 'module',
    scripts: {
      ...json.scripts,
      lint: 'eslint .',
    },
    devDependencies: {
      eslint: '^8.29.0',
      'eslint-config-airbnb-base': '^15.0.0',
      'eslint-plugin-import': '^2.26.0',
    },

  }))
  .then((updated) => writeFile(PKG_JSON, JSON.stringify(updated, undefined, 4)))

export default async () => {
  try {
    await cleanUp()
    await npmInit()
    await updatePackageJson()
    await initEslint()
    await initGitIgnore()
  } catch (error) {
    console.log(error)
  }
}
