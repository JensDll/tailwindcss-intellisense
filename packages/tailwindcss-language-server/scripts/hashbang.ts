import url from 'url'
import fs from 'fs'
import path from 'path'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const indexPath = path.resolve(__dirname, '../dist/index.js')

fs.writeFileSync(
  indexPath,
  '#!/usr/bin/env node\n' + fs.readFileSync(indexPath, 'utf-8'),
  'utf-8'
)
