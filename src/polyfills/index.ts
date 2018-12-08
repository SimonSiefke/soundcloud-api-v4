interface Polyfill {
  needed: () => boolean
  apply: () => void | Promise<void>
}
export const CSSVariablesPolyfill: Polyfill = {
  needed() {
    return !(
      window.CSS &&
      window.CSS.supports &&
      window.CSS.supports('--fake-var', 0)
    )
  },
  async apply() {
    const cssVars = (await import('css-vars-ponyfill')).default
    cssVars()
  },
}

export const FetchPolyfill: Polyfill = {
  needed() {
    return !(window.fetch as any) as boolean
  },
  async apply() {
    const fetch = (await import('unfetch')).default
    window.fetch = fetch
  },
}
