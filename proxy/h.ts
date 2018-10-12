const json = [{ ok: true }, { ok: false }]

const ndJSON = json.map(JSON.stringify).join('\n') // ?
