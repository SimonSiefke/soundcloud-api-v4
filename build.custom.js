// This file contains additional manual build steps
const fs = require('fs')
const path = require('path')

//
// ─── COPY & MERGE CUSTOM WORKBOX FILE ────────────────────────────────────────────
//

const workBoxCustomFile = fs.readFileSync(
  path.join(__dirname, 'src/workbox.custom.js'),
  'utf-8',
)

const workBoxDistFile = fs.readFileSync(
  path.join(__dirname, 'dist/service-worker.js'),
  'utf-8',
)

const workBoxFullFile = `${workBoxDistFile}\n${workBoxCustomFile}`

fs.writeFileSync(
  path.join(__dirname, 'dist/service-worker.js'),
  workBoxFullFile,
)

//
// ─── COPY NETLIFY's _HEADERS FILE ────────────────────────────────────────────
//

fs.writeFileSync(
  path.join(__dirname, 'dist/service-worker.js'),
  workBoxFullFile,
)
fs.copyFileSync(path.join(__dirname, 'public/_headers'), path.join(__dirname, 'dist/_headers'))
