const express = require('express')

const app = express()
const path = require('path')
const fs = require('fs')
const ndjson = require('ndjson')

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  const readStream = fs
    .createReadStream(`${__dirname}/todos.ndjson`)
    .pipe(ndjson.parse())

  const chunks = []
  readStream.on('data', (data) => {
    chunks.push(JSON.stringify(data))
  })

  res.contentType('text/plain')

  readStream.on('end', () => {
    var id = setInterval(() => {
      if (chunks.length) {
        res.write(`${chunks.shift()}\n`)
      } else {
        clearInterval(id)
        res.end()
      }
    }, 500)
  })
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
