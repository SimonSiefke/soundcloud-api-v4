import 'no-outline-on-click'
import './events'

export function beforeRequest(options: any) {
  options.q =
    options.q ||
    localStorage.getItem('ONTARIO_PLAYER_LAST_SEARCH') ||
    'petit biscuit'
}

export function afterRequest(options: any) {
  localStorage.setItem('ONTARIO_PLAYER_LAST_SEARCH', options.q)
}
