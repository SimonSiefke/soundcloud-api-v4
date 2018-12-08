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
  'COMPONENT__chromecast-wrapper',
  'STORE_MODULE__audio',
  'AUDIO_PLAYER__chromecast-wrapper',
  'AUDIO_PLAYER__chromecast',
  'AUDIO_PLAYER__local-device',
  'PAGE__about',
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
