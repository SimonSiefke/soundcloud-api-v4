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
  const styles = []
  for (const [name, value] of Object.entries(theme.colors)) {
    switch (name) {
      case 'background':
        styles.push(`--background: ${value};`)
        break
      case 'equalizer.background':
        styles.push(`--equalizer-background: ${value};`)
        break
      case 'trackname.foreground':
        styles.push(`--track-name-color: ${value};`)
        break
      case 'username.foreground':
        styles.push(`--user-name-color: ${value};`)
        break
      case 'scrollbar.shadow':
        break
      case 'scrollbarSlider.activeBackground':
        break
      case 'equalizer.background':
        styles.push(`--background: ${value};`)
        break
      // TODO divider line color is more complex
      case 'dividerline.background.primary':
        styles.push(`--divider-line-background-primary: ${value};`)
        break
      case 'dividerline.background':
        styles.push(`--divider-line-background: ${value};`)
        break
      default:
        throw new Error(`unknown theme variable ${name}`)
    }
  }
  return `:root {\n  ${styles.join('\n')}\n}`
}

export async function applyTheme(themeId: string) {
  const theme = await fetch(`./themes/${themeId}.json`).then(res => res.json())
  const css = themeToCSS(theme)
  ;(document.getElementById('theme') as HTMLStyleElement).innerHTML = css
  ;(document.documentElement as HTMLElement).classList.add('theme-loaded')
}
