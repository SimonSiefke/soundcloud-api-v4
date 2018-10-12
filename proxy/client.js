const streamErr = e => {
  console.warn('Stream error')
  console.warn(e)
}

fetch('/api')
  .then(response => can.ndjsonStream(response.body))
  .then(todosStream => {
    console.log('stream')
    const reader = todosStream.getReader()
    const read = result => {
      if (result.done) {
        return
      }

      render(result.value)

      reader.read().then(read, streamErr)
    }

    reader.read().then(read, streamErr)
  })
  .catch(e => {
    console.log(e)
  })

let counter = 0

const render = val => {
  const div = document.createElement('div')
  div.append('Fetched NDJSON row ', ++counter, ' : ', JSON.stringify(val))
  document.getElementsByTagName('body')[0].append(div)
}
