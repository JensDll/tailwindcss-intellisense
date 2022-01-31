import { execa, Options } from 'execa'

export type PackageName =
  | 'vscode-tailwindcss'
  | 'tailwindcss-language-service'
  | 'tailwindcss-language-server'

export function run(file: string, args?: readonly string[], options: Omit<Options, 'stdio'> = {}) {
  return execa(file, args, { ...options, stdio: 'inherit' })
}
