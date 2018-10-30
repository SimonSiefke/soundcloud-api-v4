//
// ─── REMOVE BLACKLIST SOME FILES FROM PRECACHING ────────────────────────────────────────
//

const fs = require('fs')
const path = require('path')

const distHTMLFile = fs.readFileSync(
  path.join(__dirname, '../dist/index.html'),
  'utf-8',
) // ?

const preCacheBlackList = [
  'component-chromecast-wrapper',
  'audio-player-chrome-cast-wrapper',
  'store-module-audio',
  'audio-player-chromecast',
  'audio-player-local-device',
  'about',
  'signIn',
]

const replacedDistHTMLFile = preCacheBlackList.reduce((acc, file) => {
  const fileRegex = new RegExp(
    `<link href=(\\/(js|css)\\/)?${file}(\\.[a-zA-Z0-9]*\\.(css|js))? rel=prefetch>`,
    'g',
  )
  if (!fileRegex.test(acc)) {
    throw new Error(`precache link for ${file} not found in dist/index.html`)
  }
  return acc.replace(fileRegex, '')
}, distHTMLFile)

fs.writeFileSync(
  path.join(__dirname, '../dist/index.html'),
  replacedDistHTMLFile,
)
