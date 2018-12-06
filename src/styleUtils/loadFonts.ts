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

export default async function loadFonts() {
  Object.keys(typefaces).forEach(async name => {
    const variants = typefaces[name].map(variant =>
      new FontFaceObserver(name, variant).load(),
    )

    await Promise.all(variants)
    ;(document.documentElement as HTMLElement).classList.add('fonts-loaded')
  })
}
