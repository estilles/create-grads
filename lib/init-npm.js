import { promisify } from 'node:util'
import { execFile as execFileOriginal } from 'node:child_process'

const execFile = promisify(execFileOriginal)

export default async () => execFile('npm', ['init', '-y'])
