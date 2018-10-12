import ndjsonStream from 'can-ndjson-stream'

fetch('http://localhost:3000') // make a fetch request to a NDJSON stream service
  .then(response => ndjsonStream(response.body), // ndjsonStream parses the response.body
  )
  .then((exampleStream) => {
    // retain access to the reader so that you can cancel it
    const reader = exampleStream.getReader()
    let read

    reader.read().then((read = (result) => {
      if (result.done) {
        return
      }
      console.log(result.value) // logs {item:"first"}
      exampleStream
        .getReader()
        .read()
        .then(read)
    }))
  })
