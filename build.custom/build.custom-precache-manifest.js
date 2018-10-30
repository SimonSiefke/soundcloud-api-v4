const fs = require('fs')
const path = require('path')

const distFiles = fs.readdirSync(path.join(__dirname, '../dist'))

const blackListUrls = ['_headers', 'robots.txt', 'chromecast']
for (const distFile of distFiles) {
  if (distFile.startsWith('precache-manifest')) {
    let distFileContent = fs.readFileSync(
      path.join(__dirname, `../dist/${distFile}`),
      'utf-8',
    )

    distFileContent = distFileContent.slice(25)
    distFileContent = distFileContent.replace(/;/g, '')
    const distFileJSON = JSON.parse(distFileContent)

    const modifiedJSON = distFileJSON.filter(
      ({ url }) =>
        !blackListUrls.find(blackListedUrl => url.includes(blackListedUrl)),
    )
    fs.writeFileSync(
      path.join(__dirname, `../dist/${distFile}`),
      `self.__precacheManifest = ${JSON.stringify(modifiedJSON, null, 2)};`,
    )
  }
}
