import FontFaceObserver from 'fontfaceobserver'

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

export default function loadFonts() {
  Object.keys(typefaces).forEach((name) => {
    const variants = typefaces[name].map((variant) => {
      const loader = new FontFaceObserver(name, variant)
      return loader.load()
    })

    Promise.all(variants).then(() => {
      console.log(`All variants loaded for ${name}`)
      document.documentElement.classList.add('fonts-loaded')
    })
  })
}
