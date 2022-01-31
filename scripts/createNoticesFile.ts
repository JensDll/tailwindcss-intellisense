import fs from 'fs'
import path from 'path'

import checker from 'license-checker'

import { PackageName } from 'utils'

function getDeps(name: PackageName): string[] {
  const packageJson: Record<string, unknown> = JSON.parse(
    fs.readFileSync(path.resolve('packages', name, 'package.json'), 'utf-8')
  )['devDependencies']

  return Object.entries(packageJson)
    .map<string>(([name]) => name)
    .filter(name => !name.startsWith('@tailwindcss/'))
}

function getLicenses(name: PackageName) {
  return new Promise<checker.ModuleInfos>((resolve, reject) => {
    checker.init({ start: path.resolve('packages', name) }, (error, packages) => {
      if (error) {
        reject(error)
      } else {
        resolve(packages)
      }
    })
  })
}

const allDeps = new Set([
  ...getDeps('tailwindcss-language-server'),
  ...getDeps('tailwindcss-language-service')
])

const allLicenses = {
  ...(await getLicenses('tailwindcss-language-server')),
  ...(await getLicenses('tailwindcss-language-service'))
}

const contents = []

for (const [name, moduleInfo] of Object.entries(allLicenses)) {
  const nameWithoutVersion = name.replace(/@[0-9.]*$/, '')

  if (allDeps.has(nameWithoutVersion)) {
    const pathToLicense = moduleInfo.licenseFile
    const license = pathToLicense && fs.readFileSync(pathToLicense, 'utf-8').trim()
    if (license) {
      contents.push(`${name}\n\n${license}`)
    }
  }
}

fs.writeFileSync('ThirdPartyNotices.txt', contents.join(`\n\n${'='.repeat(100)}\n\n`), 'utf-8')
