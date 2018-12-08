import FontFaceObserver from 'fontfaceobserver'
import 'core-js/fn/array/flat-map'

interface Variant {
  weight: number
  style: string
}
interface Typefaces {
  [key: string]: Variant[]
}

const typefaces: Typefaces = {
  ClearSans: [
    {
      weight: 300,
      style: 'italic',
    },
    {
      weight: 300,
      style: 'normal',
    },
    {
      weight: 500,
      style: 'italic',
    },
    {
      weight: 500,
      style: 'normal',
    },
  ],
}

export default async function loadFonts() {
  if (!window.sessionStorage || !sessionStorage.getItem('FONTS_LOADED')) {
    const variants = Object.keys(typefaces).flatMap(name =>
      typefaces[name].map(variant =>
        new FontFaceObserver(name, variant).load(),
      ),
    )
    await Promise.all(variants)
    await new Promise(resolve => setTimeout(resolve, 2000))
    window.sessionStorage && sessionStorage.setItem('FONTS_LOADED', 'true')
  }
  ;(document.documentElement as HTMLElement).classList.add('fonts-loaded')
}
