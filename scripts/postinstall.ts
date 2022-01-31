import fs from 'fs'

import { run, PackageName } from './utils'

const packageNames: PackageName[] = [
  'vscode-tailwindcss',
  'tailwindcss-language-service',
  'tailwindcss-language-server'
]

const notAllProjectsAreBuild = !packageNames.every(name =>
  fs.existsSync(`./packages/${name}/dist/index.js`)
)

if (notAllProjectsAreBuild) {
  await run('pnpm', ['run', 'build'])
}
