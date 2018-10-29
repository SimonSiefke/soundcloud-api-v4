import theme from './theme.json'

function themeToCSS(theme) {
  for (const [name, value] of Object.entries(theme.colors)) {
    const styles = []
    switch (name) {
      case 'username.color':
        styles.push(`--user-name-color: ${value};`)
        break
      case 'trackname.color':
        break
      case 'equalizer.background':
        styles.push(`--background: ${value};`)
        break
      case 'dividerline.background.primary':
        styles.push(`--divider-line-background-primary: ${value};`)
        break
      case 'dividerline.background.secondary':
        styles.push(`--divider-line-background-secondary: ${value};`)
        break
      default:
        throw new Error(`unknown theme variable ${name}`)
    }
    return `:root {\n  ${styles.join('\n')}\n}`
  }
}
