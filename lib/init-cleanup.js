import { promisify } from 'node:util'
import { execFile as execFileOriginal } from 'node:child_process'

const execFile = promisify(execFileOriginal)

export default async () => {
  await execFile('rm', ['-f', './package.json'])
  await execFile('rm', ['-f', './package-lock.json'])
  await execFile('rm', ['-f', './.eslintrc.json'])
  await execFile('rm', ['-rf', './node_modules'])
}
