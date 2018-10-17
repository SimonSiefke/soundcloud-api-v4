interface ICachedItem {
  id: number
  element: HTMLAudioElement
}

const maxCacheSize = 7
let audioCache: ICachedItem[] = []
window.a = audioCache

/**
 * acts as a wrapper around the HTMLAudio tag, basically audio with caching
 */
export default class AudioFactory {
  public static getItem(id: number) {
    const foundItem = audioCache.find(item => item.id === id)
    if (foundItem) {
      return foundItem.element
    }
    return null
  }

  public static createAudioElement(url: string, id: number) {
    const cachedItem = audioCache.find(item => item.id === id)
    if (cachedItem) {
      audioCache.splice(audioCache.indexOf(cachedItem), 1)
      audioCache.unshift(cachedItem)
      return cachedItem.element
    }
    if (audioCache.length < maxCacheSize) {
      const element = new Audio(url)
      audioCache.unshift({ element, id })
      return element
    }
    const item = audioCache[0]
    item.element.src = url
    audioCache = [item, ...audioCache.slice(0, audioCache.length - 1), item]
    return item.element
  }
}
