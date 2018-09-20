export function beforeRequest(options: any) {
  options.q = options.q || localStorage.getItem('ONTARIO_PLAYER_LAST_SEARCH')
}

export function afterRequest(options: any) {
  localStorage.setItem('ONTARIO_PLAYER_LAST_SEARCH', options.q)
}
