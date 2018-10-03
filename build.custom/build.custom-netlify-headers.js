//
// ─── COPY NETLIFY's _HEADERS FILE ────────────────────────────────────────────
//

const fs = require('fs')
const path = require('path')


fs.copyFileSync(
  path.join(__dirname, '../public/_headers'),
  path.join(__dirname, '../dist/_headers'),
)
