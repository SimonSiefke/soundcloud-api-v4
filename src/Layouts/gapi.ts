export async function loadGAPIScript() {
  return new Promise(resolve => {
    const gapiUrl = 'https://apis.google.com/js/api.js'
    const script = document.createElement('script')
    script.addEventListener('load', () => {
      const YOUTUBE_API_KEY = 'AIzaSyDSF3LmIZdMr2sWLnHThQ3cYvhoZN7_MJk'
      const gapi = window.gapi
      gapi.load('client', () => {
        gapi.client.setApiKey(YOUTUBE_API_KEY)
        gapi.client.load('youtube', 'v3', resolve)
      })
    })
    script.setAttribute('src', gapiUrl)
    document.getElementsByTagName('head')[0].appendChild(script)
  })
}
