export default class AudioDB {
  private static database: IDBDatabase | undefined

  private static async init() {
    const INDEXED_DB_NAME = 'index-db'
    // request to open the specified database by name and version number
    // if version number changes, the database is updated
    const idbRequest = window.indexedDB.open(INDEXED_DB_NAME, 1)

    // if there is an error, tell the error
    idbRequest.addEventListener('error', event => {
      console.error(
        `Could not open Indexed DB due to error${JSON.stringify(event)}`,
      )
    })
    /**
     * if the database you specified cannot be found or the version number is old, you will need an upgrade to create the new database schema
     */
    idbRequest.addEventListener('upgradeneeded', event => {
      /**
       * here we create a new object store called data, and give it an auto-generated key path
       */
      // @ts-ignore
      event.target.result.createObjectStore('data', {
        autoIncrement: true,
      })
      console.log('upgrade needed')
    })

    idbRequest.addEventListener('success', () => {
      AudioDB.database = idbRequest.result
    })
  }

  static async save(database: IDBDatabase, blob: Blob, audioUrl: string) {
    if (!AudioDB.database) {
      await AudioDB.init()
    }
    return new Promise(resolve => {
      const transaction = database
        .transaction('data', 'readwrite')
        .objectStore('data')

      transaction.get('save-data').addEventListener('success', async event => {
        const { result = {} } = event.target as any
        result.audio = blob
        const request = transaction.put(result, audioUrl)
        request.onsuccess = () => {
          console.info('audio saved')
          resolve()
        }
      })
    })
  }

  static async get(database: IDBDatabase, audioUrl: string) {
    if (!AudioDB.database) {
      await AudioDB.init()
    }
    return new Promise(resolve => {
      console.log(database)
      const storage = database
        .transaction('data', 'readwrite')
        .objectStore('data')
      storage.get(audioUrl).addEventListener('success', async event => {
        const { result } = event.target as any
        if (result && result.audio) {
          console.info('restored audio from indexedDB')
          resolve(result.audio)
        } else {
          resolve()
        }
      })
    })
  }
}
