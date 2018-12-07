window.addEventListener('mousedown', () =>
  document.body.classList.remove('navigation--tab'),
)
window.addEventListener('keydown', event => {
  if ([9, 37, 38, 39, 40].includes(event.keyCode)) {
    document.body.classList.add('navigation--tab')
  }
})
