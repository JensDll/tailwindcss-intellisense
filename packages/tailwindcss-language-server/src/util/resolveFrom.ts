import fs from 'fs'

import { CachedInputFileSystem, ResolverFactory, Resolver, ResolveOptions } from 'enhanced-resolve'

function createResolver(options: Partial<ResolveOptions> = {}): Resolver {
  return ResolverFactory.createResolver({
    fileSystem: new CachedInputFileSystem(fs, 4000),
    useSyncFileSystemCalls: true,
    conditionNames: ['node', 'require'],
    extensions: ['.js', '.ts', '.json', '.node'],
    ...options
  })
}

let resolver = createResolver()

export function setPnpApi(pnpApi: any): void {
  resolver = createResolver({ pnpApi })
}

export function resolveFrom(from?: string, id?: string): string {
  if (id.startsWith('\\\\')) return id
  let result = resolver.resolveSync({}, from, id)
  if (result === false) throw Error()
  // https://github.com/webpack/enhanced-resolve/issues/282
  return result.replace(/\0#/g, '#')
}
