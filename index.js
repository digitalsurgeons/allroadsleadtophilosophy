const ui = {
  canvas: document.querySelector('[data-canvas]'),
  input: document.querySelector('[data-input]'),
  initBtns: document.querySelectorAll('[data-init]')
}

ui.initBtns.forEach(btn => {
  btn.addEventListener('click', e => init(e, ui))
})


function init(e, ui) {
  const target = e.target
  const type = target.getAttribute('data-init')
  const loading = `
    Calculating mad science...
  `
  ui.canvas.innerHTML = loading

  if (type === 'url') {
    fire()
  } else if (type === 'lucky') {
    fire()
  }
}

function fire() {
  console.log('Do shit...')
}
