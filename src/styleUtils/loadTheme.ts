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

/**
 * transforms a json theme into its corresponding css
 */
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
      case 'element.focus.outline.foreground':
        styles.push(`--element-focus-outline-color:${value};`)
        break
      case '--activity-bar-background':
        styles.push(`--activity-bar-background:${value};`)
        break
      case '--activity-bar-icon-color':
        styles.push(`--activity-bar-icon-color:${value};`)
        break
      default:
        throw new Error(`unknown theme variable ${name}`)
    }
  }
  return `:root {\n${styles.join('\n')}\n}`
}

export async function applyTheme(themeId: string) {
  let css!: string
  const $theme = document.getElementById('theme') as HTMLStyleElement

  // check if the theme is already in the cache
  if (sessionStorage.getItem('THEME_CSS')) {
    css = sessionStorage.getItem('THEME_CSS') as string
  } else {
    // if its not in the cache, fetch it and put it in the cache
    const theme = await fetch(`/themes/${themeId}.json`).then(res => res.json())
    css = themeToCSS(theme)
    sessionStorage.setItem('THEME_CSS', css)
    sessionStorage.setItem(
      'THEME_VERSION',
      theme['ontario-player-theme-version'],
    )
  }

  if (CSSVariablesPolyfill.needed()) {
    CSSVariablesPolyfill.apply()
  }
  // apply the css
  $theme.innerHTML = css
  ;(document.documentElement as HTMLElement).classList.add('theme-loaded')
}
