import cleanUp from './init-cleanup.js'
import initNpm from './init-npm.js'
import initPackageJson from './init-package-json.js'
import initGitIgnore from './init-gitignore.js'
import initEslint from './init-eslint.js'

export default async () => {
  try {
    await cleanUp()
    await initNpm()
    await initPackageJson()
    await initEslint()
    await initGitIgnore()
  } catch (error) {
    console.log(error)
  }
}
