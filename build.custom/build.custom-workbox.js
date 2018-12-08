//
// ─── COPY & MERGE CUSTOM WORKBOX FILE ────────────────────────────────────────────
//
const fs = require('fs')
const path = require('path')

const workBoxCustomFile = fs.readFileSync(
  path.join(__dirname, '../src/workbox.custom.js'),
  'utf-8',
)

const workBoxDistFile = fs.readFileSync(
  path.join(__dirname, '../dist/service-worker.js'),
  'utf-8',
)

const workBoxFullFile = `${workBoxDistFile}\n${workBoxCustomFile}`

fs.writeFileSync(
  path.join(__dirname, '../dist/service-worker.js'),
  workBoxFullFile,
)
