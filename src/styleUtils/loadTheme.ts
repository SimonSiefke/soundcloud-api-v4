import { CSSVariablesPolyfill } from './../polyfills/index'

type ColorSetting =
  | 'username.foreground'
  | 'dividerline.background'
  | 'scrollbar.shadow'
  | 'scrollbarSlider.activeBackground'

interface Theme {
  name: string
  type: string
  colors: { [key in ColorSetting]: string }
}

function themeToCSS(theme: Theme) {
  const styles = [] as string[]
  for (const [name, value] of Object.entries(theme.colors)) {
    switch (name) {
      case 'background':
        styles.push(`--background:${value};`)
        break
      case 'equalizer.background':
        styles.push(`--equalizer-background:${value};`)
        break
      case 'trackname.foreground':
        styles.push(`--track-name-color:${value};`)
        break
      case 'username.foreground':
        styles.push(`--user-name-color:${value};`)
        break
      case 'controlbar.background':
        styles.push(`--controlbar-background:${value};`)
        break
      case 'progressbar.background':
        styles.push(`--progressbar-background:${value};`)
        break
      case 'controlbar.icon.enabled.foreground':
        styles.push(`--controlbar-icon-enabled-color:${value};`)
        break
      case 'controlbar.icon.enabled.background':
        styles.push(`--controlbar-icon-enabled-background:${value};`)
        break
      case 'controlbar.icon.disabled.foreground':
        styles.push(`--controlbar-icon-disabled-color:${value};`)
        break
      case 'controlbar.icon.disabled.background':
        styles.push(`--controlbar-icon-disabled-background:${value};`)
        break
      case 'scrollbar.shadow':
        break
      case 'scrollbarSlider.activeBackground':
        break
      // TODO divider line color is more complex
      case 'dividerline.background.primary':
        styles.push(`--divider-line-background-primary:${value};`)
        break
      case 'dividerline.background':
        styles.push(`--divider-line-background:${value};`)
        break
      case 'scrollbar.thumb.background':
        styles.push(`--scrollbar-thumb-background:${value};`)
        break
      case 'scrollbar.thumb.background.hover':
        styles.push(`--scrollbar-thumb-background-hover:${value};`)
        break
      case 'scrollbar.thumb.background.dragging':
        styles.push(`--scrollbar-thumb-background-dragging:${value};`)
        break
      default:
        throw new Error(`unknown theme variable${name}`)
    }
  }
  return `:root {${styles.join('\n')}}`
}

export async function applyTheme(themeId: string) {
  let css!: string
  if (window.sessionStorage && sessionStorage.getItem('THEME')) {
    css = sessionStorage.getItem('THEME') as string
  } else {
    const theme = await fetch(`/themes/${themeId}.json`).then(res => res.json())
    css = themeToCSS(theme)
    window.sessionStorage && sessionStorage.setItem('THEME', css)
  }

  if (CSSVariablesPolyfill.needed()) {
    CSSVariablesPolyfill.apply()
  }
  ;(document.getElementById('theme') as HTMLStyleElement).innerHTML = css
  ;(document.documentElement as HTMLElement).classList.add('theme-loaded')
}
